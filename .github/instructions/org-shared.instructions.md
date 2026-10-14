---
# SPDX-FileCopyrightText: 2026 SecPal
# SPDX-License-Identifier: AGPL-3.0-or-later
name: secpal.app Runtime Overlay
description: Applies the authoritative repository baseline to all files.
applyTo: "**"
---

# secpal.app Runtime Overlay

- Root `AGENTS.md` is the authoritative repository baseline.
- Use GitHub issues and native relationships for scope and dependencies, and
  pull requests, reviews, conversations, and required checks for delivery.
- Apply the pull request review guidance from `AGENTS.md`.
- Preserve the static-first Astro and strict TypeScript architecture, semantic
  HTML, accessibility, keyboard safety, responsive behavior, metadata,
  canonical domains, asset integrity, and minimal client-side JavaScript.
- Apply the domain ownership and applicable local validation commands defined in
  `AGENTS.md`.
- Preserve existing worktree changes and use no bypass or force-push.
- Keep new SecPal user commits SSH-signed with the existing identity and
  successful local and GitHub verification. Provider signatures are evidence.
- Keep GitHub communication in English and omit AI attribution or promotional
  wording unless the task explicitly documents AI tooling behavior.
