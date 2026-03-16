import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://rdeak.github.io',
  base: '/novena-tracker-pwa',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    react(),
  ],
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },

    plugins: [tailwindcss()],
  },
});