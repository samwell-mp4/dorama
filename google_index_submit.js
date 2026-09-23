const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Caminho da chave do Google Service Account
const KEY_FILE = path.join(__dirname, 'google-indexing-key.json');

if (!fs.existsSync(KEY_FILE)) {
  console.error('Arquivo de credenciais não encontrado:', KEY_FILE);
  process.exit(1);
}

const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));

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
async function getAccessToken() {
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
  console.log('🚀 GOOGLE INDEXING API - SUBMISSÃO AUTOMÁTICA');
  console.log(`Conta de Serviço: ${keyData.client_email}`);
  console.log('====================================================\n');

  console.log('1. Autenticando com Google OAuth 2.0...');
  let token;
  try {
    token = await getAccessToken();
    console.log('✅ Autenticado com sucesso! Token obtido.\n');
  } catch (err) {
    console.error('❌ Erro na autenticação:', err.message);
    process.exit(1);
  }

  console.log('2. Coletando URLs dos sitemaps XML...');
  const sitemapSeries = path.join(__dirname, 'reelshort-web', 'public', 'sitemaps', 'series.xml');
  const sitemapBlog = path.join(__dirname, 'reelshort-web', 'public', 'sitemaps', 'blog.xml');

  const urlsSeries = extractUrlsFromXml(sitemapSeries);
  const urlsBlog = extractUrlsFromXml(sitemapBlog);

  const allUrls = [...new Set([...urlsSeries, ...urlsBlog])];
  console.log(`Encontradas ${allUrls.length} URLs únicas para indexação:\n`);

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

    // Pequeno delay para respeitar rate limits da API
    await new Promise(r => setTimeout(r, 250));
  }

  console.log('\n====================================================');
  console.log(`📊 RELATÓRIO FINAL: ${successCount} enviadas com sucesso | ${failCount} com aviso/erro`);
  console.log('====================================================');
}

main().catch(err => {
  console.error('Erro inesperado:', err);
});
