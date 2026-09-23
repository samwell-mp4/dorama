import fs from 'fs';
import { BLOG_POSTS } from '../src/data/blogData.js';

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://doramasdublados.com.br/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://doramasdublados.com.br/top-10</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://doramasdublados.com.br/como-assistir</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

BLOG_POSTS.forEach(post => {
  xml += `  <url>
    <loc>https://doramasdublados.com.br/blog/${post.slug}</loc>
    <lastmod>${post.date || '2026-09-23'}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
});

xml += `</urlset>\n`;

const sitemapPath = './public/sitemaps/blog.xml';
fs.writeFileSync(sitemapPath, xml, 'utf-8');
console.log(`Generated sitemap with ${BLOG_POSTS.length} posts at ${sitemapPath}`);
