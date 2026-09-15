#!/bin/sh
set -e

export HOSTNAME=0.0.0.0
export PORT="${PORT:-3000}"

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
  echo "[botflow] EasyPanel → frontend → Environment → add Clerk keys (see easypanel.env.example)"
fi

echo "[botflow] Launching Next.js on 0.0.0.0:${PORT} (version=${APP_VERSION:-dev})..."
exec node server.js
