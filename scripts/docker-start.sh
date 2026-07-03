#!/bin/sh
set -e

export HOSTNAME=0.0.0.0
export PORT="${PORT:-3000}"

echo "[botflow] Launching Next.js on 0.0.0.0:${PORT}..."
exec node server.js
