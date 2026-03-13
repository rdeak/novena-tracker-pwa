import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindv4 from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // site: 'https://username.github.io',
  // base: '/repository-name',
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
