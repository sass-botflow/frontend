# Deploy WhatsApp — Kolchi f 15 d9iqa (Darija)

> **Ma n9derch ndkhol EasyPanel mn Cloud Agent** (SSH blocked). Had guide + GitHub Action = a9rab 7aja l "one click" bla ma t3tik access l server.

---

## Step 0 — Generate env (copy-paste)

F terminal wla GitHub Action logs:

```bash
./scripts/generate-whatsapp-env.sh
```

Kay3tik `AUTHENTICATION_API_KEY` + `EVOLUTION_API_KEY` — **SAVE** qbel ma t deployi.

---

## Step 1 — Evolution API (Compose)

1. Dkhol **http://187.124.12.89:3000**
2. Project **sass-botflow** → **Add Service** → **Compose**
3. Repo: `sass-botflow/frontend` (wla `backend`) → branch `main`
4. Compose path: **`deploy/evolution-api/docker-compose.yml`**
5. Environment — **3 variables ghir** (men script):

```env
SERVER_URL=https://evolution.api.botflow.ink
AUTHENTICATION_API_KEY=<men script>
DATABASE_CONNECTION_URI=postgresql://botflow:botflow@sass-botflow_postgres:5432/evolution?schema=evolution_api
```

6. Domain: `evolution.api.botflow.ink` → port **8080**
7. **Deploy** — khass 3 containers: db-init (once), redis, evolution-api

> **Postgres:** `evolution` database kat crea automatique (service `evolution-db-init`). Ma khasskch SQL ydd.

---

## Step 2 — Backend redeploy

EasyPanel → service **backend** (`api.botflow.ink`) → Environment:

```env
DATABASE_URL=postgresql://botflow:botflow@sass-botflow_postgres:5432/postgres?sslmode=disable
EVOLUTION_API_URL=http://evolution-api:8080
EVOLUTION_API_KEY=<nfs AUTHENTICATION_API_KEY>
JWT_SECRET=<nfs frontend>
```

→ **Deploy** (branch `main`, Dockerfile)

---

## Step 3 — Frontend redeploy

EasyPanel → **frontend** → Source = **GitHub** → `sass-botflow/frontend` → `main`

```env
NEXT_PUBLIC_API_URL=https://api.botflow.ink
BACKEND_API_URL=https://api.botflow.ink
JWT_SECRET=<nfs backend>
```

→ **Deploy**

---

## One-click men GitHub (ila 3ndek webhooks)

1. EasyPanel → **kull service** → Deployments → copy **Deployment Trigger URL**
2. GitHub → [Deploy WhatsApp stack](https://github.com/sass-botflow/frontend/actions/workflows/deploy-whatsapp-stack.yml) → **Run workflow**
3. Paste 3 webhooks (Evolution, backend, frontend)
4. Run — ghadi ydeployi w yverifyi automatique

---

## Verify

```bash
curl -s https://evolution.api.botflow.ink/health
curl -s https://www.botflow.ink/api/setup-status | jq '.ready'
```

`ready: true` → QR linking kheddam.

---

## Ila bqa mochkil

| Symptom | Hal |
|---------|-----|
| Evolution SSL error | Compose ma deployiach — Step 1 |
| `backend_whatsapp outdated` | Redeploy backend Step 2 |
| `version: dev` | Frontend Source = GitHub main Step 3 |
| Gateway Error | JWT_SECRET frontend ≠ backend |

Sift screenshot w webhook URLs ila bghiti Cloud Agent ytrigger deploy lik.
