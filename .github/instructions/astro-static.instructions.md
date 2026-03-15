---
# SPDX-FileCopyrightText: 2026 SecPal
# SPDX-License-Identifier: AGPL-3.0-or-later
name: Astro Static Site Rules
description: Applies Astro, TypeScript, and static-site rules to source files in this repo.
applyTo: "src/**/*.astro,src/**/*.ts,src/**/*.js,astro.config.mjs,eslint.config.js"
---

# Astro Static Site Rules

- Prefer semantic HTML, accessible landmarks, and keyboard-safe interactions.
- Keep client-side JavaScript minimal and only when static markup cannot satisfy the requirement.
- Preserve strict TypeScript and avoid `any` without a clear boundary.
- Reuse existing content and component patterns before adding new abstractions.
- Run the smallest relevant validation for each change: formatting, lint, typecheck, and build.
