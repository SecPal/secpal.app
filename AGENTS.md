<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: AGPL-3.0-or-later
-->

# SecPal/secpal.app Agent Instructions

This file is the authoritative, provider-neutral runtime baseline for this
repository. Edit it first when repository-specific guidance changes. Keep the
focused overlays below aligned only where their paths need the same constraint.

## Canonical Work-Graph Governance

The canonical
[`SecPal/.github` work-graph contract](https://github.com/SecPal/.github/blob/main/docs/work-graph-contract.md)
is the single authority for hierarchy, dependencies, sibling ordering, derived
states and selection, leaf and epic decomposition, delivery pull requests,
finding classification, replanning, review and evidence semantics, and stop
conditions.

Use GitHub-native issue state and relationships as required by that contract.
Do not redefine or mirror its generic semantics in this repository's
instructions, issues, pull requests, tests, or planning documents.

## Focused Overlays

- `.github/instructions/org-shared.instructions.md`
- `.github/instructions/github-workflows.instructions.md`
- `.github/instructions/astro-static.instructions.md`

## Repository Safety And Operations

- Run `git status --short --branch` before any write action. For new work,
  start from a clean, up-to-date local `main`: switch to `main`, pull with
  fast-forward only, verify a clean state, then create the dedicated topic
  branch. When continuing existing work in a dirty worktree, identify the
  existing changes, preserve the current scope, and never overwrite changes you
  did not make.
- Never use bypasses such as `--no-verify` or force-push.
- Local commits must be SSH-signed, not GPG/OpenPGP-signed. Preserve the
  existing SSH signing identity and configuration; never bypass signing.
  Every PR commit must have GitHub `verification.verified == true`.
- Update `CHANGELOG.md` for real fixes, features, and breaking changes. Pure
  governance, planning, formatting, and other non-product changes do not need an
  entry.
- Keep GitHub-facing communication in English and reference files and lines
  instead of pasting large code blocks.
- When creating or editing pull requests programmatically, write multiline body
  content to a file and use `--body-file` so shell escaping cannot corrupt it.
- Do not add AI self-references, generated-by text, promotional AI wording, or
  AI attribution to commits, pull requests, issues, changelogs, documentation,
  code comments, UI copy, or release notes unless the task explicitly requires
  documenting AI tooling behavior.
- Keep `SPDX-FileCopyrightText` years current in edited files or companion
  `.license` sidecars.
- After every merge, return the local repository to a ready state: switch to
  `main`, pull with fast-forward only, delete the merged topic branch, prune
  remotes, refresh dependencies with `npm ci`, run `npm run build`, and confirm
  the working tree is clean.

## Static-Site Architecture

- Stack: Node 22, Astro 7, Tailwind CSS v4, and TypeScript strict mode.
- This repository is the public SecPal landing page and static marketing site.
- Preserve static rendering by default and use minimal client-side JavaScript
  only where static markup cannot satisfy the requirement.
- Prefer Astro and platform primitives plus existing repository patterns before
  adding custom runtime code or dependencies.
- Keep content and presentation close to the page or component that uses them.
- Reuse existing content and component patterns before adding abstractions.
- Do not add dependencies or documentation files unless the current contract
  requires them.
- Because SecPal is pre-`1.0.0`, removing an insecure or obsolete compatibility
  layer may be preferable to retaining it. Keep that decision inside the
  current contract and update applicable validation and `CHANGELOG.md`.

## User-Facing Quality

- Preserve semantic HTML, accessible landmarks, keyboard-safe interactions,
  responsive behavior, metadata, canonical URLs, asset integrity, and static
  build output.
- Reject content or styling changes that weaken HTML validity, accessibility,
  metadata, canonical-domain handling, or static-build guarantees.
- Do not move critical routes or semantics behind client-only code.
- Keep strict TypeScript and avoid `any` without a clear boundary.

## Domain Ownership

Domain policy is strict:

- `secpal.app` is the public homepage and real-email domain.
- `apk.secpal.app` is the canonical Android artifact and metadata host.
- `api.secpal.dev` is the API.
- `app.secpal.dev` is the PWA/frontend.
- `secpal.dev` is for development, staging, testing, and examples.
- `app.secpal` is only the Android application identifier.

## Initial Automated Review

The following declarations govern ordinary delivery PR review acquisition;
they do not grant readiness or review authority beyond the maintained lifecycle.

- `PRIMARY_AUTOMATED_REVIEW_TRIGGER: DRAFT_TO_READY`
- `PRIMARY_CODEX_COMMENT_TRIGGER_ALLOWED: NO`
- `POST_READY_BOUNDED_COMMENT_FALLBACK: YES`

Create every ordinary delivery PR as Draft. When the maintained lifecycle and
current authority permit external review, perform the authenticated
`Draft -> Ready for Review` transition. That transition is the canonical primary
trigger for configured automatic Code and Security reviews. After Ready, observe
automatic provider startup and terminality.

Agents MUST NOT use `@codex review` or `@codex security review` as the primary
initial review trigger, post either command while an ordinary delivery PR is
still Draft merely because review is needed, or substitute a review-request
comment for the required Ready transition. The ordinary delivery lifecycle MUST
NOT require a human review-request comment.

Either command is permitted only as a bounded post-Ready fallback when ALL are
true: the PR is already authentically Ready; automatic startup for that exact
review type has not appeared within the maintained observation window; current
lifecycle authority permits the fallback; and no fallback for that review type
has already been consumed. Allow at most one Code fallback request and one
Security fallback request. A fallback creates neither another review cycle nor
new authority.

## Validation

Select the smallest non-redundant evidence required by the canonical contract
and the touched area. Observable site behavior may use a focused Node test,
Astro check, generated static output, semantic or accessibility assertion,
domain or canonical-link check, or build result. Governance-only prose,
issue-body graph migration, formatting-only work, and behavior-preserving
source-shape changes do not require manufactured failing behavior tests.

The repository validation surface is:

- `npm test`
- `npm run lint`
- `npm run check` (also exposed as `npm run typecheck`)
- `npm run build`
- `npm run format:check`
- `scripts/check-domains.sh`
- changed-file Markdown lint, REUSE lint, and pre-commit hooks when applicable
- `git diff --check`

Before a commit or pull request, announce the applicable checks, stop on the
first failure, and record the evidence actually produced. Preserve executable
workflow pin validation even where prose guidance is awaiting separate
alignment.
