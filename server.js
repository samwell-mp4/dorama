const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;
const API_PORT = process.env.API_PORT || 5000;

const fs = require('fs');

// Iniciar API Python em segundo plano se executado no mesmo container
const venvPython = process.platform === 'win32'
  ? path.join(__dirname, '.venv', 'Scripts', 'python.exe')
  : (fs.existsSync(path.join('/app', '.venv', 'bin', 'python')) 
      ? path.join('/app', '.venv', 'bin', 'python') 
      : path.join(__dirname, '.venv', 'bin', 'python'));

const pythonCmd = fs.existsSync(venvPython)
  ? venvPython
  : (process.platform === 'win32' ? 'python' : 'python3');

const apiScript = path.join(__dirname, 'reelshort-api', 'reelshort.py');

console.log(`[Dorama Server] Inicializando API Python: ${pythonCmd} ${apiScript}`);
const apiProcess = spawn(pythonCmd, [apiScript], {
  stdio: 'inherit',
  env: { ...process.env, PORT: String(API_PORT) }
});

apiProcess.on('error', (err) => {
  console.warn('[Dorama Server] Processo Python local não iniciado via spawn (pode já estar rodando):', err.message);
});

// Proxy reverso transparente para a API Flask
app.use(
  '/api',
  createProxyMiddleware({
    target: `http://127.0.0.1:${API_PORT}`,
    changeOrigin: true,
    onError: (err, req, res) => {
      console.error('[API Proxy Error]:', err.message);
      res.status(502).json({ error: 'Backend API em inicialização. Tente em alguns instantes.' });
    }
  })
);

// Servir arquivos estáticos da aplicação compilada (Vite / React)
const distPath = path.join(__dirname, 'reelshort-web', 'dist');
app.use(express.static(distPath));

// Fallback SPA para suporte ao React Router (todas as URLs carregam index.html)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`🚀 DORAMAS DUBLADOS ONLINE - SERVIDOR DE PRODUÇÃO`);
  console.log(`Porta Web: ${PORT}`);
  console.log(`Porta API Interna: ${API_PORT}`);
  console.log(`Frontend estático: ${distPath}`);
  console.log(`====================================================`);
});