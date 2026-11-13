import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kejishucloud.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [react(), mdx(), sitemap()],
  vite: { build: { cssCodeSplit: true } }
});
