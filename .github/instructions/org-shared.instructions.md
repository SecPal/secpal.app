---
# SPDX-FileCopyrightText: 2026 SecPal
# SPDX-License-Identifier: AGPL-3.0-or-later
name: secpal.app Runtime Overlay
description: Provides additional website governance context when a task needs more than the repo baseline.
---

# secpal.app Runtime Overlay

Use this file only when a task needs additional repo-wide governance context beyond `.github/copilot-instructions.md`.

- `.github/copilot-instructions.md` is the authoritative runtime baseline for this repo.
- Keep changes repo-local, minimal, and consistent with Astro, Tailwind CSS, and static-site conventions.
- Apply the SecPal domain policy and immediate warning and issue triage rules from the repo baseline.
