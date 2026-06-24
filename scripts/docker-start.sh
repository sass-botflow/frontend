#!/bin/sh
set -e

echo "[botflow] Starting container..."
echo "[botflow] DATABASE_URL=${DATABASE_URL:-not set}"

if [ -n "$DATABASE_URL" ]; then
  echo "[botflow] Syncing database schema..."
  if npx prisma db push --skip-generate; then
    echo "[botflow] Database ready."
  else
    echo "[botflow] WARNING: prisma db push failed — starting app anyway."
  fi
else
  echo "[botflow] WARNING: DATABASE_URL missing — channels DB disabled."
fi

export HOSTNAME=0.0.0.0
export PORT="${PORT:-3000}"

echo "[botflow] Launching Next.js on 0.0.0.0:${PORT}..."
exec node server.js
