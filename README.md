<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: CC0-1.0
-->

# SecPal Landing Page

[![Quality Gates](https://github.com/SecPal/secpal.app/actions/workflows/quality.yml/badge.svg)](https://github.com/SecPal/secpal.app/actions/workflows/quality.yml)
[![PR Size](https://github.com/SecPal/secpal.app/actions/workflows/pr-size.yml/badge.svg)](https://github.com/SecPal/secpal.app/actions/workflows/pr-size.yml)
[![License](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)

Public website for [secpal.app](https://secpal.app): SecPal – A guard’s best friend.

The site presents the product direction, legal pages, and direct contact paths for the planned public release.

Built with [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and [Tailwind Plus UI Blocks](https://tailwindcss.com/plus).

## Features

- **Multilingual** — English and German (`/en/`, `/de/`)
- **Locale-aware neutral entry routes** — `/` and `/android` resolve German browsers to `/de/...` and all other requests to `/en/...`
- **Built in public** — product progress and release readiness instead of premature app onboarding
- **Dark mode** — class-based, persisted in `localStorage`, flash-free
- **Static** — minimal client-side JS with Astro-first rendering
- **REUSE-compliant** — all files carry SPDX headers

## Development

### Prerequisites

- Node.js 22 (use `.nvmrc`)
- npm

### Setup

```bash
nvm use        # switch to Node 22
npm install
npm run dev    # http://localhost:4321
```

For alternate deployments you can override the generated site base URL at build time:

```bash
SECPAL_SITE_URL=https://dev.secpal.app npm run build
```

### Available commands

| Command                | Action                                     |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Start local dev server at `localhost:4321` |
| `npm run build`        | Build production site to `./dist/`         |
| `npm run preview`      | Preview production build locally           |
| `npm run check`        | Run `astro check` (TypeScript)             |
| `npm run lint`         | Run ESLint                                 |
| `npm run typecheck`    | Alias for `astro check`                    |
| `npm run format`       | Format with Prettier                       |
| `npm run format:check` | Check formatting without writing           |

### Quality gates

Run the preflight script before every push:

```bash
./scripts/preflight.sh
```

## Stable release workflow

`dev.secpal.app` can continue to use the live repository checkout. `secpal.app`
is deployed separately from `/home/secpal/www/secpal.app/current`, so the public
site is independent from the working tree on the VPS.

### Promote a stable release

Build and publish the latest clean `main` state:

```bash
bash ./scripts/release-stable.sh origin/main
```

Build and publish a specific tag or commit:

```bash
bash ./scripts/release-stable.sh <git-ref>
```

The script builds from an isolated temporary git worktree, writes a new release
under `/home/secpal/www/secpal.app/releases/`, updates `current`, preserves the
old target in `previous`, validates Nginx, and reloads it.

### Roll back the public site

```bash
bash ./scripts/rollback-stable.sh
```

The rollback helper swaps `current` and `previous`, validates Nginx, and reloads
the web server.

### Verify the public deployment

```bash
bash ./scripts/check-stable.sh
```

The health-check helper verifies the `current` and `previous` release links,
checks that the localized static files and `RELEASE.txt` exist, validates the
Nginx configuration, and confirms that `secpal.app`, `www.secpal.app`, and the
live development host `dev.secpal.app` behave as expected over HTTPS,
including the language-based root redirect on `secpal.app`.

If the shell session cannot read the live TLS material and also cannot use
passwordless `sudo`, you can skip only the `nginx -t` step explicitly:

```bash
bash ./scripts/check-stable.sh --skip-nginx-validation
```

## Project structure

```text
src/
├── components/          # Reusable Astro components (Nav, Hero, Features, …)
├── i18n/                # Translation files (en.ts, de.ts, index.ts)
├── layouts/             # Base HTML layout
├── pages/
│   ├── en/index.astro   # English landing page
│   └── de/index.astro   # German landing page
└── styles/global.css    # Tailwind CSS v4 import + dark mode variant
public/
└── favicon.svg
```

## i18n

All user-facing strings live in `src/i18n/en.ts` and `src/i18n/de.ts`. Both files export the same shape defined by the `Translations` type. Add a new locale by creating a new file and extending the locales array in `astro.config.mjs`.

In production, the root route `/` is redirected at the web-server (Nginx)
layer. `Accept-Language` requests preferring German resolve to `/de/`, while
all other requests fall back to `/en/`.

The live development host runs directly on `https://dev.secpal.app`. There, the
localized pages are served under `/en/` and `/de/`, while the neutral entry
routes under `/` and `/android` redirect browsers to the locale-specific pages
based on the browser language and still expose the correct social preview
metadata.

## License

AGPL-3.0-or-later — see [LICENSE](LICENSE).

UI blocks are adapted from [Tailwind Plus](https://tailwindcss.com/plus) and licensed under the Tailwind Plus License — see [LICENSES/LicenseRef-TailwindPlus.txt](LICENSES/LicenseRef-TailwindPlus.txt).
