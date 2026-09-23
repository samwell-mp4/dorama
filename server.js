const express = require('express');
const path = require('path');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { spawn } = require('child_process');

const app = express();

// Porta pública principal (EasyPanel geralmente usa 5000 ou 3000 ou 80)
const PRIMARY_PORT = Number(process.env.PORT) || 5000;
// Porta interna da API Python (SEMPRE 5050 para evitar qualquer colisão pública)
const API_PORT = Number(process.env.API_PORT) || 5050;

// Iniciar API Python em segundo plano na porta interna 5050
const venvPython = process.platform === 'win32'
  ? path.join(__dirname, '.venv', 'Scripts', 'python.exe')
  : (fs.existsSync(path.join('/app', '.venv', 'bin', 'python')) 
      ? path.join('/app', '.venv', 'bin', 'python') 
      : path.join(__dirname, '.venv', 'bin', 'python'));

const pythonCmd = fs.existsSync(venvPython)
  ? venvPython
  : (process.platform === 'win32' ? 'python' : 'python3');

const apiScript = path.join(__dirname, 'reelshort-api', 'reelshort.py');

console.log(`[Dorama Server] Inicializando API Python na porta interna ${API_PORT}: ${pythonCmd} ${apiScript}`);
const apiProcess = spawn(pythonCmd, [apiScript], {
  stdio: 'inherit',
  env: { 
    ...process.env, 
    API_PORT: String(API_PORT),
    FLASK_PORT: String(API_PORT)
  }
});

apiProcess.on('error', (err) => {
  console.warn('[Dorama Server] Processo Python local não iniciado via spawn (pode já estar rodando):', err.message);
});

apiProcess.on('exit', (code, signal) => {
  console.warn(`[Dorama Server] Processo Python encerrou com código ${code} e sinal ${signal}`);
});

// Proxy reverso transparente para a API Flask interna (porta 5050)
app.use(
  createProxyMiddleware({
    target: `http://127.0.0.1:${API_PORT}`,
    changeOrigin: true,
    filter: (pathname) => pathname.startsWith('/api') || pathname.startsWith('/docs') || pathname.startsWith('/swaggerui'),
    onProxyReq: (proxyReq, req) => {
      console.log(`[Proxy -> Flask:${API_PORT}] ${req.method} ${req.originalUrl}`);
    },
    onError: (err, req, res) => {
      console.error('[API Proxy Error]:', err.message);
      res.status(502).json({ error: 'Backend API em inicialização. Tente em alguns instantes.' });
    }
  })
);

// Servir arquivos estáticos da aplicação compilada (Vite / React)
const candidateDistDirs = [
  path.join(__dirname, 'reelshort-web', 'dist'),
  path.join(__dirname, 'dist'),
  path.join(__dirname, 'reelshort-api', 'dist'),
  '/app/dist',
  '/app/reelshort-web/dist'
];
const distPath = candidateDistDirs.find(d => fs.existsSync(path.join(d, 'index.html'))) || candidateDistDirs[0];
app.use(express.static(distPath));

// Fallback SPA para suporte ao React Router (todas as rotas da interface)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Ouvir na porta primária do EasyPanel (5000 ou PORT)
app.listen(PRIMARY_PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 DORAMAS DUBLADOS ONLINE - SERVIDOR DE PRODUÇÃO`);
  console.log(`Porta Web Pública: ${PRIMARY_PORT}`);
  console.log(`Porta API Interna: ${API_PORT}`);
  console.log(`Frontend estático: ${distPath}`);
  console.log(`====================================================`);
});

// Ouvir adicionalmente na porta alternativa (3000 ou 5000) para cobrir qualquer configuração do EasyPanel
const SECONDARY_PORT = PRIMARY_PORT === 5000 ? 3000 : (PRIMARY_PORT === 3000 ? 5000 : null);
if (SECONDARY_PORT) {
  try {
    app.listen(SECONDARY_PORT, '0.0.0.0', () => {
      console.log(`[Dorama Server] Também escutando na porta secundária: ${SECONDARY_PORT}`);
    });
  } catch (err) {
    console.warn(`[Dorama Server] Porta secundária ${SECONDARY_PORT} não iniciada:`, err.message);
  }
}