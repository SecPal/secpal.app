<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: CC0-1.0
-->

# SecPal Landing Page

[![Quality Gates](https://github.com/SecPal/secpal.app/actions/workflows/quality.yml/badge.svg)](https://github.com/SecPal/secpal.app/actions/workflows/quality.yml)
[![PR Size](https://github.com/SecPal/secpal.app/actions/workflows/pr-size.yml/badge.svg)](https://github.com/SecPal/secpal.app/actions/workflows/pr-size.yml)
[![License](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)

Public landing page for [secpal.app](https://secpal.app) — the open-source platform for delivering timely security notifications to your users.

Built with [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com), and [Tailwind Plus UI Blocks](https://tailwindcss.com/plus).

## Features

- **Multilingual** — English and German (`/en/`, `/de/`)
- **Dark mode** — class-based, persisted in `localStorage`, flash-free
- **Static** — zero client-side JS by default (Astro island architecture)
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

## License

AGPL-3.0-or-later — see [LICENSE](LICENSE).

UI blocks are adapted from [Tailwind Plus](https://tailwindcss.com/plus) and licensed under the Tailwind Plus License — see [LICENSES/LicenseRef-TailwindPlus.txt](LICENSES/LicenseRef-TailwindPlus.txt).
