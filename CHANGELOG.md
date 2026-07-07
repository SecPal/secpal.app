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

- added a public roadmap page at `/roadmap/`, localized as `/en/roadmap/` and `/de/roadmap/`
- documented current roadmap focus (shift planning), the next planned step (online guard tour system), and longer-term direction (contract management and service instruction configurator)
- added a Node regression test that keeps the English and German roadmap copy aligned with the current shift-planning focus and the next OWKS milestone
- linked the roadmap page to the full changelog at `changelog.secpal.app`
- added roadmap navigation link to desktop and mobile menus, and roadmap paths to the sitemap
- added the public Android distribution surface on `secpal.app/android`, including localized human-facing landing pages, stable machine-readable latest and versioned release JSON endpoints, navigation/sitemap discovery, and explicit `apk.secpal.app` host documentation for the single-package Android rollout architecture
- added a concrete Android release metadata template endpoint at `apk.secpal.app/android/releases/{versionCode}/metadata.json` plus shared versioned metadata helpers, so release automation and documentation can reference one stable machine-readable contract before APK hosting is wired up
- added stable placeholder routes for latest and versioned Android APK/checksum files on `apk.secpal.app`, so the public artifact URL model now resolves with explicit pre-release `404` responses instead of missing route definitions

### Changed

- restored GitHub's default Dependabot PR title and branch naming behavior by removing the repo-local commit-message, target-branch, and branch-separator overrides, so dependency update PRs no longer collapse into long opaque slugs like `dependabot-github_actions-main-...`
- refreshed the English and German roadmap copy so shift planning is the current focus, OWKS is the next milestone, and completed passkey, onboarding, and Android distribution work is no longer shown as in progress
- replaced the stub `LICENSES/LicenseRef-TailwindPlus.txt` summary with the
  published Tailwind Plus license text and clarified that
  `LicenseRef-TailwindPlus` is the repo's SPDX reference for Tailwind
  Plus-derived components
- replaced the repo-local `markdownlint-cli2` pre-commit and preflight path with pinned `markdownlint-cli@0.49.0` usage and removed the stale `cli2` file references from export/licensing metadata
- expanded the public privacy notice so it now covers the SecPal Android app, beta distribution, Google Play / third-party store context, and app-data deletion contact paths in addition to the website itself
- refocused the public Android landing page on end users: stable and beta are now presented as simple download choices, rollout methods are explained without pretending to be separate APK channels, and the deeper machine-readable endpoints are tucked behind secondary technical details
- corrected the provider-neutral governance baseline so `AGENTS.md` and the Copilot mirror now advertise the workflow overlay, describe the existing `npm test` suite accurately, track Astro 7 instead of Astro 6, and pin the shared reusable quality workflows plus their `governance-ref` inputs to the reviewed `.github` SHA for reproducible validation
- refactored `mobile-safe-area` test assertions: extracted complex inline regex literals to named constants and restored the coupled `break-all`+`{line}` assertion so endpoint-line paragraph failures remain diagnosable without weakening test coverage
- clarified the repo-local pre-`1.0.0` policy in Copilot governance so website work explicitly prefers removing insecure or obsolete compatibility layers over preserving them without a proven live caller
- mandated `--body-file` for programmatic PR creation to prevent shell escaping issues in Copilot governance instructions
- strengthened repo-local Copilot governance for AI findings: website work now requires proof of defect before merging AI-generated fix PRs and treats green CI alone as insufficient evidence for content, accessibility, or static-build refactors
- wired the central Copilot-instructions validator into `quality.yml` so website pull requests now fail automatically when known static-rendering or accessibility AI-risk guardrails are missing from the runtime baseline
- clarified the repo-local branch-start and post-merge readiness workflow so new website work must start from a clean, updated local `main`, and post-merge cleanup now explicitly returns the repo to `main`, refreshes dependencies with `npm ci` where applicable, runs `npm run build` when available, and confirms a clean working tree
- restored explicit repo-local Copilot governance by making TDD-first, quality-first, one-topic-per-PR, immediate issue creation for out-of-scope findings, and EPIC-plus-sub-issue requirements always-on again; the website runtime overlay now auto-loads repo-wide so these rules remain present while working
- clarified the repo-local PR workflow so finished website work must be self-reviewed, committed, and pushed before any PR exists, and the first PR state must always be draft until the final PR-view self-review is clean
- aligned the repo-local domain guidance and validation with the renamed Android application identifier `app.secpal`, removing the old identifier-only exception from current website policy text
- reduced the repo-local Copilot always-on context by replacing the long runtime baseline and removing the auto-loaded overlay fallback, which lowers request size in large VS Code workspaces without dropping the website-specific governance rules
- simplified the Android distribution contract so `stable` and optional `beta` are the only APK release stages, `apk.secpal.app/android/latest.json` is only a stable alias, and all human or tooling integration paths reuse those canonical manifests instead of pretending to be separate APK channels
- published the Android app-signing SHA-256 fingerprint on the `/android` distribution surface and in the machine-readable latest metadata so users can verify that direct SecPal downloads and Google Play releases share the same signing identity

