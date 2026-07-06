#!/usr/bin/env bash
# Generate Evolution + backend env for EasyPanel copy-paste.
# Usage: ./scripts/generate-whatsapp-env.sh

set -euo pipefail

API_KEY=$(openssl rand -hex 32)

cat <<EOF
=== Evolution Compose Environment (EasyPanel → Compose → Environment) ===

SERVER_URL=https://evolution.api.botflow.ink
AUTHENTICATION_API_KEY=${API_KEY}
DATABASE_CONNECTION_URI=postgresql://botflow:botflow@sass-botflow_postgres:5432/evolution?schema=evolution_api

=== Backend Environment (after Evolution deploy) ===

EVOLUTION_API_URL=http://evolution-api:8080
EVOLUTION_API_KEY=${API_KEY}

=== Verify (after all 3 deploys) ===

curl -s https://evolution.api.botflow.ink/health
curl -s https://api.botflow.ink/health | jq '.modules,.config.evolution'
curl -s https://www.botflow.ink/api/setup-status | jq '.ready'

EOF
