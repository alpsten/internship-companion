# Internship Companion

Helping Swedish LIA students plan, track, and land their internships with clarity, momentum, and a calm mind.

This repository contains:
- A React/TypeScript frontend (Vite + Tailwind) that exposes the Internship Companion experience
- Content authored in MDX (guides, templates, trackers) under `web/src/content/resources`
- Documentation for collaborators (`docs/`)

## Project Status
- **Phase:** Discovery & planning
- **Focus:** Validate information architecture, agree on MVP scope, ship a visible frontend shell quickly
- **Primary language:** English (Swedish toggle available)

## Quick Links
- `docs/product-brief.md` – goals, users, success measures, MVP scope
- `docs/content-outline.md` – structured content plan derived from early notes
- `docs/mdx-workflow.md` – hur man skriver och kopplar nya MDX-guider
- `docs/CODEX.md` – engineering principles and tech stack policy
- `docs/AGENTS.md` – collaboration agreements and decision flow

## Getting Started
Everything relevant lives inside `web/`.

```bash
cd web
npm install
npm run dev
```

The dev server runs on `http://localhost:5173`. Any changes to MDX files are picked up instantly.

## Authoring Content (MDX)
- New guides/templates live in `web/src/content/resources/`.
- Follow the frontmatter format outlined in `docs/mdx-workflow.md` so resources show up in cards and plan recommendations.
- Link a resource to a plan stage via `resourceSlugs` in `web/src/content.ts` if it should appear as a recommendation.
- Store downloadable assets in `web/public/downloads/` (or link external URLs) and reference them via `downloadLabel` + `downloadUrl` in the MDX frontmatter.
- Add `locale: en` for English drafts; Swedish files can omit the field (default `sv`).

## Contributing
- Read `docs/CODEX.md` and `docs/AGENTS.md` before touching code.
- Discuss any change in direction med @alpsten.
- File issues for new content sections, translations, or automation ideas before implementing.
- Keep commits small and focused; run `npm run lint` before opening a PR.

## Deployment (GitHub Pages)
1. Enable GitHub Pages in the repository settings and choose `GitHub Actions` as the source.
2. Push to `main`.
   The workflow in `.github/workflows/deploy-pages.yml` builds from `web/`, sets `BASE_PATH` from the repository name automatically, and deploys `web/dist`.
3. For a manual build, set the Pages base path explicitly and copy the SPA fallback:
   ```bash
   cd web
   BASE_PATH=/your-repository-name/ npm run build:pages
   ```
   `npm run build:pages` runs `tsc`, builds with the provided `BASE_PATH`, and duplicates `dist/index.html` to `dist/404.html` for React Router support on GitHub Pages.

## Roadmap at a Glance
1. Validate the staged plan flow and gather feedback from students.
2. Flesh out MDX content för varje steg (nätverk, intervjuer, momentum) och addera downloads.
3. Add localisation toggle (sv → en) and persist checklist progress with richer visualisations.
4. Automate GitHub Pages deployment (workflow) once content stabilises.
