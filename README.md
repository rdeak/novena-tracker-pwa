# Astro + React + Tailwind CSS Starter (GitHub Pages)

A modern, production-ready starter template for static websites deployed on GitHub Pages. Built with performance and developer experience in mind.

## 🚀 Tech Stack

- **Framework:** [Astro 5](https://astro.build/) (Static Site Generation)
- **UI Library:** [React 19](https://react.dev/) (For interactive "islands")
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (Next-gen CSS-first utility framework)
- **Type Safety:** [TypeScript](https://www.typescriptlang.org/)
- **CI/CD:** [GitHub Actions](https://github.com/features/actions) (Automated deployment to Pages)

## 📦 Key Features

- ✅ **Static-only output:** Perfectly compatible with GitHub Pages hosting.
- ✅ **Islands Architecture:** Zero-JS by default; React only hydrates where specified.
- ✅ **SEO Ready:** Pre-configured meta tags, Open Graph, Twitter cards, and canonical URLs.
- ✅ **Configurable Base Path:** Support for `username.github.io/repo-name/` deployments.
- ✅ **Modern Tailwind:** Uses the new Tailwind 4.0 Vite plugin for faster builds.

## 🛠️ Getting Started

### 1. Installation

```bash
npm install
```

### 2. Configuration (Crucial for GitHub Pages)

Open `astro.config.mjs` and update these values:

- `site`: Your production URL (e.g., `https://username.github.io`).
- `base`: Your repository name with leading/trailing slashes (e.g., `/my-project-repo/`). If you are using a custom domain or a user page (`username.github.io`), set this to `/`.

### 3. Development

```bash
npm run dev
```

### 4. Manual Build

```bash
npm run build
```

## 🚀 Deployment to GitHub Pages

This repo is pre-configured for automated deployment:

1. Push your code to the `main` branch.
2. In your GitHub Repository, go to **Settings > Pages**.
3. Under **Build and deployment > Source**, change the dropdown to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and deploy your site on every push to `main`.

## 📂 Project Structure

```text
├── .github/workflows/   # CI/CD Deployment script
├── public/              # Static assets (favicons, robots.txt)
├── src/
│   ├── components/      # React components (Interactive Islands)
│   ├── layouts/         # Astro layouts (Shared structure/SEO)
│   ├── pages/           # Routes (index.astro, etc.)
│   └── styles/          # Global CSS & Tailwind 4 entry point
├── astro.config.mjs     # Astro & Vite configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## 📄 License

MIT - Free to use for any project!
