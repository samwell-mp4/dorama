const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://doramasdublados.online';
const TODAY = new Date().toISOString().split('T')[0];

// 1. Ler os posts do blog
const blogDataPath = path.join(__dirname, 'reelshort-web', 'src', 'data', 'blogData.js');
const blogContent = fs.readFileSync(blogDataPath, 'utf8');
const blogSlugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const blogSlugs = [];
let match;
while ((match = blogSlugRegex.exec(blogContent)) !== null) {
  if (!blogSlugs.includes(match[1])) {
    blogSlugs.push(match[1]);
  }
}

// 2. Ler séries detalhadas
const detailedSeriesPath = 'C:/Users/Usuario/.gemini/antigravity-ide/brain/6547cf0b-e622-4ce9-a5e9-7122f85a0367/scratch/detailed_series.json';
let seriesList = [];
if (fs.existsSync(detailedSeriesPath)) {
  try {
    seriesList = JSON.parse(fs.readFileSync(detailedSeriesPath, 'utf8'));
  } catch (e) {
    console.warn('Não foi possível ler detailed_series.json:', e.message);
  }
}

// 3. Gerar series.xml
let seriesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${DOMAIN}/series</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${DOMAIN}/filmes</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${DOMAIN}/em-alta</loc>
    <changefreq>hourly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${DOMAIN}/lancamentos</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${DOMAIN}/generos/romance</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${DOMAIN}/generos/drama</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${DOMAIN}/generos/ceo</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;

seriesList.forEach(s => {
  if (s.slug) {
    seriesXml += `  <url>
    <loc>${DOMAIN}/series/${s.slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
  }
});

seriesXml += `</urlset>\n`;

const seriesXmlPath = path.join(__dirname, 'reelshort-web', 'public', 'sitemaps', 'series.xml');
fs.writeFileSync(seriesXmlPath, seriesXml, 'utf8');
console.log(`✅ series.xml atualizado com ${8 + seriesList.length} URLs em ${seriesXmlPath}`);

// 4. Gerar blog.xml
let blogXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${DOMAIN}/top-10</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${DOMAIN}/como-assistir</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
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

const blogXmlPath = path.join(__dirname, 'reelshort-web', 'public', 'sitemaps', 'blog.xml');
fs.writeFileSync(blogXmlPath, blogXml, 'utf8');
console.log(`✅ blog.xml atualizado com ${3 + blogSlugs.length} URLs em ${blogXmlPath}`);

// 5. Gerar sitemap.xml principal (índice)
const mainXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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

const mainXmlPath = path.join(__dirname, 'reelshort-web', 'public', 'sitemap.xml');
fs.writeFileSync(mainXmlPath, mainXml, 'utf8');
console.log(`✅ sitemap.xml principal atualizado em ${mainXmlPath}`);
