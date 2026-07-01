#!/usr/bin/env sh
# Verify production routes for BotFlow frontend.
set -e

BASE_WWW="${BASE_WWW:-https://www.botflow.ink}"
BASE_APEX="${BASE_APEX:-https://botflow.ink}"

check_url() {
  url="$1"
  expect="$2"
  code=$(curl -sI -o /dev/null -w "%{http_code}" "$url" || echo "000")
  if [ "$code" != "$expect" ]; then
    echo "FAIL  $url  (expected HTTP $expect, got $code)"
    return 1
  fi
  echo "OK    $url  (HTTP $code)"
}

echo "=== BotFlow production verification ==="
failed=0

echo ""
echo "-- www (primary app host) --"
check_url "$BASE_WWW/api/health" "200" || failed=1
check_url "$BASE_WWW/privacy" "200" || failed=1
check_url "$BASE_WWW/terms" "200" || failed=1
check_url "$BASE_WWW/data-deletion" "200" || failed=1

echo ""
echo "-- apex (must reach app; 308 redirect to www is OK) --"
apex_code=$(curl -sI -o /dev/null -w "%{http_code}" "$BASE_APEX/privacy" || echo "000")
if [ "$apex_code" = "200" ] || [ "$apex_code" = "301" ] || [ "$apex_code" = "308" ]; then
  echo "OK    $BASE_APEX/privacy  (HTTP $apex_code)"
else
  echo "FAIL  $BASE_APEX/privacy  (HTTP $apex_code)"
  echo "      EasyPanel 404 = apex domain not attached to frontend service."
  echo "      Fix: EasyPanel → frontend → Domains → add botflow.ink (port 3000, HTTPS on)"
  echo "      Or Cloudflare Redirect Rule: botflow.ink/* → https://www.botflow.ink/\$1"
  failed=1
fi

echo ""
if [ "$failed" -eq 0 ]; then
  echo "All checks passed."
  exit 0
fi

echo "Some checks failed."
exit 1
