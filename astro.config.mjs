import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindv4 from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://rdeak.github.io',
  base: '/novena-tacker-pwa',
  output: 'static',
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindv4()],
    build: {
      cssMinify: 'lightningcss',
    }
  }
});
