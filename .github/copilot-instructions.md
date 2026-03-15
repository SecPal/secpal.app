<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: AGPL-3.0-or-later
-->

# secpal.app Repository Instructions

These instructions are self-contained for the `secpal.app` repository at runtime.
Do not assume instructions from sibling repositories or comment-based inheritance are loaded.

## Always-On Rules

- Apply SecPal core rules on every task: fail fast, no bypass, one topic per change, and create a GitHub issue immediately for findings that cannot be fixed in the current scope.
- Before any commit, PR, or merge, announce and verify the required checklist. Stop on the first failed check.
- Update `CHANGELOG.md` in the same change set for real fixes, features, or breaking changes.
- Keep GitHub-facing communication in English.
- Domain policy is strict: use only `secpal.app` and `secpal.dev`.
- Prefer small, content-visible fixes that match the existing Astro and Tailwind patterns. Avoid speculative abstractions.

## Required Checklist

Before any commit, PR, or merge, announce and verify at least:

- the smallest relevant validation passed for the affected area: formatting, lint, typecheck, and build when applicable
- `CHANGELOG.md` was updated in the same change set for real changes
- no bypass was used, including `--no-verify` or force-push
- repo-local instructions remain self-contained and do not rely on cross-repo inheritance
- out-of-scope findings were turned into GitHub issues immediately

## Repository Stack

- Node 22, Astro 6, Tailwind CSS v4, TypeScript strict mode.
- This repository is the public SecPal landing page and static marketing site.

## Architecture

- Keep content and presentation close to the page or component that uses it.
- Prefer small reusable Astro components over deep abstraction layers.
- Favor static rendering and minimal client-side JavaScript.

## Site Rules

- Preserve accessibility, semantic HTML, keyboard navigation, and responsive layouts.
- Keep copy accurate to the current product and domains. Use only `secpal.app` and `secpal.dev`.
- Prefer Astro built-ins and existing CSS patterns before introducing new dependencies or runtime code.
- Run the smallest relevant validation for every change: formatting, lint, typecheck, and build for affected areas.

## Scope Notes

- Do not add dependencies or create documentation files unless the task requires it.
- Treat this file as the runtime baseline for the repo. Repo-specific `.instructions.md` files add detail for matching files.
