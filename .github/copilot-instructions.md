<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: AGPL-3.0-or-later
-->

# secpal.app Repository Instructions

These instructions are self-contained for the `secpal.app` repository at runtime.
Do not assume instructions from sibling repositories or comment-based inheritance are loaded.

## Always-On Rules

- Apply SecPal core rules on every task: fail fast, no bypass, one topic per change, and create a GitHub issue immediately for findings that cannot be fixed in the current scope.
- Apply branch hygiene from the first local change: inspect branch state before
  work, never start on local `main`, and do not mix unrelated uncommitted
  changes into the current task.
- Before any commit, PR, or merge, announce and verify the required checklist. Stop on the first failed check.
- Update `CHANGELOG.md` in the same change set for real fixes, features, or breaking changes.
- Keep GitHub-facing communication in English.
- Domain policy is strict: use `secpal.app` for production services and all
  email addresses, and `secpal.dev` only for dev, staging, testing, and
  examples.
- Never reply to Copilot review comments with GitHub comment tools. Fix the
  code, push, and resolve review threads through the approved non-comment
  workflow.
- For work that needs more than one PR, create an EPIC with linked sub-issues
  before implementation.
- Do not paste large verbatim code blocks into GitHub comments, issues, or PR
  descriptions. Reference file paths and line numbers instead.
- Treat warnings, audit findings, deprecation notices, and similar non-fatal
  diagnostics from scripts, `composer`, `npm`, and related tooling as
  actionable: review them, fix them in scope, or create a GitHub issue
  immediately if they are real but out of scope.
- Prefer small, content-visible fixes that match the existing Astro and Tailwind patterns. Avoid speculative abstractions.
- When editing a file or license sidecar that contains
  `SPDX-FileCopyrightText`, keep the year current: use a single year such as
  `2026` if it is already the current year, otherwise extend it to a no-spaces
  range ending in the current year such as `2025-2026`. If the edited file has
  no inline header but a companion `.license` file exists, check and update
  that `.license` file instead.

## Branch Hygiene

- Before any edit or other write action, run `git status --short --branch` and
  understand the current branch plus local changes.
- Never start implementation on local `main`. Create or switch to a dedicated topic branch first.
- If a non-`main` branch already contains uncommitted changes, continue only
  when they belong to the same task.
- If existing changes are unrelated or unclear, stop and ask whether they
  should be committed, stashed, or split before proceeding.
- Never create mixed commits by reusing a dirty branch for a new topic.

## Required Checklist

Before any commit, PR, or merge, announce and verify at least:

- the smallest relevant validation passed for the affected area: formatting, lint, typecheck, and build when applicable
- `CHANGELOG.md` was updated in the same change set for real changes
- commits are GPG-signed
- REUSE compliance was checked when the changed files require it
- the local 4-pass review was completed before creating a PR
- tooling warnings and audit/deprecation notices were reviewed and either fixed
  or tracked immediately
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
