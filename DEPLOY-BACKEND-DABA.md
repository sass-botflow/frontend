# Deploy Backend DABA — EasyPanel (WhatsApp / Evolution)

> **L'mochkil dyalek:** `POST /api/whatsapp/sessions` kayrje3 **502** — backend `api.botflow.ink` **kaykhdem**, walakin **Evolution API ma deployiach** (DNS ma kayjibch `evolution.api.botflow.ink`).

---

## Wach backend deja live?

```bash
curl -s https://api.botflow.ink/health
```

Ila `status: ok` w `config.evolution: true` → backend **deployé**. Ma khasskch t redeploy backend ghir ila zdti env vars jdod.

---

## Step 1 — Deploy Evolution API (Compose)

Hada **l'etape li nqass** — bla Evolution, WhatsApp QR ma ghadi ykhdemch.

1. Dkhol EasyPanel: **http://187.124.12.89:3000**
2. Project **sass-botflow** → **Add Service** → **Compose**
3. GitHub repo: `sass-botflow/backend`
4. Branch: **`main`**
5. Compose path: `deploy/evolution-api/docker-compose.yml`
6. Working dir: `deploy/evolution-api`

### Environment (Evolution Compose)

Generi API key:

```bash
openssl rand -hex 32
```

7ot f Environment (EasyPanel → evolution compose → Environment):

```env
SERVER_URL=https://evolution.api.botflow.ink
SERVER_PORT=8080
AUTHENTICATION_API_KEY=<openssl-rand-hex-32 — SAVE THIS>

DATABASE_PROVIDER=postgresql
DATABASE_CONNECTION_URI=postgresql://botflow:YOUR_POSTGRES_PASSWORD@sass-botflow_postgres:5432/evolution?schema=evolution_api

CACHE_REDIS_ENABLED=true
CACHE_REDIS_URI=redis://evolution-redis:6379/1
CACHE_REDIS_PREFIX_KEY=botflow_evolution

WEBSOCKET_ENABLED=false
WEBHOOK_GLOBAL_ENABLED=false
DEL_INSTANCE=false
LOG_LEVEL=ERROR,WARN,INFO
LANGUAGE=en
```

> **Important:** `YOUR_POSTGRES_PASSWORD` = nfs password dyal Postgres service li deja 3ndek f EasyPanel. Hostname `sass-botflow_postgres` — chouf f EasyPanel → Postgres → internal hostname (ila smito khra, badel f URI).

### Database `evolution`

F EasyPanel → Postgres → Console (wla psql):

```sql
CREATE DATABASE evolution;
```

(Ila deja kayn, skip.)

### Domain Evolution

| Champ | Valeur |
|-------|--------|
| Service | `evolution-api` |
| Port | **8080** |
| Domain | `evolution.api.botflow.ink` |

Zid DNS record (A/CNAME) ila ma zdtihch — EasyPanel kay3tik instructions.

### Deploy

1. Klik **Deploy** f Compose service
2. Stana 3 containers **Running**: `evolution-api`, `evolution-redis`
3. Logs → evolution-api → khass `listening` / port 8080

---

## Step 2 — Backend env vars (Evolution)

EasyPanel → **backend** (api.botflow.ink) → **Environment** → zid/wdl:

```env
EVOLUTION_API_URL=http://evolution-api:8080
EVOLUTION_API_KEY=<nfs AUTHENTICATION_API_KEY mn Step 1>
```

> **Khasshom ykouno IDENTIQUES:** `EVOLUTION_API_KEY` = `AUTHENTICATION_API_KEY`

**Save** → **Redeploy** backend (Deploy tab → Deploy).

---

## Step 3 — T2akked

```bash
# Evolution public
curl -s https://evolution.api.botflow.ink/health

# Backend config
curl -s https://api.botflow.ink/health | jq '.config.evolution'
# → true

# Evolution instances (b API key)
curl -s https://evolution.api.botflow.ink/instance/fetchInstances \
  -H "apikey: YOUR_KEY"
# → [] wla array
```

Men frontend: `/dashboard/whatsapp-profiles` → Connect → QR modal.

---

## Redeploy backend ghir (ila deja 3ndek Evolution)

1. EasyPanel → **backend**
2. Source: GitHub → `sass-botflow/backend` → branch **`main`** → Dockerfile
3. Environment: verify `DATABASE_URL`, `JWT_SECRET`, `PORT=8000`, Evolution vars
4. Domains: `api.botflow.ink` → port **8000**
5. **Deploy** (stana 3-5 d9aya, ma cancelich)

```bash
curl -s https://api.botflow.ink/health
# buildCommit ma khassch ykoun "unknown"
```

---

## Troubleshooting

| Symptom | Hal |
|---------|-----|
| 502 f WhatsApp session create | Evolution ma running — Step 1 |
| `Could not resolve host: evolution.api.botflow.ink` | DNS/domain ma configuréch |
| Evolution restart loop | `DATABASE_CONNECTION_URI` ghalat — chouf Postgres hostname/password |
| 401/403 mn Evolution | `EVOLUTION_API_KEY` ≠ `AUTHENTICATION_API_KEY` |
| Backend ma ywslch Evolution | Backend w Evolution f **nfs EasyPanel project**; URL = `http://evolution-api:8080` |
| `config.evolution: false` | Zid `EVOLUTION_API_URL` + `EVOLUTION_API_KEY` w redeploy backend |

---

## Fix diagnostics (optional — repo admin)

Branch `cursor/whatsapp-evolution-diagnostics-54a8` f backend — kay3tik error details bla 502 generic.  
Issue: https://github.com/sass-botflow/backend/issues/15

Admin: merge branch wla `git apply` patch mn issue.

---

## Checklist

- [ ] Postgres running + database `evolution` created
- [ ] Evolution Compose deployed (evolution-api + redis Running)
- [ ] Domain `evolution.api.botflow.ink` → port 8080
- [ ] `AUTHENTICATION_API_KEY` generated w saved
- [ ] Backend: `EVOLUTION_API_URL` + `EVOLUTION_API_KEY` set
- [ ] Backend redeployed
- [ ] `/health` → `evolution: true`
- [ ] WhatsApp profile connect → QR yban
