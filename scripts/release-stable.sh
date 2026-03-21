#!/bin/bash
# SPDX-FileCopyrightText: 2026 SecPal
# SPDX-License-Identifier: MIT

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DEFAULT_DEPLOY_ROOT="/home/secpal/www/secpal.app"
SITE_URL="https://secpal.app"

usage() {
    cat <<'EOF'
Usage: ./scripts/release-stable.sh <git-ref> [deploy-root]

Builds secpal.app from the given git ref in an isolated temporary worktree and
publishes the resulting dist/ directory into a release folder outside the repo.

Arguments:
  <git-ref>      Tag, branch, or commit to release
  [deploy-root]  Optional deployment root (default: /home/secpal/www/secpal.app)

Examples:
  ./scripts/release-stable.sh main
  ./scripts/release-stable.sh v0.0.1
  ./scripts/release-stable.sh 1a2b3c4 /srv/www/secpal.app
EOF
}

log() {
    printf '[release-stable] %s\n' "$1"
}

fail() {
    printf '[release-stable] ERROR: %s\n' "$1" >&2
    exit 1
}

require_command() {
    command -v "$1" >/dev/null 2>&1 || fail "Required command not found: $1"
}

run_privileged() {
    if [[ "$(id -u)" -eq 0 ]]; then
        "$@"
        return
    fi

    require_command sudo
    if ! sudo -n "$@"; then
        fail "Unable to run privileged command (passwordless sudo required). Command: $*"
    fi
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" || $# -lt 1 || $# -gt 2 ]]; then
    usage
    if [[ $# -lt 1 || $# -gt 2 ]]; then
        exit 1
    fi
    exit 0
fi

GIT_REF="$1"
DEPLOY_ROOT="${2:-$DEFAULT_DEPLOY_ROOT}"
RELEASES_DIR="$DEPLOY_ROOT/releases"
CURRENT_LINK="$DEPLOY_ROOT/current"
PREVIOUS_LINK="$DEPLOY_ROOT/previous"
WORKTREE_DIR=""

require_command git
require_command npm
require_command rsync
require_command readlink

cd "$REPO_ROOT"

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "Repository root is not a git work tree: $REPO_ROOT"
git rev-parse --verify "$GIT_REF^{commit}" >/dev/null 2>&1 || fail "Unknown git ref: $GIT_REF"

cleanup() {
    if [[ -n "$WORKTREE_DIR" && -d "$WORKTREE_DIR" ]]; then
        cd "$REPO_ROOT"
        git worktree remove --force "$WORKTREE_DIR" >/dev/null 2>&1 || true
        rm -rf "$WORKTREE_DIR" >/dev/null 2>&1 || true
    fi
}

trap cleanup EXIT

mkdir -p "$RELEASES_DIR"

WORKTREE_DIR="$(mktemp -d /tmp/secpal-app-release.XXXXXX)"
log "Creating isolated build worktree for $GIT_REF"
git worktree add --detach "$WORKTREE_DIR" "$GIT_REF" >/dev/null

cd "$WORKTREE_DIR"

COMMIT_SHA="$(git rev-parse --short HEAD)"
RELEASE_ID="$(date +%F_%H%M%S)_$COMMIT_SHA"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
TARGET_DIST_DIR="$RELEASE_DIR/dist"

log "Installing dependencies"
npm ci

log "Building release for $SITE_URL"
SECPAL_SITE_URL="$SITE_URL" npm run build

log "Publishing release to $TARGET_DIST_DIR"
mkdir -p "$TARGET_DIST_DIR"
rsync -a --delete "$WORKTREE_DIR/dist/" "$TARGET_DIST_DIR/"

cat > "$RELEASE_DIR/RELEASE.txt" <<EOF
Release: $RELEASE_ID
Git ref: $GIT_REF
Commit: $(git rev-parse HEAD)
Built at: $(date --iso-8601=seconds)
Site URL: $SITE_URL
Source repo: $REPO_ROOT
EOF

if [[ -L "$CURRENT_LINK" ]]; then
    CURRENT_TARGET="$(readlink -f "$CURRENT_LINK")"
    ln -sfn "$CURRENT_TARGET" "$PREVIOUS_LINK"
    log "Updated previous release link -> $CURRENT_TARGET"
fi

ln -sfn "$TARGET_DIST_DIR" "$CURRENT_LINK"
log "Updated current release link -> $TARGET_DIST_DIR"

NGINX_BIN="${NGINX_BIN:-$(command -v nginx 2>/dev/null || true)}"
if [[ -z "$NGINX_BIN" && -x "/usr/sbin/nginx" ]]; then
    NGINX_BIN="/usr/sbin/nginx"
fi
[[ -n "$NGINX_BIN" && -x "$NGINX_BIN" ]] || fail "Required command not found: nginx"
command -v systemctl >/dev/null 2>&1 || fail "Required command not found: systemctl"

log "Validating nginx configuration"
run_privileged "$NGINX_BIN" -t

log "Reloading nginx"
run_privileged systemctl reload nginx

log "Release complete"
printf '\n'
printf 'Release ID: %s\n' "$RELEASE_ID"
printf 'Current:    %s\n' "$TARGET_DIST_DIR"
if [[ -L "$PREVIOUS_LINK" ]]; then
    printf 'Previous:   %s\n' "$(readlink -f "$PREVIOUS_LINK")"
fi