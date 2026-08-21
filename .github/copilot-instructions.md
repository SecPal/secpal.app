<!--
SPDX-FileCopyrightText: 2026 SecPal
SPDX-License-Identifier: AGPL-3.0-or-later
-->

# SecPal/secpal.app Copilot Instructions

This file is a concise compatibility surface for tooling that automatically
loads `.github/copilot-instructions.md`. Root `AGENTS.md` is the authoritative
repository baseline.

The canonical
[`SecPal/.github` work-graph contract](https://github.com/SecPal/.github/blob/main/docs/work-graph-contract.md)
is the only authority for generic work-graph, delivery, review, finding,
replanning, evidence, and stop semantics. Follow it and do not duplicate those
semantics here.

Repository-specific constraints:

- Preserve the Node 22, Astro 7, Tailwind CSS v4, strict TypeScript, static-first
  architecture and minimize client-side JavaScript.
- Preserve semantic HTML, accessibility, keyboard-safe interactions, responsive
  behavior, metadata, canonical links, assets, and generated static output.
- Prefer Astro and platform primitives plus existing patterns before custom
  runtime code or new dependencies.
- Preserve domain ownership: `secpal.app` for the public site and real email,
  `apk.secpal.app` for Android artifacts and metadata, `api.secpal.dev` for the
  API, `app.secpal.dev` for the PWA, `secpal.dev` for non-production examples
  and environments, and `app.secpal` only for the Android application ID.
- Inspect the worktree before writes, preserve existing changes, and use no
  bypass or force-push.
- Keep user commits cryptographically signed using a repository-accepted
  signature format, with successful local and GitHub verification.
- Update `CHANGELOG.md` for product changes rather than governance-only work.
- Use the smallest applicable subset of `npm test`, `npm run lint`,
  `npm run check`, `npm run format:check`, `npm run build`, domain validation,
  changed-file Markdown/REUSE checks, pre-commit hooks, and `git diff --check`.
- Keep GitHub communication in English. Do not add AI attribution or promotional
  wording unless the task explicitly documents AI tooling behavior.

Path-specific detail remains in:

- `.github/instructions/org-shared.instructions.md`
- `.github/instructions/github-workflows.instructions.md`
- `.github/instructions/astro-static.instructions.md`
