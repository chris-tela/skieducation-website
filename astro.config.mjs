import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chris-tela.github.io',
  base: '/skieducation-website',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});