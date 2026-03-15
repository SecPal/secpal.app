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

- Initial landing page with Astro 5, Tailwind CSS v4, and Tailwind Plus UI Blocks
- Multilingual routing (`/en/`, `/de/`) with full English and German translations
- Dark mode support (class-based, `localStorage`-persisted, flash-free)
- Nav, Hero, Features, CTA, and Footer components adapted from Tailwind Plus HTML blocks
- Repo-local GitHub instructions, workflow rules, and PR template aligned with the other SecPal repositories

### Fixed

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
- Workflow callers now declare job timeouts consistently
