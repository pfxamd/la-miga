import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://pfxamd.github.io',
  base: '/la-miga',
  output: 'static',
  integrations: [preact()],
});