### Fixed

- reviewed and approved the pinned `sharp` and `esbuild` install scripts in `package.json`, so `npm ci` no longer reports pending `allowScripts` warnings for the website toolchain
- added a repo-local `.preflight-exclude` baseline for generated lockfiles and license texts, so dependency bump PRs no longer fail the shared PR size check on `package-lock.json` churn alone
- fixed mobile overflow and right-shift in `src/components/Hero.astro` so the hero headline, subline, and CTAs remain properly aligned on narrow viewports
- upgraded `astro` to the first major release that officially carries patched `esbuild` support and kept the remaining npm audit remediations aligned through the lockfile plus targeted overrides (`brace-expansion`, `defu`), so the website toolchain findings no longer require out-of-range transitive overrides
- neutral locale entry routes on `/` and `/android` now redirect German browser locales to `/de/...` and all other locales to `/en/...`, so `secpal.app` and `dev.secpal.app` no longer force the English Android page when the browser prefers German
- added safe-area-aware body padding together with `viewport-fit=cover` and wrapping rules for Android machine-readable cards so text and content blocks no longer sit too close to the mobile screen edge or overflow on devices with asymmetric viewport insets

## [0.0.1] - 2026-03-31

### Changed

- corrected repo-local domain guidance and validation so `secpal.app` is described only as the public website and real-email domain, while `api.secpal.dev` and `app.secpal.dev` remain the active API/PWA hosts and the Android application identifier stays Android-only; explicitly documented `dev.secpal.app` as the live staging/development host for this repository (a subdomain of `secpal.app`)
- Six occurrences of four hard-coded English accessibility strings in `Nav.astro` (`"Open main menu"`, `"Close menu"`, `"Toggle dark mode"`, `"Mobile navigation"`) are now locale-aware via translation keys so screen readers on `/de` no longer announce mixed-language labels
- Feature card 2 description reworded in both `de.ts` and `en.ts` to break the identical sentence opening shared with card 1; the meaning is preserved while the three cards now read as clearly distinct items when scanned vertically
- `.github/copilot-instructions.md` now requires a branch hygiene check before any write action so website work never starts on local `main` and dirty non-`main` branches must be assessed before continuing
- `.github/copilot-instructions.md` now requires stale `SPDX-FileCopyrightText` years in edited files and license sidecars to be normalized to `YYYY` or `YYYY-YYYY` without spaces
- `.github/copilot-instructions.md` now clarifies that if an edited file has no inline SPDX header, its companion `.license` file must be checked and updated instead
- repo-local website instructions and overlays now also restate Copilot review handling, signed-commit checks, EPIC/sub-issue requirements, REUSE checks, 4-pass review, and the `secpal.app` vs `secpal.dev` use-case split so project-wide governance is locally complete
- repo-local website instructions and overlays now also require warning, audit, and deprecation notices from scripts and package managers to be reviewed and either fixed or tracked immediately

### Added

- `Hero.astro` and `Features.astro` promoted to the lean design: hero fills the first viewport (`min-h` svh minus nav), four layers on mobile, badge hidden on mobile; features section uses `bg-gray-50` with `border-t` overline label; former `HeroLean.astro`, `FeaturesLean.astro`, and the `/de/lean/` and `/en/lean/` test routes removed
- CodeQL analysis for the landing-page repository and corresponding branch protection hardening
- HTTP-level locale redirect guidance for `/`, keeping `secpal.app` static while the web server routes German browsers to `/de/` and all other requests to `/en/`
- Initial landing page with Astro 5, Tailwind CSS v4, and Tailwind Plus UI Blocks
- Multilingual routing (`/en/`, `/de/`) with full English and German translations
- Dark mode support (class-based, `localStorage`-persisted, flash-free)
- Nav, Hero, Features, CTA, and Footer components adapted from Tailwind Plus HTML blocks
- Repo-local GitHub instructions, workflow rules, and PR template aligned with the other SecPal repositories
- Public legal pages for privacy, legal notice, and security in German and English, built from Tailwind Plus-inspired content and FAQ layouts
- Discovery files for crawlers and security researchers via a minimal `robots.txt` and RFC 9116-compliant `security.txt` endpoints
- An environment-aware `sitemap.xml` and `robots.txt` endpoint for the public site, so crawler discovery stays correct on both `secpal.app` and `secpal.dev`

