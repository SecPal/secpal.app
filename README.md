<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: CC0-1.0
-->

# SecPal public website

> SecPal – A guard's best friend

[![Quality Gates](https://github.com/SecPal/secpal.app/actions/workflows/quality.yml/badge.svg)](https://github.com/SecPal/secpal.app/actions/workflows/quality.yml)
[![License](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)

## About

This repository implements the public [secpal.app](https://secpal.app) website.
It presents public product and company information, legal and contact pages, and
localized website routes as a statically generated site.

## Repository responsibility

This repository owns the public site's source, site-specific frontend assets,
static generation, and deployable website artifact. It favors Astro-rendered
markup with minimal client-side JavaScript.

It does not contain the SecPal product application, backend API, Android client,
self-hosting infrastructure, organization governance, or product-family
architecture. Those responsibilities belong to the related repositories below.

## Technology

The site uses [Astro](https://astro.build) and
[Tailwind CSS](https://tailwindcss.com) with strict TypeScript. It includes
English and German public routes; source configuration remains authoritative for
the currently supported locales and routing behavior.

## Quick start

Use the Node.js version selected by [`.nvmrc`](.nvmrc), then install dependencies
and start the development server:

```bash
nvm use
npm ci
npm run dev
```

Build and run the deterministic site tests with:

```bash
npm run build
npm test
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contributor workflow and the
maintained validation commands.

## Release operations

Site-specific release, rollback, and stable-deployment verification helpers live
in [`scripts/`](scripts/). Their command-line help defines their operational
interfaces. General SecPal product integration and self-hosting infrastructure
belong to [SecPal/deployment](https://github.com/SecPal/deployment), not this
public-site repository.

## Related repositories

- [SecPal/.github](https://github.com/SecPal/.github) — organization governance,
  shared policy, and the public GitHub profile.
- [SecPal/frontend](https://github.com/SecPal/frontend) — browser and PWA product
  application.
- [SecPal/api](https://github.com/SecPal/api) — product backend.
- [SecPal/android](https://github.com/SecPal/android) — Android product client.
- [SecPal/contracts](https://github.com/SecPal/contracts) — public HTTP API
  contract.
- [SecPal/deployment](https://github.com/SecPal/deployment) — product integration,
  self-hosting, and deployment infrastructure.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) and the
[Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Security

Do not report vulnerabilities in public issues. Follow the private reporting
process in [SECURITY.md](SECURITY.md).

## License

Repository-owned source is licensed under `AGPL-3.0-or-later` where indicated;
see [LICENSE](LICENSE). File-level SPDX and [REUSE](REUSE.toml) metadata are
authoritative.

Components derived from Tailwind Plus material also remain subject to the
separate [Tailwind Plus license](LICENSES/LicenseRef-TailwindPlus.txt).
