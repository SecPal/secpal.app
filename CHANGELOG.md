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
- A `scripts/release-stable.sh` helper that builds `secpal.app` from an isolated git worktree and publishes versioned stable releases outside the repository checkout
- A `scripts/rollback-stable.sh` helper that swaps `current` and `previous` stable releases and reloads Nginx after validating the configuration
- A `scripts/check-stable.sh` helper that verifies the stable release symlinks, static build artifacts, Nginx config, and the live HTTPS redirect behavior for the public domains
- README guidance for the VPS stable release and rollback workflow, so `secpal.app` can be promoted from `origin/main` without serving directly from the repository checkout

### Fixed

- German landing and legal pages now point social preview metadata at a dedicated German Open Graph image instead of reusing the English preview card
- Social previews now use a dedicated `1200x630` Open Graph image and larger copied logo assets from the frontend repository, improving previews in WhatsApp, Signal, LinkedIn, and similar clients
- Shared links now expose Open Graph and Twitter Card metadata on the localized pages, so preview crawlers that follow the root redirect still land on localized preview metadata
- Landing page and legal pages now use tighter, aligned English and German copy, a release-ready claim, and more precise `title` and description metadata
- Landing page wording now emphasizes less paperwork, fewer media breaks, and clearer handovers while reducing repeated phrasing across hero, features, CTA, and legal metadata

- README and package metadata now match the landing page's security-operations and coming-soon positioning
- Hero now presents `SecPal – A guard’s best friend` as a compact eyebrow tagline above the main positioning headline
- Footer no longer claims "All rights reserved" on the public site, avoiding a misleading rights statement for the AGPL-published project
- Landing page now leads with the SecPal product name, removes the duplicated hero view, and reframes the homepage as a focused coming-soon preview while the product is still under active construction
- Alternate deployment builds now derive canonical and hreflang URLs from `SECPAL_SITE_URL` so `dev.secpal.app` no longer points metadata at production
- Dark mode toggle: added `is:inline` to ensure the script runs after DOM is ready
- Language switcher: `getLocalizedPath` now produces trailing-slash URLs (`/de/`, `/en/`) matching Astro's canonical page paths
- Footer links and Nav language switcher now always produce canonical trailing-slash URLs for non-root paths (e.g. `/en/privacy/` instead of `/en/privacy`) — `getLocalizedPath` normalized to always append trailing slash for non-root routes, so no unnecessary redirects occur
- `sitemap.xml` `lastmod` date now derives from build time (via `import.meta.env.BUILD_LAST_MODIFIED` or `new Date()` fallback) instead of a hard-coded value, so the sitemap stays accurate without manual edits
- Preflight hook now verifies all commits between `origin/main` and `HEAD` are signed, preventing unsigned commits from being pushed
- Navbar logo: replaced placeholder lock icon with real SecPal `logo-light.svg` / `logo-dark.svg`
- Logo: switched from broken SVG assets to working 48px PNGs (`logo-light-48.png` / `logo-dark-48.png`)
- Favicon: switched from placeholder lock SVG to `logo-light-32.png`
- `LegalPageShell`: `x-default` hreflang for DE pages now correctly resolves to the English URL instead of the German URL, consistent with the sitemap declarations
- `security-txt.ts`: ISO date formatting now uses a regex replace to prevent potential silent mismatches
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
