---
# SPDX-FileCopyrightText: 2026 SecPal
# SPDX-License-Identifier: AGPL-3.0-or-later
name: secpal.app Runtime Overlay
description: Applies the authoritative repository baseline to all files.
applyTo: "**"
---

# secpal.app Runtime Overlay

- Root `AGENTS.md` is the authoritative repository baseline.
- The canonical
  [`SecPal/.github` work-graph contract](https://github.com/SecPal/.github/blob/main/docs/work-graph-contract.md)
  exclusively defines generic work-graph, delivery, review, finding,
  replanning, evidence, and stop semantics. Do not restate them locally.
- Preserve the static-first Astro and strict TypeScript architecture, semantic
  HTML, accessibility, keyboard safety, responsive behavior, metadata,
  canonical domains, asset integrity, and minimal client-side JavaScript.
- Apply the domain ownership and applicable local validation commands defined in
  `AGENTS.md`.
- Preserve existing worktree changes and use no bypass or force-push.
- Keep user commits cryptographically signed using a repository-accepted
  signature format, with successful local and GitHub verification.
- Keep GitHub communication in English and omit AI attribution or promotional
  wording unless the task explicitly documents AI tooling behavior.
