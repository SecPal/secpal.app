<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: CC0-1.0
-->

# SecPal public website

> SecPal – A guard's best friend

[![Quality Gates](https://github.com/SecPal/secpal.app/actions/workflows/quality.yml/badge.svg)](https://github.com/SecPal/secpal.app/actions/workflows/quality.yml)
[![License](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)

This repository implements the public [secpal.app](https://secpal.app) website:
company and product information, legal pages, and contact paths. It owns the
public site's source, assets, static generation, and deployable website artifact.

The site uses [Astro](https://astro.build),
[Tailwind CSS](https://tailwindcss.com), and strict TypeScript, with English and
German public routes and minimal client-side JavaScript.

## Repository boundaries

The SecPal product application, API, Android client, public API contracts,
self-hosting infrastructure, and organization governance have separate owners:

- [SecPal/frontend](https://github.com/SecPal/frontend) — browser/PWA product
  application.
- [SecPal/api](https://github.com/SecPal/api) — product backend/API implementation.
- [SecPal/android](https://github.com/SecPal/android) — Android product client.
- [SecPal/contracts](https://github.com/SecPal/contracts) — public HTTP API
  contracts.
- [SecPal/deployment](https://github.com/SecPal/deployment) — product integration,
  self-hosting, and deployment infrastructure.
- [SecPal/.github](https://github.com/SecPal/.github) — organization governance,
  shared policy, and public organization presentation. Its
  [architecture navigation](https://github.com/SecPal/.github/blob/main/docs/architecture.md)
  and [public status authority](https://github.com/SecPal/.github/blob/main/docs/public-status-semantics.md)
  distinguish accepted architecture from implementation and operational evidence.

## Local development

Use Node.js 26.10.0 or a newer Node 26 release. [`.nvmrc`](.nvmrc) selects the
maintained line; [`package.json`](package.json) defines the minimum. Install
dependencies and start the local server:

```bash
nvm use
npm ci
npm run dev
```

Build the static site and run its deterministic tests with:

```bash
npm run build
npm test
```

For a controlled alternate deployment origin, set `SECPAL_SITE_URL` before
building; see [`astro.config.mjs`](astro.config.mjs).

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contributor workflow and maintained
validation commands, including the repository [preflight](scripts/preflight.sh).

## Release operations

The site-specific [release](scripts/release-stable.sh),
[rollback](scripts/rollback-stable.sh), and
[stable-deployment verification](scripts/check-stable.sh) helpers own the public
website's operational interfaces. Run each helper through `bash` with `--help`
for usage. General product deployment and self-hosting belong to
[SecPal/deployment](https://github.com/SecPal/deployment).

## Contributing and security

Read [CONTRIBUTING.md](CONTRIBUTING.md) and the
[Code of Conduct](CODE_OF_CONDUCT.md) before contributing. Report vulnerabilities
privately through the process in [SECURITY.md](SECURITY.md).

## License

Repository-owned source is licensed under `AGPL-3.0-or-later` where indicated;
see [LICENSE](LICENSE). File-level SPDX headers and [REUSE metadata](REUSE.toml)
define the applicable licenses.

Tailwind Plus-derived components additionally use `LicenseRef-TailwindPlus`.
The separate [Tailwind Plus license](LICENSES/LicenseRef-TailwindPlus.txt) contains
the Personal and Team license terms published by Tailwind Labs.
