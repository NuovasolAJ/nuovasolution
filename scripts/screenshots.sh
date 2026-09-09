#!/usr/bin/env bash
# Review captures: every public route from the live sitemap plus the auth and
# stub surfaces, desktop and mobile, fold and full page. Uses the Microsoft Edge
# already present on Windows in headless mode. No package is installed.
#
# Usage (after `npx next build`):
#   npx next start -p 3005 &   then   bash scripts/screenshots.sh
# Env: BASE (default http://localhost:3005), OUT (default screenshots), EDGE (path to msedge.exe)
#
# The four viewports run concurrently, each on its own browser profile, because
# Chromium refuses a second instance on a profile that is already open.
set -uo pipefail

BASE="${BASE:-http://localhost:3005}"
OUT="${OUT:-screenshots}"
EDGE="${EDGE:-/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe}"
ROOT="$(mktemp -d)"
declare -A PROFILE=( [desktop]="$ROOT/d" [desktop-full]="$ROOT/df" [mobile]="$ROOT/m" [mobile-full]="$ROOT/mf" )
declare -A SIZE=( [desktop]="1440,900" [desktop-full]="1440,4400" [mobile]="390,844" [mobile-full]="390,7200" )
mkdir -p "$OUT" "${PROFILE[@]}"

# Edge is a Windows executable: it needs absolute Windows paths, not MSYS paths.
winpath() { cygpath -w "$1"; }
OUT_WIN="$(winpath "$(realpath "$OUT")")"
ROOT_WIN="$(winpath "$ROOT")"

shot() { # url name viewport
  local url="$1" name="$2" vp="$3"
  # Hard 60 s ceiling per capture: a hung browser instance must never stall the whole run.
  timeout 60 "$EDGE" --headless=new --disable-gpu --hide-scrollbars --no-first-run --no-default-browser-check \
    --user-data-dir="$(winpath "${PROFILE[$vp]}")" --window-size="${SIZE[$vp]}" --virtual-time-budget=4000 \
    --screenshot="$OUT_WIN\\${name}__${vp}.png" "$url" >/dev/null 2>&1 || echo "FAILED ${name}__${vp}"
}

capture() { # path [name]
  local path="$1" name="${2:-}"
  if [ -z "$name" ]; then
    name="$(printf '%s' "$path" | sed 's#^/##; s#[/?&=]#_#g')"
    [ -z "$name" ] && name="root"
  fi
  for vp in desktop desktop-full mobile mobile-full; do shot "$BASE$path" "$name" "$vp" & done
  wait
  echo "captured $path"
}

session() { # query string for the stub session endpoint, applied to every profile
  for vp in desktop desktop-full mobile mobile-full; do
    timeout 60 "$EDGE" --headless=new --disable-gpu --no-first-run --user-data-dir="$(winpath "${PROFILE[$vp]}")" --window-size=800,600 \
      --screenshot="$ROOT_WIN\\_s_${vp}.png" "$BASE/api/bff/auth/login?stub=1&$1" >/dev/null 2>&1 &
  done
  wait
}

# 1. Public routes, from the sitemap the site itself serves.
mapfile -t URLS < <(curl -s "$BASE/sitemap.xml" | grep -o '<loc>[^<]*</loc>' | sed -E 's#</?loc>##g; s#^https?://[^/]+##' | sort -u)
for p in "${URLS[@]}"; do capture "$p"; done

# 2. Auth surfaces and the not-found route.
for p in /en/signup /es/signup /en/login /es/login /en/this-page-does-not-exist /es/this-page-does-not-exist; do capture "$p"; done

# 3. OAuth return states (query params only; no token ever).
capture "/en/connect/callback?provider=whatsapp&status=success" "en_callback_success"
capture "/en/connect/callback?provider=hubspot&status=error&reason=user_cancelled" "en_callback_cancelled"
capture "/en/connect/callback?provider=meta_lead_ads&status=error&reason=externally_pending" "en_callback_pending"
capture "/es/connect/callback?provider=google_calendar&status=error&reason=provider_error" "es_callback_error"

# 4. Onboarding: the six stub cases, holding the stub session in each profile.
for n in 1 2 3 4 5 6; do
  session "case=$n&next=/en/onboarding"
  capture "/en/onboarding" "en_onboarding_case$n"
done
session "case=3&next=/es/onboarding"
capture "/es/onboarding" "es_onboarding_case3"

rm -rf "$ROOT"
echo "done: $(ls "$OUT" | wc -l) files in $OUT"
