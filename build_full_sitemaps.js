const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://doramasdublados.online';
const TODAY = new Date().toISOString().split('T')[0];

// 1. Ler todos os slugs de SEO Hubs dinamicamente de seoPagesData.js
const seoDataPath = path.join(__dirname, 'reelshort-web', 'src', 'data', 'seoPagesData.js');
let seoHubSlugs = [];
if (fs.existsSync(seoDataPath)) {
  const content = fs.readFileSync(seoDataPath, 'utf8');
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    if (!seoHubSlugs.includes(match[1])) {
      seoHubSlugs.push(match[1]);
    }
  }
}

// Slugs adicionais complementares / aliases
const additionalUrls = [
  '/mapa-do-site',
  '/doramas-novos',
  '/aplicativo-para-assistir-dorama-de-graca',
  '/como-assistir',
  '/top-10'
];

// 2. Ler os posts do blog
const blogDataPath = path.join(__dirname, 'reelshort-web', 'src', 'data', 'blogData.js');
let blogSlugs = [];
if (fs.existsSync(blogDataPath)) {
  const blogContent = fs.readFileSync(blogDataPath, 'utf8');
  const blogSlugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = blogSlugRegex.exec(blogContent)) !== null) {
    if (!blogSlugs.includes(match[1])) {
      blogSlugs.push(match[1]);
    }
  }
}

// 3. Extrair slugs de séries existentes de series.xml
const existingSeriesXmlPath = path.join(__dirname, 'reelshort-web', 'public', 'sitemaps', 'series.xml');
let existingSeriesSlugs = [];
if (fs.existsSync(existingSeriesXmlPath)) {
  const content = fs.readFileSync(existingSeriesXmlPath, 'utf8');
  const seriesRegex = /<loc>https:\/\/doramasdublados\.online\/series\/([^<]+)<\/loc>/g;
  let match;
  while ((match = seriesRegex.exec(content)) !== null) {
    if (!existingSeriesSlugs.includes(match[1])) {
      existingSeriesSlugs.push(match[1]);
    }
  }
}

// 4. Gerar hubs.xml (Sitemap dedicado para páginas de SEO Programático)
let hubsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Inserir todos os hubs com alta prioridade e indexação diária
seoHubSlugs.forEach(slug => {
  hubsXml += `  <url>
    <loc>${DOMAIN}/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
`;
});

additionalUrls.forEach(urlPath => {
  hubsXml += `  <url>
    <loc>${DOMAIN}${urlPath}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
  </url>
`;
});

hubsXml += `</urlset>\n`;

// 5. Gerar series.xml
let seriesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${DOMAIN}/series</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${DOMAIN}/filmes</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${DOMAIN}/em-alta</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${DOMAIN}/lancamentos</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${DOMAIN}/generos/romance</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${DOMAIN}/generos/drama</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${DOMAIN}/generos/ceo</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${DOMAIN}/generos/vinganca</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${DOMAIN}/generos/casamento</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;

existingSeriesSlugs.forEach(slug => {
  seriesXml += `  <url>
    <loc>${DOMAIN}/series/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

seriesXml += `</urlset>\n`;

// 6. Gerar blog.xml
let blogXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

blogSlugs.forEach(slug => {
  blogXml += `  <url>
    <loc>${DOMAIN}/blog/${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
});

blogXml += `</urlset>\n`;

// 7. Gerar sitemap.xml principal (Índice de Sitemaps)
const mainXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemaps/hubs.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemaps/series.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemaps/blog.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>
`;

// Diretórios de destino
const targetDirs = [
  path.join(__dirname, 'reelshort-web', 'public'),
  path.join(__dirname, 'reelshort-web', 'dist'),
  path.join(__dirname, 'public'),
  path.join(__dirname, 'dist')
];

targetDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const sitemapsDir = path.join(dir, 'sitemaps');
    if (!fs.existsSync(sitemapsDir)) {
      fs.mkdirSync(sitemapsDir, { recursive: true });
    }

    fs.writeFileSync(path.join(sitemapsDir, 'hubs.xml'), hubsXml, 'utf8');
    fs.writeFileSync(path.join(sitemapsDir, 'series.xml'), seriesXml, 'utf8');
    fs.writeFileSync(path.join(sitemapsDir, 'blog.xml'), blogXml, 'utf8');
    fs.writeFileSync(path.join(dir, 'sitemap.xml'), mainXml, 'utf8');
    console.log(`✅ Sitemaps atualizados em ${dir}`);
  }
});

console.log(`\n🎉 Gerador de Sitemaps Concluído com Sucesso!`);
console.log(`- Hubs SEO adicionados: ${seoHubSlugs.length + additionalUrls.length}`);
console.log(`- Séries mapeadas: ${existingSeriesSlugs.length}`);
console.log(`- Posts do blog: ${blogSlugs.length}`);
console.log(`- Total de URLs indexáveis geradas: ${seoHubSlugs.length + additionalUrls.length + existingSeriesSlugs.length + blogSlugs.length + 10}`);
