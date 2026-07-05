# WhatsApp Link (Quenvert style) — Deploy DABA

> **Screenshot error "Gateway Error"** = frontend ma kaywslch l backend JSON.  
> **3lach:** `NEXT_PUBLIC_API_URL` ghalat (www instead of api) **wla** Evolution API ma running.

---

## Checklist sari3 (3 services)

| Service | Khass ykon |
|---------|------------|
| Frontend | `NEXT_PUBLIC_API_URL=https://api.botflow.ink` |
| Backend | `DATABASE_URL` + `EVOLUTION_*` + redeploy `main` |
| Evolution Compose | Running (evolution-api + redis) |

Test:
```bash
curl -s https://api.botflow.ink/health | jq '.config.evolution'
curl -s https://www.botflow.ink/api/health | jq '.backend.reachable'
```

---

## 1. Frontend (EasyPanel → frontend → Environment)

```env
NEXT_PUBLIC_API_URL=https://api.botflow.ink
BACKEND_API_URL=https://api.botflow.ink
JWT_SECRET=<nfs backend JWT_SECRET — character b character>
NEXT_PUBLIC_APP_URL=https://www.botflow.ink
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
PORT=3000
```

> **MA DIRCH** `NEXT_PUBLIC_API_URL=https://www.botflow.ink` — hadchi kaydir Gateway Error / HTML 502!

**Redeploy** frontend → Source GitHub → branch `main` → Deploy.

---

## 2. Backend (EasyPanel → backend → Environment)

Database dyalek (postgres DB — OK):

```env
DATABASE_URL=postgresql://botflow:botflow@sass-botflow_postgres:5432/postgres?sslmode=disable
```

> Backend kaydir `prisma db push` f startup — `WhatsAppSession` table ghadi ytcrea automatique f `postgres` DB.

Zid Evolution (men ba3d Step 3):

```env
EVOLUTION_API_URL=http://evolution-api:8080
EVOLUTION_API_KEY=<nfs AUTHENTICATION_API_KEY dyal Evolution>
JWT_SECRET=<nfs frontend>
PORT=8000
CORS_ORIGIN=https://botflow.ink,https://www.botflow.ink
FRONTEND_URL=https://www.botflow.ink
```

**Redeploy** backend — branch `main`, Dockerfile.

Verify:
```bash
curl -s https://api.botflow.ink/health
# config.database: true, config.evolution: true
```

---

## 3. Evolution API (Compose — marra wa7da)

EasyPanel → **Add Service** → **Compose**

| Setting | Value |
|---------|-------|
| Repo | `sass-botflow/backend` |
| Branch | `main` |
| Compose | `deploy/evolution-api/docker-compose.yml` |

**Environment** (3 variables ghir):

```env
SERVER_URL=https://evolution.api.botflow.ink
AUTHENTICATION_API_KEY=<openssl rand -hex 32 — SAVE>
DATABASE_CONNECTION_URI=postgresql://botflow:botflow@sass-botflow_postgres:5432/evolution?schema=evolution_api
```

F Postgres console:

```sql
CREATE DATABASE evolution;
```

Domain: `evolution.api.botflow.ink` → port **8080** → **Deploy**

Copy `AUTHENTICATION_API_KEY` → backend `EVOLUTION_API_KEY` → **Redeploy backend**.

Test:
```bash
curl -s https://evolution.api.botflow.ink/health
# HTTP 200
```

---

## 4. Flow utilisateur (mn ba3d deploy)

1. `/dashboard/whatsapp-profiles`
2. **Add WhatsApp**
3. QR modal yban
4. Scan mn telephone → connected

---

## Troubleshooting

| Symptom | Hal |
|---------|-----|
| **Gateway Error** f page | `NEXT_PUBLIC_API_URL` = `https://api.botflow.ink` + redeploy frontend |
| `backend.reachable: false` f `/api/health` | Backend down wla JWT/network |
| `config.evolution: false` | Zid `EVOLUTION_API_URL` + `EVOLUTION_API_KEY` f backend |
| Evolution `/health` 502 | Deploy Compose Step 3 |
| Create session 502 | Evolution ma running — chouf backend Logs |
| `Unauthorized` | `JWT_SECRET` frontend ≠ backend |

---

## SQL optional (verify tables)

F Postgres (`postgres` database):

```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = 'WhatsAppSession';
```

Ila ma kaynach — redeploy backend (entrypoint kaydir `prisma db push`).
