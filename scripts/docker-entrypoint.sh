#!/bin/sh
set -e

export HOSTNAME=0.0.0.0
export PORT="${PORT:-3000}"

RELEASE_TAG="${RELEASE_TAG:-deploy-latest}"
BUNDLE_URL="https://github.com/sass-botflow/frontend/releases/download/${RELEASE_TAG}/botflow-frontend-standalone.tar.gz"

echo "[botflow] Downloading latest bundle (${RELEASE_TAG})..."
for i in 1 2 3 4 5; do
  if curl -fsSL -H "Cache-Control: no-cache" -o /tmp/bundle.tar.gz "$BUNDLE_URL"; then
    break
  fi
  echo "[botflow] Download attempt $i failed, retrying..."
  sleep 3
done

test -f /tmp/bundle.tar.gz || (echo "[botflow] ERROR: bundle download failed" && exit 1)

rm -rf /app/*
tar xzf /tmp/bundle.tar.gz -C /app
rm /tmp/bundle.tar.gz
chmod +x /app/docker-start.sh 2>/dev/null || true

if [ -f /app/BUILD_VERSION.txt ]; then
  export APP_VERSION="$(cat /app/BUILD_VERSION.txt)"
fi
if [ -f /app/BUILD_TIME.txt ]; then
  export BUILD_TIME="$(cat /app/BUILD_TIME.txt)"
fi

missing=""
[ -z "${CLERK_SECRET_KEY:-}" ] && missing="${missing} CLERK_SECRET_KEY"
[ -z "${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:-}" ] && missing="${missing} NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"

if [ -n "$missing" ]; then
  echo "[botflow] WARNING: Missing env vars:$missing"
  echo "[botflow] EasyPanel → frontend → Environment → add Clerk keys"
fi

echo "[botflow] Launching Next.js on 0.0.0.0:${PORT} (version=${APP_VERSION:-dev})..."
exec node /app/server.js
