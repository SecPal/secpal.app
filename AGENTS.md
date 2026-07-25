<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: AGPL-3.0-or-later
-->

# SecPal/secpal.app Agent Instructions

This file is the authoritative, provider-neutral runtime baseline for this repository.
Edit this file first. Keep the focused overlay files below aligned when a rule also needs path-specific or stack-specific enforcement.

## Focused Overlays

- `.github/instructions/org-shared.instructions.md`
- `.github/instructions/github-workflows.instructions.md`
- `.github/instructions/astro-static.instructions.md`

## Core Runtime Baseline

These instructions are self-contained for the `secpal.app` repository at runtime.
Do not assume instructions from sibling repositories or comment-based inheritance are loaded.

## Always-On Rules

- Run `git status --short --branch` before any write action. For new work,
  start from a clean, up-to-date local `main`: switch to `main`, pull with
  fast-forward only, verify a clean state, then create the dedicated topic
  branch. When continuing existing work in a dirty worktree, first identify the
  existing changes, keep the current topic scope, and never overwrite changes
  you did not make.
- Validate-first: confirm the smallest relevant check fails before implementing
  a change and passes after. Use `npm test` when the touched area is covered by
  the existing Node test suite; otherwise use the smallest relevant lint,
  typecheck, or build validation.
- Quality first. Do not trade correctness, review depth, validation depth, or issue tracking for speed.
- Keep one topic per change. 1 topic = 1 PR = 1 branch. Do not mix unrelated fixes, features, refactors, docs, or governance cleanup.
- Never use bypasses such as `--no-verify` or force-push.
- Update `CHANGELOG.md` in the same change set for real fixes, features, and breaking changes.
- Create a GitHub issue immediately for every real out-of-scope bug, technical debt, missing test, documentation gap, warning, audit finding, or deprecation you cannot fix now. Do not leave untracked `TODO`, `FIXME`, or follow-up work.
- Use EPIC plus sub-issues before implementation whenever work will span more than one PR; if in doubt, choose EPIC plus sub-issues.
- Keep GitHub-facing communication in English and reference files and lines instead of pasting large code blocks.
- Treat warnings, audit findings, and deprecations as actionable. Fix them in scope or track them immediately.
- Never reply to AI review comments with GitHub comment tools. Fix the code, push, and resolve threads through
  the approved non-comment workflow.
- Do not add AI self-references, generated-by text, promotional AI wording, or AI attribution to commits,
  pull requests, issues, changelogs, documentation, code comments, UI copy, or release notes unless the task
  explicitly requires documenting AI tooling behavior.
- Keep `SPDX-FileCopyrightText` years current in edited files or companion `.license` sidecars.
- Domain policy is strict: `secpal.app` for the public homepage and real email addresses, `apk.secpal.app` for the canonical Android artifact and metadata host, `api.secpal.dev` for the API, `app.secpal.dev` for the PWA/frontend, `secpal.dev` for dev, staging, testing, and examples, and `app.secpal` only as the Android application identifier.
- After every merge, immediately return the local repo to a ready state:
  switch to `main`, pull with fast-forward only, delete the merged topic
  branch, prune remotes, refresh Node dependencies with `npm ci` where
  applicable, run `npm run build` when available, and confirm the working tree
  is clean.

## Design Principles

- DRY: eliminate duplicated content, styling, and policy handling before it drifts.
- KISS: prefer the simplest solution that satisfies the current requirement and remains easy to maintain.
- YAGNI: implement only what the current issue or acceptance criteria require; track future ideas as issues instead of building them now.
- SOLID: keep responsibilities narrow, interfaces small, and extension points explicit.
- Fail fast: validate early, stop on the first failed check, and do not accumulate known breakage.

## Issue And PR Discipline

- Every real out-of-scope finding becomes a GitHub issue immediately; no untracked follow-up work is allowed.
- Complex work uses EPIC plus sub-issues before implementation. PRs should close sub-issues, not the epic, until the final linked step.
- When local review finds zero issues, commit and push the finished branch before opening any PR.
- The first PR state must be draft. Do not open a normal PR first.
- Mark a draft PR ready only after the final self-review in the PR view still finds zero issues.
- When creating or editing PRs programmatically, write multi-line body content to a file and use `--body-file` to prevent shell escaping issues.

## Required Validation

