#!/bin/bash
# SPDX-FileCopyrightText: 2026 SecPal
# SPDX-License-Identifier: MIT

set -euo pipefail

DEFAULT_DEPLOY_ROOT="/home/secpal/www/secpal.app"
PRIMARY_URL="${SECPAL_PRIMARY_URL:-https://secpal.app}"
PRIMARY_WWW_URL="${SECPAL_PRIMARY_WWW_URL:-https://www.secpal.app}"
DEV_URL="${SECPAL_DEV_URL:-https://secpal.dev}"
DEV_WWW_URL="${SECPAL_DEV_WWW_URL:-https://www.secpal.dev}"
SKIP_NGINX_VALIDATION="${SECPAL_SKIP_NGINX_VALIDATION:-0}"
NGINX_BIN="${NGINX_BIN:-$(command -v nginx 2>/dev/null || true)}"

if [[ -z "$NGINX_BIN" && -x "/usr/sbin/nginx" ]]; then
    NGINX_BIN="/usr/sbin/nginx"
fi

usage() {
    cat <<'EOF'
Usage: ./scripts/check-stable.sh [--skip-nginx-validation] [deploy-root]

Verifies the stable secpal.app deployment layout, validates Nginx, and checks
the live HTTPS and redirect behavior of the public domains.

Arguments:
  [deploy-root]  Optional deployment root (default: /home/secpal/www/secpal.app)

Options:
    --skip-nginx-validation  Skip `nginx -t`

Environment overrides:
  SECPAL_PRIMARY_URL        Default: https://secpal.app
  SECPAL_PRIMARY_WWW_URL    Default: https://www.secpal.app
  SECPAL_DEV_URL            Default: https://secpal.dev
  SECPAL_DEV_WWW_URL        Default: https://www.secpal.dev
    SECPAL_SKIP_NGINX_VALIDATION  Set to 1 to skip `nginx -t`

Examples:
  ./scripts/check-stable.sh
    ./scripts/check-stable.sh --skip-nginx-validation
  ./scripts/check-stable.sh /srv/www/secpal.app
EOF
}

log() {
    printf '[check-stable] %s\n' "$1"
}

fail() {
    printf '[check-stable] ERROR: %s\n' "$1" >&2
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
    sudo "$@"
}

assert_symlink() {
    local path="$1"

    [[ -L "$path" ]] || fail "Expected symlink is missing: $path"
}

assert_directory() {
    local path="$1"

    [[ -d "$path" ]] || fail "Expected directory is missing: $path"
}

assert_file() {
    local path="$1"

    [[ -f "$path" ]] || fail "Expected file is missing: $path"
}

assert_redirect() {
    local source_url="$1"
    local expected_location="$2"
    local response
    local status_code
    local redirect_url

    response="$(curl --silent --show-error --connect-timeout 10 --max-time 30 --output /dev/null --max-redirs 0 --write-out '%{http_code} %{redirect_url}' "$source_url")" \
        || fail "curl failed for $source_url: connection or timeout error"
    status_code="${response%% *}"
    redirect_url="${response#* }"

    [[ "$status_code" =~ ^30[1278]$ ]] || fail "Expected redirect from $source_url, got HTTP $status_code"
    [[ "$redirect_url" == "$expected_location" ]] || fail "Unexpected redirect from $source_url: $redirect_url"

    log "Verified redirect: $source_url -> $redirect_url"
}

assert_final_destination() {
    local source_url="$1"
    local response
    local status_code
    local final_url

    response="$(curl --silent --show-error --connect-timeout 10 --max-time 30 --location --output /dev/null --max-redirs 10 --write-out '%{http_code} %{url_effective}' "$source_url")" \
        || fail "curl failed for $source_url: connection or timeout error"
    status_code="${response%% *}"
    final_url="${response#* }"

    [[ "$status_code" == "200" ]] || fail "Expected HTTP 200 from $source_url, got $status_code"

    if [[ "$final_url" != "$PRIMARY_URL/" && "$final_url" != "$PRIMARY_URL/en/" && "$final_url" != "$PRIMARY_URL/de/" ]]; then
        fail "Unexpected final URL for $source_url: $final_url"
    fi

    log "Verified live page: $source_url -> $final_url"
}

assert_http_ok() {
    local url="$1"
    local status_code

    status_code="$(curl --silent --show-error --connect-timeout 10 --max-time 30 --location --output /dev/null --write-out '%{http_code}' "$url")" \
        || fail "curl failed for $url: connection or timeout error"
    [[ "$status_code" == "200" ]] || fail "Expected HTTP 200 for $url, got $status_code"

    log "Verified HTTP 200: $url"
}

validate_nginx_config() {
    if [[ "$SKIP_NGINX_VALIDATION" == "1" ]]; then
        log "Skipping nginx validation because SECPAL_SKIP_NGINX_VALIDATION=1"
        return
    fi

    if "$NGINX_BIN" -t >/dev/null; then
        return
    fi

    run_privileged "$NGINX_BIN" -t >/dev/null
}

DEPLOY_ROOT="$DEFAULT_DEPLOY_ROOT"

while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            usage
            exit 0
            ;;
        --skip-nginx-validation)
            SKIP_NGINX_VALIDATION="1"
            shift
            ;;
        *)
            if [[ "$DEPLOY_ROOT" != "$DEFAULT_DEPLOY_ROOT" ]]; then
                usage
                exit 1
            fi

            DEPLOY_ROOT="$1"
            shift
            ;;
    esac
done

CURRENT_LINK="$DEPLOY_ROOT/current"
PREVIOUS_LINK="$DEPLOY_ROOT/previous"

require_command curl
require_command readlink
if [[ "$SKIP_NGINX_VALIDATION" != "1" ]]; then
    [[ -n "$NGINX_BIN" && -x "$NGINX_BIN" ]] || fail "Required command not found: nginx"
fi

assert_symlink "$CURRENT_LINK"
assert_symlink "$PREVIOUS_LINK"

CURRENT_TARGET="$(readlink -f "$CURRENT_LINK")"
PREVIOUS_TARGET="$(readlink -f "$PREVIOUS_LINK")"
CURRENT_RELEASE_DIR="$(cd "$CURRENT_TARGET/.." && pwd)"

assert_directory "$CURRENT_TARGET"
assert_directory "$PREVIOUS_TARGET"
assert_file "$CURRENT_TARGET/index.html"
assert_file "$CURRENT_TARGET/en/index.html"
assert_file "$CURRENT_TARGET/de/index.html"
assert_file "$CURRENT_RELEASE_DIR/RELEASE.txt"

log "Current release: $CURRENT_TARGET"
log "Previous release: $PREVIOUS_TARGET"
log "Validating nginx configuration"
validate_nginx_config

assert_final_destination "$PRIMARY_URL/"
assert_http_ok "$PRIMARY_URL/en/"
assert_http_ok "$PRIMARY_URL/de/"
assert_redirect "$PRIMARY_WWW_URL/en/" "$PRIMARY_URL/en/"
assert_redirect "$DEV_URL/en/" "$PRIMARY_URL/en/"
assert_redirect "$DEV_WWW_URL/en/" "$PRIMARY_URL/en/"

log "Stable deployment health check passed"