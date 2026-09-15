#!/bin/sh
# Emergency: run frontend from release bundle (EasyPanel host terminal / SSH).
# Usage: CLERK_SECRET_KEY=sk_... NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_... JWT_SECRET=... ./scripts/emergency-up.sh

set -e

IMAGE_NAME="botflow-frontend-emergency"
CONTAINER_NAME="botflow-frontend"
PORT="${PORT:-3000}"
RELEASE_TAG="${RELEASE_TAG:-deploy-latest}"

: "${CLERK_SECRET_KEY:?Set CLERK_SECRET_KEY}"
: "${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:?Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}"

echo "Building emergency image..."
docker build -f Dockerfile -t "$IMAGE_NAME" \
  --build-arg CACHE_BUST="$(date +%s)" \
  --build-arg RELEASE_TAG="$RELEASE_TAG" .

docker stop "$CONTAINER_NAME" 2>/dev/null || true
docker rm "$CONTAINER_NAME" 2>/dev/null || true

echo "Starting container on port ${PORT}..."
docker run -d --name "$CONTAINER_NAME" --restart unless-stopped \
  -p "${PORT}:3000" \
  -e CLERK_SECRET_KEY \
  -e NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY \
  -e JWT_SECRET="${JWT_SECRET:-}" \
  -e NEXT_PUBLIC_APP_URL="${NEXT_PUBLIC_APP_URL:-https://www.botflow.ink}" \
  -e NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-https://api.botflow.ink}" \
  -e EVOLUTION_API_URL="${EVOLUTION_API_URL:-}" \
  -e EVOLUTION_API_KEY="${EVOLUTION_API_KEY:-}" \
  "$IMAGE_NAME"

sleep 5
curl -fsS "http://127.0.0.1:${PORT}/api/health/live" && echo "" && echo "OK — site should be up."
