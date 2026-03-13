# Astro + React + Tailwind + GitHub Pages Starter

A minimal, production-ready starter template for building static websites with Astro 5, React islands, and Tailwind CSS 4.

## 🚀 Features

- **Astro 5**: Modern static site generator with selective hydration.
- **React 19**: Used only for interactive islands (minimal JS).
- **Tailwind CSS 4**: The latest styling workflow.
- **TypeScript**: Strictest configuration for safety.
- **GitHub Pages Ready**: Configured for automated deployments.
- **SEO Optimized**: Layout with modern meta tags and defaults.
- **Node 24 + pnpm**: Modern developer experience.

## 📂 Structure

```text
├── .github/workflows/   # Deployment pipeline
├── public/              # Static assets (images, icons, robots.txt)
├── src/
│   ├── components/      # React/Astro components
│   ├── layouts/         # Base HTML structures
│   ├── pages/           # Route-based files (index.astro)
│   └── styles/          # Global CSS (Tailwind)
├── astro.config.mjs     # Project configuration
└── tsconfig.json        # TypeScript settings
```

## 🛠️ Setup

1. **Clone the repo**
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Run development server**:
   ```bash
   pnpm dev
   ```

## 📦 Deployment to GitHub Pages

1. **Configure `astro.config.mjs`**:
   Update `site` and `base` to match your GitHub repository.
   ```js
   export default defineConfig({
     site: 'https://<username>.github.io',
     base: '/<repository-name>',
     // ...
   });
   ```

2. **Push to `main` branch**:
   The GitHub Action in `.github/workflows/deploy.yml` will automatically build and deploy your site.

3. **Enable Pages in Repo Settings**:
   Go to `Settings > Pages` and ensure "Build and deployment" is set to "GitHub Actions".

## 📜 Scripts

- `pnpm dev`: Start local dev server
- `pnpm build`: Generate static production build
- `pnpm preview`: Preview production build locally
- `pnpm astro check`: Run type-checking on `.astro` files

## 📄 License

MIT
