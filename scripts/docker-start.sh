#!/bin/sh
set -e

echo "[botflow] Starting container..."
echo "[botflow] DATABASE_URL=${DATABASE_URL:-not set}"
echo "[botflow] PORT=${PORT:-3000}"

export HOSTNAME=0.0.0.0
export PORT="${PORT:-3000}"

PRISMA_BIN="/app/node_modules/.bin/prisma"

if [ -n "$DATABASE_URL" ] && [ -x "$PRISMA_BIN" ]; then
  mkdir -p /app/data
  echo "[botflow] Applying database migrations..."
  if "$PRISMA_BIN" migrate deploy; then
    echo "[botflow] Database migrations applied."
  elif "$PRISMA_BIN" db push --skip-generate; then
    echo "[botflow] Database schema synced via db push."
  else
    echo "[botflow] WARNING: database migration failed — starting app anyway."
  fi
elif [ -n "$DATABASE_URL" ]; then
  echo "[botflow] WARNING: prisma CLI not found — skipping migrations."
else
  echo "[botflow] WARNING: DATABASE_URL missing — set file:/app/data/botflow.db"
fi

echo "[botflow] Launching Next.js on 0.0.0.0:${PORT}..."
exec node server.js
