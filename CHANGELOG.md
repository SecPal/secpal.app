<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: CC0-1.0
-->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- CodeQL analysis for the landing-page repository and corresponding branch protection hardening
- Initial landing page with Astro 5, Tailwind CSS v4, and Tailwind Plus UI Blocks
- Multilingual routing (`/en/`, `/de/`) with full English and German translations
- Dark mode support (class-based, `localStorage`-persisted, flash-free)
- Nav, Hero, Features, CTA, and Footer components adapted from Tailwind Plus HTML blocks
- Repo-local GitHub instructions, workflow rules, and PR template aligned with the other SecPal repositories
- Public legal pages for privacy, legal notice, and security in German and English, built from Tailwind Plus-inspired content and FAQ layouts
- Discovery files for crawlers and security researchers via a minimal `robots.txt` and RFC 9116-compliant `security.txt` endpoints
- An environment-aware `sitemap.xml` and `robots.txt` endpoint for the public site, so crawler discovery stays correct on both `secpal.app` and `secpal.dev`
- Environment-aware `security.txt` endpoints for both `/.well-known/security.txt` and `/security.txt`, so disclosure metadata matches the active deployment domain
- A neutral `/security/` policy URL plus hreflang alternates in `sitemap.xml`, so discovery and multilingual indexing stay aligned

### Fixed

- README and package metadata now match the landing page's security-operations and coming-soon positioning
- Hero now presents `SecPal – A guard's best friend` as a compact eyebrow tagline above the main positioning headline
- Footer no longer claims "All rights reserved" on the public site, avoiding a misleading rights statement for the AGPL-published project
- Landing page now leads with the SecPal product name, removes the duplicated hero view, and reframes the homepage as a focused coming-soon preview while the product is still under active construction
- Alternate deployment builds now derive canonical and hreflang URLs from `SECPAL_SITE_URL` so `dev.secpal.app` no longer points metadata at production
- Dark mode toggle: added `is:inline` to ensure the script runs after DOM is ready
- Language switcher: `getLocalizedPath` now produces trailing-slash URLs (`/de/`, `/en/`) matching Astro's canonical page paths
- Navbar logo: replaced placeholder lock icon with real SecPal `logo-light.svg` / `logo-dark.svg`
- Logo: switched from broken SVG assets to working 48px PNGs (`logo-light-48.png` / `logo-dark-48.png`)
- Favicon: switched from placeholder lock SVG to `logo-light-32.png`
- REUSE-compliant licensing across all files
- Full CI/CD pipeline with quality gates, PR size check, and project automation
- Pre-commit hooks and preflight script
- Contributing guidance now matches the Astro static-site repository instead of the generic multi-repo template
- Project automation now skips cleanly when repository GitHub App secrets are not configured yet
- Tailwind Plus-derived components now declare their dual licensing explicitly for REUSE compliance
- Footer legal navigation now points to `Impressum` / `Legal Notice` instead of incorrectly advertising terms and conditions that do not yet exist
- Privacy pages were reduced to a lean landing-page notice that reflects the current site instead of implying broader business processes
- English privacy copy now uses plainer wording so it matches the concise tone of the German landing-page notice more closely
- Privacy pages now include a short storage-duration disclosure for server logs and email communication
- Header links for `Fortschritt` / `Progress` and `Launch` now jump back to the locale-specific homepage sections instead of breaking on legal subpages
- Public security pages now focus more tightly on vulnerability reporting, current public status, and a small set of verifiable statements
- Legal and security pages now emit page-specific `hreflang` alternates instead of always pointing search engines back to the localized homepages
- Security pages now expose `/security/` consistently as the neutral `x-default` target in both page metadata and the sitemap
