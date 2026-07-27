import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const ssrEntryPath = path.resolve(__dirname, '../dist-ssr/entry-server.js');

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function stripStaticHeadTags(html) {
  return html
    .replace(/<title>.*?<\/title>/s, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace(/<meta name="keywords"[^>]*>/, '')
    .replace(/<meta property="og:[^"]*"[^>]*>\n?/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*>\n?/g, '')
    .replace(/<link rel="canonical"[^>]*>\n?/, '');
}

const { render, prerenderRoutes } = await import(pathToFileURL(ssrEntryPath).href);

for (const route of prerenderRoutes) {
  const { html, helmet } = render(route);
  const headTags = [helmet.title, helmet.meta, helmet.link, helmet.script]
    .map((t) => t.toString())
    .join('\n');

  const pageHtml = stripStaticHeadTags(template)
    .replace('</head>', `${headTags}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outDir = route === '/' ? distDir : path.join(distDir, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), pageHtml);
  console.log(`prerendered ${route}`);
}
