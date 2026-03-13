import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Astro Configuration for GitHub Pages Deployment
 * Docs: https://astro.build/config
 */
export default defineConfig({
  // 1. UPDATE 'site' with your production URL (required for SEO and sitemaps)
  // site: 'https://username.github.io',

  // 2. UPDATE 'base' if your site is deployed to a subfolder (e.g., /repo-name/)
  // base: '/repo-name/',

  // Force static output for GitHub Pages compatibility
  output: 'static',

  integrations: [
    react({
      experimentalReactChildren: true,
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Enable prefetch for faster navigation
  prefetch: true,
});
