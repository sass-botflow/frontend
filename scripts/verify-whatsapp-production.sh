#!/usr/bin/env bash
set -euo pipefail

FRONTEND_HEALTH="${FRONTEND_HEALTH:-https://www.botflow.ink/api/health}"
SETUP_STATUS="${SETUP_STATUS:-https://www.botflow.ink/api/setup-status}"
BACKEND_HEALTH="${BACKEND_HEALTH:-https://api.botflow.ink/health}"
EVOLUTION_HEALTH="${EVOLUTION_HEALTH:-https://evolution.api.botflow.ink/health}"

failures=0

check_http() {
  local label="$1"
  local url="$2"
  local code
  code=$(curl -sS -o /dev/null -w "%{http_code}" --max-time 15 "$url" || echo "000")
  if [[ "$code" =~ ^2 ]]; then
    echo "OK    $label  (HTTP $code)"
  else
    echo "FAIL  $label  (HTTP $code)"
    failures=$((failures + 1))
  fi
}

echo "=== BotFlow WhatsApp production verification ==="
echo

echo "-- Core services --"
check_http "frontend health" "$FRONTEND_HEALTH"
check_http "backend health" "$BACKEND_HEALTH"
check_http "evolution health" "$EVOLUTION_HEALTH"
echo

echo "-- Setup status --"
SETUP_BODY=$(curl -sS --max-time 20 "$SETUP_STATUS" || echo "{}")
READY=$(echo "$SETUP_BODY" | python3 -c "import json,sys; print(json.load(sys.stdin).get('ready', False))" 2>/dev/null || echo "False")

if [[ "$READY" == "True" ]]; then
  echo "OK    setup-status ready=true"
else
  echo "FAIL  setup-status ready=false"
  echo "$SETUP_BODY" | python3 -c "
import json,sys
data=json.load(sys.stdin)
for check in data.get('checks', []):
    if check.get('status') != 'ok':
        print(f\"  - [{check.get('status')}] {check.get('title')}: {check.get('detail')}\")
" 2>/dev/null || echo "  (could not parse setup-status JSON)"
  failures=$((failures + 1))
fi

echo
if [[ "$failures" -gt 0 ]]; then
  echo "$failures check(s) failed."
  exit 1
fi

echo "All WhatsApp infrastructure checks passed."
