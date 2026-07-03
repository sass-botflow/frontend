#!/bin/sh
set -e

echo "[botflow] Starting container..."
echo "[botflow] DATABASE_URL=${DATABASE_URL:-not set}"

if [ -n "$DATABASE_URL" ]; then
  mkdir -p /app/data
  echo "[botflow] Applying database migrations..."
  if npx prisma migrate deploy; then
    echo "[botflow] Database migrations applied."
  elif npx prisma db push --skip-generate; then
    echo "[botflow] Database schema synced via db push."
  else
    echo "[botflow] WARNING: database migration failed — starting app anyway."
  fi
else
  echo "[botflow] WARNING: DATABASE_URL missing — set file:/app/data/botflow.db"
fi

export HOSTNAME=0.0.0.0
export PORT="${PORT:-3000}"

echo "[botflow] Launching Next.js on 0.0.0.0:${PORT}..."
exec node server.js
