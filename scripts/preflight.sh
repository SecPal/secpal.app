#!/usr/bin/env bash
# SPDX-FileCopyrightText: 2026 SecPal Contributors
# SPDX-License-Identifier: MIT

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

# Check if pushing from a protected branch
CURRENT_BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "detached")
PROTECTED_BRANCHES=("main" "master" "production")

for branch in "${PROTECTED_BRANCHES[@]}"; do
  if [ "$CURRENT_BRANCH" = "$branch" ]; then
    echo ""
    echo "❌ BLOCKED: Direct push from protected branch '$branch' is not allowed!"
    echo ""
    echo "Protected branches should only be updated via pull requests."
    echo "Please create a feature branch and submit a PR instead:"
    echo ""
    echo "  git checkout -b feat/your-feature-name"
    echo "  git commit -am 'Your changes'"
    echo "  git push -u origin feat/your-feature-name"
    echo ""
    exit 1
  fi
done

# Auto-detect default branch (fallback to main)
BASE="$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')"
[ -z "${BASE:-}" ] && BASE="main"

echo "Using base branch: $BASE"

# Fetch base branch for PR size check (failure is handled later)
git fetch origin "$BASE" 2>/dev/null || true

# Get list of changed files for conditional checks
CHANGED_FILES=$(git diff --name-only --cached 2>/dev/null || git diff --name-only HEAD 2>/dev/null || echo "")

# 0) Formatting & Compliance
FORMAT_EXIT=0
if command -v npx >/dev/null 2>&1; then
  npx --yes prettier --check --cache '**/*.{md,yml,yaml,json,ts,tsx,js,mjs,astro}' || FORMAT_EXIT=1

  # Only run markdownlint if .md files changed
  if echo "$CHANGED_FILES" | grep -q '\.md$'; then
    npx --yes markdownlint-cli2 '**/*.md' '#node_modules' '#dist' '#.astro' || FORMAT_EXIT=1
  else
    echo "ℹ️  No markdown files changed, skipping markdownlint"
  fi
fi

# Workflow linting
if [ -d .github/workflows ]; then
  if command -v actionlint >/dev/null 2>&1; then
    echo "ℹ️  Skipping actionlint in local preflight (runs in CI)" >&2
  else
    echo "Warning: .github/workflows found but actionlint not installed - skipping workflow lint" >&2
  fi
fi

# Only run REUSE lint if new files were added or license-related files changed
if command -v reuse >/dev/null 2>&1; then
  if [ -n "$CHANGED_FILES" ]; then
    NEW_OR_LICENSE=$(git diff --name-status --cached 2>/dev/null | grep -E '^(A|M.*LICENSE)' || echo "")
    if [ -n "$NEW_OR_LICENSE" ]; then
      reuse lint || FORMAT_EXIT=1
    else
      echo "ℹ️  No new files or license changes, skipping REUSE lint"
    fi
  else
    reuse lint || FORMAT_EXIT=1
  fi
fi

if [ "$FORMAT_EXIT" -ne 0 ]; then
  echo "Formatting/compliance checks failed. Fix issues above." >&2
  exit 1
fi

# Domain Policy Check (CRITICAL: ZERO TOLERANCE)
if [ -f scripts/check-domains.sh ]; then
  bash scripts/check-domains.sh || {
    echo "" >&2
    echo "❌ Domain Policy Violation detected!" >&2
    echo "Fix the violations above before committing." >&2
    exit 1
  }
fi

# 1) Node.js / Astro
if [ -f package.json ] && command -v npm >/dev/null 2>&1; then
  echo "Installing dependencies..."
  npm ci --silent

  echo "Running Astro TypeScript check..."
  npm run check || {
    echo "❌ Astro check failed. Fix type errors above." >&2
    exit 1
  }

  echo "Running ESLint..."
  npm run lint || {
    echo "❌ ESLint failed. Fix linting errors above." >&2
    exit 1
  }

  echo "Running Astro build..."
  npm run build || {
    echo "❌ Astro build failed. Fix build errors above." >&2
    exit 1
  }
fi

# 2) Commit Signature Check
echo "Checking commit signatures..."
UNSIGNED=0
while IFS= read -r commit; do
  # %G?: G=good, B=bad/revoked, U=good/unknown-trust, X=expired, Y=expired-key, E=key-not-found, N=not-signed
  sig=$(git log --format="%G?" -1 "$commit" 2>/dev/null || echo "N")
  if [[ "$sig" == "N" || "$sig" == "B" ]]; then
    echo "  ❌ $(git log --format="%h %s" -1 "$commit") — not signed (status: $sig)" >&2
    UNSIGNED=$((UNSIGNED + 1))
  fi
done < <(git rev-list "origin/$BASE"..HEAD 2>/dev/null || true)

if [ "$UNSIGNED" -gt 0 ]; then
  echo "" >&2
  echo "❌ $UNSIGNED unsigned commit(s) found." >&2
  echo "All commits must be signed (commit.gpgsign=true is required)." >&2
  echo "" >&2
  echo "To re-sign all commits on this branch:" >&2
  echo "  git rebase --exec 'git commit --amend --no-edit -S' origin/$BASE" >&2
  echo "" >&2
  exit 1
fi
echo "✅ All commits are signed"

# 3) PR Size Check
DIFF_STAT=$(git diff --shortstat origin/"$BASE"...HEAD 2>/dev/null || echo "")
if [ -n "$DIFF_STAT" ]; then
  LINES_CHANGED=$(git diff --stat origin/"$BASE"...HEAD 2>/dev/null | tail -1 | grep -oE '[0-9]+ insertion' | grep -oE '[0-9]+' || echo "0")
  DELETIONS=$(git diff --stat origin/"$BASE"...HEAD 2>/dev/null | tail -1 | grep -oE '[0-9]+ deletion' | grep -oE '[0-9]+' || echo "0")
  TOTAL_CHANGES=$((LINES_CHANGED + DELETIONS))
  MAX_LINES=600

  # Allow override via local file
  if [ -f ".preflight-allow-large-pr" ]; then
    echo "⚠️  Large PR override active (.preflight-allow-large-pr). Document the reason in your PR."
  elif [ "$TOTAL_CHANGES" -gt "$MAX_LINES" ]; then
    echo ""
    echo "⚠️  WARNING: PR is large (${TOTAL_CHANGES} lines changed, limit is ${MAX_LINES})"
    echo "Consider splitting this into smaller PRs."
    echo "To override: touch .preflight-allow-large-pr (do NOT commit)"
    echo ""
  else
    echo "✅ PR size OK (${TOTAL_CHANGES}/${MAX_LINES} lines)"
  fi
fi

echo ""
echo "✅ All preflight checks passed!"
