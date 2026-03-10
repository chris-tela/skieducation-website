import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://skieducation.github.io',
  base: '/skieducation-website',
  vite: {
    plugins: [tailwindcss()]
  }
});
