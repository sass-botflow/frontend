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

echo "[botflow] Launching Next.js on 0.0.0.0:${PORT} (version=${APP_VERSION:-dev})..."
exec node server.js
