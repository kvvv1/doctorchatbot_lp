import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { landingPages } from '../src/data/landingPages';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://doctorchatbot.com.br';

const staticUrls = [`${SITE_URL}/`];
const landingUrls = landingPages.map((p) => `${SITE_URL}/informacoes/${p.slug}`);

const urls = [...staticUrls, ...landingUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;

const distDir = path.resolve(__dirname, '../dist');
fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);
console.log(`sitemap.xml gerado com ${urls.length} URLs`);