### Fixed

- Header spacing and hero first-viewport height now share the same CSS nav tokens, so future nav padding or logo-size changes no longer require duplicated rem offsets in `Hero.astro`
- Social preview domain branding now sits inside the lower-left accent pill instead of floating beneath a thin bar, so the `secpal.app` label reads as an intentional brand tag rather than a visually shifted leftover element
- The social preview generator now uses finalized German copy with proper umlauts and matching punctuation, so the generated OG card no longer looks like an ASCII-only draft asset
- The social preview build step now relies on a declared local `sharp` dependency instead of an implicit transitive install, so `npm run build` remains stable when upstream package trees change
- Social preview badge backgrounds in the top label now use a conservative per-locale text-width estimate including letter spacing and tuned padding, so both the English and German badge copy stay fully inside the tinted pill without the English badge growing unnecessarily long
- Social preview logo placement is now slightly smaller and lower inside the circular stage, so the shield sits more naturally within the round frame instead of touching the upper visual boundary
- Default website builds from the live repository checkout now derive canonical and social preview origins from `https://dev.secpal.app`, so the dev host no longer emits production `canonical`, `og:url`, or preview image URLs unless `SECPAL_SITE_URL` explicitly targets production
- Social preview assets are now regenerated from the canonical `logo-dark-512.png` brand asset for dark preview cards before every build, so the final OG/Twitter cards use the original SecPal logo instead of a manually reconstructed or wrong-contrast variant while still emitting absolute image URLs from the active build domain
- `astro.config.mjs` now filters Astro's known false-positive `UNUSED_EXTERNAL_IMPORT` warning for `@astrojs/internal-helpers/remote`, and the site now tracks `astro@6.1.1`, so local builds finish without upstream warning noise
- `package.json` now pins `typescript` to the `5.9.x` support range used by `@typescript-eslint`, and npm overrides now lift vulnerable transitive `brace-expansion`, `picomatch`, and `yaml` packages to patched releases so linting and `npm audit` both run cleanly

### Fixed (stable release health checks)

- `scripts/check-stable.sh` no longer fails the nginx binary availability check when `--skip-nginx-validation` is passed, so the script works correctly in restricted shells where the nginx binary is not accessible
- `release-stable.sh` and `rollback-stable.sh` now use `sudo -n` instead of plain `sudo` so they fail with a clear error message instead of blocking on an interactive password prompt in non-interactive environments
- `release-stable.sh` cleanup trap now also removes the temporary worktree directory with `rm -rf` so `/tmp` is cleaned up even when `git worktree remove` fails
- `release-stable.sh` and `rollback-stable.sh` now resolve the nginx binary via `NGINX_BIN` (checking PATH and `/usr/sbin/nginx`) and verify `systemctl` is available before attempting to reload nginx, so failures are actionable rather than "command not found"
- `check-stable.sh` curl calls now include `--connect-timeout 10 --max-time 30` to prevent indefinite hangs in degraded network or TLS scenarios, and fail with a clear error message on curl errors

### Fixed

- `package-lock.json` now resolves `flatted` to `3.4.2` and `h3` to `1.15.10`, removing the known npm audit findings without changing declared package ranges
- Deployment checks and README guidance now point to the real live development host `dev.secpal.app` instead of the old `secpal.dev` assumption, while keeping server-side locale negotiation documented only for production
- Shared links now emit complete Open Graph and Twitter Card metadata from the shared base layout, so localized pages consistently expose the correct title, description, locale, and `1200x630` preview image to messenger and social crawlers
- The neutral `/` entry page now exposes the same preview metadata before redirecting to `/en/`, so root links still unfurl with the correct SecPal card when crawlers do not fully evaluate redirects
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
