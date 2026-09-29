const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Caminho da chave do Google Service Account
const KEY_FILE = path.join(__dirname, 'google-indexing-key.json');

// Função para gerar JWT assinado com RSA-SHA256
function generateJWT(clientEmail, privateKey) {
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const base64UrlHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
  const base64UrlPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signatureInput = `${base64UrlHeader}.${base64UrlPayload}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signatureInput);
  const signature = signer.sign(privateKey, 'base64url');

  return `${signatureInput}.${signature}`;
}

// Obter Access Token da API do Google
async function getAccessToken(keyData) {
  const jwt = generateJWT(keyData.client_email, keyData.private_key);

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Falha ao obter token OAuth: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

// Enviar URL para o Google Indexing API
async function publishUrl(accessToken, url, type = 'URL_UPDATED') {
  const endpoint = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
  
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      url,
      type
    })
  });

  const result = await res.json();
  return { status: res.status, ok: res.ok, data: result };
}

// Ping nos motores de busca para re-rastrear sitemaps
async function pingSearchEngines() {
  const sitemapUrl = encodeURIComponent('https://doramasdublados.online/sitemap.xml');
  console.log('\n📡 Notificando motores de busca via Ping XML Sitemaps...');

  const endpoints = [
    { name: 'Google Sitemap Ping', url: `https://www.google.com/ping?sitemap=${sitemapUrl}` },
    { name: 'Bing Sitemap Ping', url: `https://www.bing.com/ping?sitemap=${sitemapUrl}` }
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url, { method: 'GET', headers: { 'User-Agent': 'DoramasDubladosBot/1.0' } });
      console.log(`  • ${ep.name}: Status ${res.status} (${res.status === 200 ? 'OK Notificado' : 'Recebido'})`);
    } catch (e) {
      console.log(`  • ${ep.name}: Falha de rede ou timeout (${e.message})`);
    }
  }
}

// Extrair URLs de arquivos XML de sitemap
function extractUrlsFromXml(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

async function main() {
  console.log('====================================================');
  console.log('🚀 GOOGLE INDEXING & SEO ACCELERATOR - SUBMISSÃO AUTOMÁTICA');
  console.log('====================================================\n');

  // 1. Extrair URLs de todos os sitemaps
  console.log('1. Coletando URLs dos sitemaps XML...');
  const sitemapHubs = path.join(__dirname, 'reelshort-web', 'public', 'sitemaps', 'hubs.xml');
  const sitemapSeries = path.join(__dirname, 'reelshort-web', 'public', 'sitemaps', 'series.xml');
  const sitemapBlog = path.join(__dirname, 'reelshort-web', 'public', 'sitemaps', 'blog.xml');

  const urlsHubs = extractUrlsFromXml(sitemapHubs);
  const urlsSeries = extractUrlsFromXml(sitemapSeries);
  const urlsBlog = extractUrlsFromXml(sitemapBlog);

  const allUrls = [...new Set([...urlsHubs, ...urlsSeries, ...urlsBlog])];
  console.log(`✅ Encontradas ${allUrls.length} URLs únicas para indexação:`);
  console.log(`  - Hubs e Landing Pages SEO: ${urlsHubs.length}`);
  console.log(`  - Séries e Categorias: ${urlsSeries.length}`);
  console.log(`  - Artigos do Blog: ${urlsBlog.length}\n`);

  // 2. Notificar motores de busca via Ping
  await pingSearchEngines();

  // 3. Submeter via Google Indexing API se houver chave configurada
  if (!fs.existsSync(KEY_FILE)) {
    console.log('\nℹ️ AVISO SOBRE GOOGLE INDEXING API:');
    console.log(`Para envio direto via API de Indexação Instantânea do Google:`);
    console.log(`1. Crie uma Service Account no Google Cloud Console com o escopo "Indexing API".`);
    console.log(`2. Baixe a chave JSON e salve como: ${KEY_FILE}`);
    console.log(`3. Adicione o e-mail da service account como Proprietário no Google Search Console.`);
    console.log(`4. Execute novamente: node google_index_submit.js`);
    console.log('\nMesmo sem a API key, todos os sitemaps XML e páginas de SEO já estão gerados e acessíveis para o Googlebot no servidor!');
    return;
  }

  const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
  console.log(`\n2. Autenticando com Google OAuth 2.0 (${keyData.client_email})...`);
  let token;
  try {
    token = await getAccessToken(keyData);
    console.log('✅ Autenticado com sucesso! Token OAuth obtido.\n');
  } catch (err) {
    console.error('❌ Erro na autenticação:', err.message);
    process.exit(1);
  }

  console.log('3. Enviando URLs para o Google Indexing API...');
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allUrls.length; i++) {
    const url = allUrls[i];
    process.stdout.write(`[${i + 1}/${allUrls.length}] Indexando: ${url} ... `);

    try {
      const result = await publishUrl(token, url, 'URL_UPDATED');
      if (result.ok) {
        console.log(`✅ OK (Notified: ${result.data?.urlNotificationMetadata?.latestUpdate?.notifyTime || 'Sucesso'})`);
        successCount++;
      } else {
        console.log(`⚠️ Status ${result.status}: ${result.data?.error?.message || JSON.stringify(result.data)}`);
        failCount++;
      }
    } catch (e) {
      console.log(`❌ Erro de requisição: ${e.message}`);
      failCount++;
    }

    // Delay de 200ms para respeitar limites de requisições por minuto da API
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n====================================================');
  console.log(`📊 RELATÓRIO FINAL: ${successCount} enviadas com sucesso | ${failCount} com aviso/erro`);
  console.log('====================================================');
}

main().catch(err => {
  console.error('Erro inesperado:', err);
});
