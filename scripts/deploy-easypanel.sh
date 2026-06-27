#!/usr/bin/env sh
# Trigger EasyPanel deploy from your machine.
# Usage:
#   EASYPANEL_DEPLOY_URL='http://187.124.12.89:3000/api/deploy/xxxxxxxx' ./scripts/deploy-easypanel.sh
#
# Get the URL from: EasyPanel → sass-botflow → frontend → Deployments → Deployment Trigger

set -e

URL="${EASYPANEL_DEPLOY_URL:-${EASYPANEL_DEPLOY_WEBHOOK:-}}"

if [ -z "$URL" ]; then
  echo "Error: set EASYPANEL_DEPLOY_URL to your EasyPanel Deployment Trigger URL"
  echo ""
  echo "  EasyPanel → frontend → Deployments → copy Deployment Trigger"
  echo "  Example: http://187.124.12.89:3000/api/deploy/xxxxxxxx"
  echo ""
  echo "  EASYPANEL_DEPLOY_URL='http://...' ./scripts/deploy-easypanel.sh"
  exit 1
fi

echo "Triggering EasyPanel deploy..."
curl -fsS -X POST "$URL"
echo ""
echo "Deploy triggered. Wait ~30s then check:"
echo "  curl https://www.botflow.ink/api/health"
