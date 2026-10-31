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
for (const path of ['panes/index.html', 'obrador/index.html', 'nosotros/index.html', 'contacto/index.html']) {
  if (!htmlFiles.includes(path)) errors.push(`Missing real site page: ${path}`);
}
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

for (const item of ['panes/index.html', ...htmlFiles.filter((name) => name.startsWith('pan/') && name.endsWith('/index.html'))]) {
  const html = await readFile(new URL(item, dist), 'utf8');
  if (!html.includes('data-add-to-cart=')) errors.push(`${item}: missing add-to-cart action`);
  if (!html.includes('assets/bread/')) errors.push(`${item}: missing bread photo`);
}
const shopPage = await readFile(new URL('panes/index.html', dist), 'utf8');
if (!shopPage.includes('id="bread-grid"') || !shopPage.includes('aria-live="polite"')) {
  errors.push('Shop filtering UI and accessible result count not found');
}
for (const page of ['index.html', 'panes/index.html']) {
  const html = await readFile(new URL(page, dist), 'utf8');
  for (const marker of ['product-card__seal', 'product-card__imprint', 'product-card__traits', 'add-button--artisan', 'product-card__discover']) {
    if (!html.includes(marker)) errors.push(`${page}: missing artisan bread label marker ${marker}`);
  }
}
const homepage = await readFile(new URL('index.html', dist), 'utf8');
if (!homepage.includes('https://pfxamd.com/')) errors.push('Missing creator credit link');
if (!homepage.includes('LA MIGA')) errors.push('Missing LA MIGA brand text');
for (const marker of ['process-section--atelier', 'process-step--mix', 'process-step--rest', 'process-step--shape', 'process-step--bake', 'process-section__cta']) {
  if (!homepage.includes(marker)) errors.push(`Home missing redesigned bakery process: ${marker}`);
}

for (const page of htmlFiles) {
  const html = await readFile(new URL(page, dist), 'utf8');
  if (!html.includes('site-header__progress')) errors.push(`${page}: missing scroll progress indicator`);
}

for (const page of htmlFiles) {
  const html = await readFile(new URL(page, dist), 'utf8');
  for (const marker of ['footer__socials', 'footer__contact-strip', 'footer__credit', 'footer__demo-note']) {
    if (!html.includes(marker)) errors.push(`${page}: missing global editorial footer part ${marker}`);
  }
}

for (const route of ['panes/', 'obrador/', 'nosotros/', 'contacto/']) {
  if (!homepage.includes(`${publicBase}${route}`)) errors.push(`Homepage missing navigation link: ${route}`);
}
await assertFile('assets/brand/la-miga-logo.webp', 'branding');
const breadImages = files.filter((path) => path.startsWith('assets/bread/') && path.endsWith('.webp'));
if (breadImages.length < 6) errors.push('Missing locally optimized bread imagery');
for (const photo of ['fachada', 'hogaza', 'miga', 'trigo', 'harina', 'obrador']) {
  await assertFile(`assets/nosotros/${photo}.webp`, 'Nuestra Historia photography');
}

if (errors.length) {
  console.error('Static site audit failed:\n' + errors.map((error) => `- ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Static site audit passed: ${htmlFiles.length} HTML pages, ${breadImages.length} bread images, all internal file links present.`);
}
