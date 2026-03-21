#!/bin/bash
# SPDX-FileCopyrightText: 2026 SecPal
# SPDX-License-Identifier: MIT

set -euo pipefail

DEFAULT_DEPLOY_ROOT="/home/secpal/www/secpal.app"

usage() {
    cat <<'EOF'
Usage: ./scripts/rollback-stable.sh [deploy-root]

Switches secpal.app back to the release referenced by the previous symlink and
reloads Nginx after validating the configuration.

Arguments:
  [deploy-root]  Optional deployment root (default: /home/secpal/www/secpal.app)

Examples:
  ./scripts/rollback-stable.sh
  ./scripts/rollback-stable.sh /srv/www/secpal.app
EOF
}

log() {
    printf '[rollback-stable] %s\n' "$1"
}

fail() {
    printf '[rollback-stable] ERROR: %s\n' "$1" >&2
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

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" || $# -gt 1 ]]; then
    usage
    if [[ $# -gt 1 ]]; then
        exit 1
    fi
    exit 0
fi

DEPLOY_ROOT="${1:-$DEFAULT_DEPLOY_ROOT}"
CURRENT_LINK="$DEPLOY_ROOT/current"
PREVIOUS_LINK="$DEPLOY_ROOT/previous"

require_command readlink
require_command ln

[[ -L "$CURRENT_LINK" ]] || fail "Current release link does not exist: $CURRENT_LINK"
[[ -L "$PREVIOUS_LINK" ]] || fail "Previous release link does not exist: $PREVIOUS_LINK"

CURRENT_TARGET="$(readlink -f "$CURRENT_LINK")"
PREVIOUS_TARGET="$(readlink -f "$PREVIOUS_LINK")"

[[ -d "$CURRENT_TARGET" ]] || fail "Current release target is missing: $CURRENT_TARGET"
[[ -d "$PREVIOUS_TARGET" ]] || fail "Previous release target is missing: $PREVIOUS_TARGET"

log "Rolling back current release to $PREVIOUS_TARGET"
ln -sfn "$CURRENT_TARGET" "$PREVIOUS_LINK"
ln -sfn "$PREVIOUS_TARGET" "$CURRENT_LINK"

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

log "Rollback complete"
printf '\n'
printf 'Current:  %s\n' "$(readlink -f "$CURRENT_LINK")"
printf 'Previous: %s\n' "$(readlink -f "$PREVIOUS_LINK")"