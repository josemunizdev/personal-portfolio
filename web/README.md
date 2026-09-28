# josemuniz.dev

Source for my portfolio site: a static Next.js export deployed to GitHub Pages.

## Stack

| Layer      | Choice                                      |
| ---------- | ------------------------------------------- |
| Framework  | Next.js 16 (App Router, `output: "export"`) |
| UI         | React 19, TypeScript (strict)               |
| Styling    | Tailwind CSS 4, Geist font                  |
| Quality    | ESLint (next/core-web-vitals), `tsc`        |
| CI/CD      | GitHub Actions to GitHub Pages              |

No server, no client-side data fetching, and nothing to keep running: the build emits plain HTML and CSS into `out/`.

## Editing content

All content (resume, metrics, projects, skills) lives in `src/data/profile.ts`. Components only handle layout, so updating the site is a data change.

## Local development

```bash
cd web
npm ci
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build      # writes the static site to out/
```

## Deployment

`.github/workflows/deploy.yml` runs lint, typecheck, and build on every pull request. Pushes to `master` also deploy to GitHub Pages.

One-time setup in the repository settings:

1. **Settings > Pages > Build and deployment > Source:** GitHub Actions.
2. **Custom domain:** `josemuniz.dev`. The domain is currently attached to `react-webportfolio`, so remove it there first. GitHub allows a custom domain on only one repository at a time.

Until the custom domain is set, the site serves from `https://josemunizdev.github.io/personal-portfolio/`. The workflow reads the base path from `actions/configure-pages`, so both cases work without code changes.
