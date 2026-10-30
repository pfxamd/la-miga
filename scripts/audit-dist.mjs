import { access, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);
const publicBase = '/la-miga/';
const errors = [];

async function assertFile(path, source) {
  try {
    await access(new URL(path, dist));
  } catch {
    errors.push(`${source}: missing ${path}`);
  }
}

const files = await readdir(dist, { recursive: true });
const htmlFiles = files.filter((path) => path.endsWith('.html'));

if (!htmlFiles.includes('index.html')) errors.push('Missing homepage');
if (htmlFiles.filter((path) => path.startsWith('pan/') && path.endsWith('/index.html')).length < 6) {
  errors.push('Missing bread detail pages');
}

for (const path of htmlFiles) {
  const html = await readFile(new URL(path, dist), 'utf8');
  if (html.includes('/la-migapan/') || html.includes('/la-migaassets/')) {
    errors.push(`${path}: malformed GitHub Pages base path`);
  }

  for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    const url = match[1];
    if (!url.startsWith(publicBase)) continue;
    const target = decodeURIComponent(new URL(url, 'https://pfxamd.github.io').pathname.slice(publicBase.length));
    const relativeFile = target === '' ? 'index.html' : target.endsWith('/') ? `${target}index.html` : target;
    await assertFile(relativeFile, path);
  }
}

const homepage = await readFile(new URL('index.html', dist), 'utf8');
if (!homepage.includes('https://pfxamd.com/')) errors.push('Missing creator credit link');
if (!homepage.includes('LA MIGA')) errors.push('Missing LA MIGA brand text');
await assertFile('assets/brand/la-miga-logo.webp', 'branding');
const breadImages = files.filter((path) => path.startsWith('assets/bread/') && path.endsWith('.webp'));
if (breadImages.length < 6) errors.push('Missing locally optimized bread imagery');

if (errors.length) {
  console.error('Static site audit failed:\n' + errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Static site audit passed: ${htmlFiles.length} HTML pages, ${breadImages.length} bread images, all internal file links present.`);
}
