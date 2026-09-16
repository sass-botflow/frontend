#!/bin/sh
set -e

export HOSTNAME=0.0.0.0
export PORT="${PORT:-3000}"

RELEASE_TAG="${RELEASE_TAG:-deploy-latest}"
BUNDLE_BASE="https://github.com/sass-botflow/frontend/releases/download/${RELEASE_TAG}/botflow-frontend-standalone.tar.gz"

download_bundle() {
  local bust
  bust="$(date +%s)"
  echo "[botflow] Downloading latest bundle (${RELEASE_TAG}, bust=${bust})..."

  for i in 1 2 3 4 5; do
    if curl -fsSL \
      -H "Cache-Control: no-cache, no-store" \
      -H "Pragma: no-cache" \
      -o /tmp/bundle.tar.gz \
      "${BUNDLE_BASE}?t=${bust}"; then
      break
    fi
    echo "[botflow] Download attempt $i failed, retrying..."
    sleep 3
  done

  test -f /tmp/bundle.tar.gz || {
    echo "[botflow] ERROR: bundle download failed"
    exit 1
  }

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

  echo "[botflow] Bundle ready — version=${APP_VERSION:-dev} buildTime=${BUILD_TIME:-unknown}"
}

missing=""
[ -z "${CLERK_SECRET_KEY:-}" ] && missing="${missing} CLERK_SECRET_KEY"
[ -z "${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:-}" ] && missing="${missing} NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"

if [ -n "$missing" ]; then
  echo "[botflow] WARNING: Missing env vars:$missing"
  echo "[botflow] EasyPanel → frontend → Environment → add Clerk keys"
fi

NODE_PID=""
SHUTDOWN=0

cleanup() {
  SHUTDOWN=1
  if [ -n "$NODE_PID" ]; then
    kill -TERM "$NODE_PID" 2>/dev/null || true
    wait "$NODE_PID" 2>/dev/null || true
  fi
  exit 0
}

trap cleanup TERM INT

download_bundle

while [ "$SHUTDOWN" = "0" ]; do
  echo "[botflow] Launching Next.js on 0.0.0.0:${PORT} (version=${APP_VERSION:-dev})..."
  node /app/server.js &
  NODE_PID=$!
  wait "$NODE_PID" || true
  EXIT=$?
  NODE_PID=""

  if [ "$SHUTDOWN" = "1" ]; then
    exit 0
  fi

  echo "[botflow] Node exited (code=${EXIT}), refreshing bundle before restart..."
  download_bundle
  sleep 2
done
