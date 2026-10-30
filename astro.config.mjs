import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pfxamd.github.io',
  base: '/la-miga',
  output: 'static',
  integrations: [preact(), sitemap()],
});