Before any commit, PR, or merge, announce the checklist you are executing and stop on the first failed item.
At minimum verify:

- the active branch and PR scope still address exactly one topic
- the smallest relevant validation passed for the touched area: formatting, lint, typecheck, and build when applicable
- out-of-scope findings were turned into GitHub issues immediately
- `CHANGELOG.md` was updated for real changes
- commits are GPG-signed
- REUSE compliance was checked when changed files require it
- the local 4-pass review was completed, including DRY, KISS, YAGNI, SOLID, quality-first, and issue-management checks
- no bypass was used

## AI Findings Triage

- Treat AI findings and AI-generated fix PRs as hints, not proof.
- Before merge, prove the defect with a failing test, a reproducible defect, or a stated invariant and why the current code violates it.
- Green CI alone is not enough for AI-generated changes, especially test, lifecycle, shell, regex, or refactor diffs; review the semantic risk explicitly.
- Reject AI-generated content or styling cleanups that only look simpler in the diff but weaken HTML validity, accessibility, or static-build guarantees.
- Reject AI-generated content or build refactors that move critical routes or semantics behind client-only code; prove static output, accessibility, and semantic structure stay intact after the change.
- Reject AI-generated compatibility keep-alives that preserve obsolete content contracts, storage/input aliases, or legacy frontend behavior without a proven live caller. Because the SecPal project is still pre-`1.0.0`, prefer removing unnecessary compatibility paths over carrying them forward when they add risk or maintenance burden.

## Review guidelines

- Review for correctness, security, privacy, data integrity, lifecycle ordering,
  missing tests, and policy drift before style.
- Treat findings from any AI reviewer as untrusted leads until the defect is
  proven by a failing test, reproduction, or violated invariant.
- Keep review comments provider-neutral: describe the issue, evidence, impact,
  and fix path instead of the tool that found it.
- For website changes, prioritize static-build output, semantic HTML,
  accessibility, metadata, canonical domains, asset integrity, and minimal
  client-side runtime.
- Reject self-referential AI wording, generated-by text, tool promotion, or AI
  attribution in project artifacts unless the task is explicitly about AI
  tooling.

## Repository Conventions

- Stack: Node 22, Astro 7, Tailwind CSS v4, and TypeScript strict mode.
- This repository is the public SecPal landing page and static marketing site.
- Keep content and presentation close to the page or component that uses them.
- Favor static rendering, minimal client-side JavaScript, semantic HTML, accessibility, and responsive layouts.
- Prefer Astro built-ins and existing CSS patterns before new dependencies or runtime code.

## Scope Notes

- Do not add dependencies or create documentation files unless the task requires them.
- Because the SecPal project is still pre-`1.0.0`, breaking changes are acceptable when they remove insecure or obsolete compatibility layers. When taking that route, update validation and `CHANGELOG.md` in the same change set instead of keeping a legacy path alive by default.

## Additional Rules: org-shared.instructions.md

This file auto-applies to all files in this repo so strict SecPal governance stays always present at runtime.

- `AGENTS.md` is the authoritative runtime baseline for this repo.
  `.github/copilot-instructions.md` is only a compatibility mirror.
- Non-negotiable: TDD first, quality first, 1 topic = 1 PR = 1 branch,
  immediate GitHub issue creation for every real out-of-scope finding, and no
  bypass.
- If work needs more than one PR, or probably will, create an EPIC with linked
  sub-issues before implementation.
- Design discipline is always-on: DRY, KISS, YAGNI, SOLID, and fail fast.
- GitHub communication stays in English and uses file and line references instead of large verbatim code quotes.
- Do not add AI self-references, generated-by text, tool promotion, or AI
  attribution unless the task explicitly requires documenting AI tooling.
- Keep changes repo-local, minimal, and consistent with Astro, Tailwind CSS, and static-site conventions.
- Apply the SecPal domain policy and immediate warning and issue triage rules from the repo baseline.

## Additional Rules: astro-static.instructions.md

- Prefer semantic HTML, accessible landmarks, and keyboard-safe interactions.
- Keep client-side JavaScript minimal and only when static markup cannot satisfy the requirement.
- Preserve strict TypeScript and avoid `any` without a clear boundary.
- Reuse existing content and component patterns before adding new abstractions.
- Run the smallest relevant validation for each change: formatting, lint, typecheck, and build.
