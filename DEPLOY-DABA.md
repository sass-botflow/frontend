# Deploy DABA — EasyPanel (2 dakika)

> **GHCR image PRIVATE** → `Docker Image` kaytl3 **pull access denied**.  
> **Hal:** Source = **GitHub** + branch `main` + **Dockerfile**.

---

## Dir hadi daba (copy-paste)

### 1 — EasyPanel Source

`http://187.124.12.89:3000` → **sass-botflow** → **frontend** → **Source**

| Champ | Valeur |
|-------|--------|
| Type | **GitHub** |
| Repo | `sass-botflow/frontend` |
| Branch | **`main`** |
| Dockerfile | **`Dockerfile`** (wla `Dockerfile.easypanel` — nfs l7al) |
| Port | **3000** |

**Save** → **Enable Auto Deploy** = ON

### 2 — Environment

Copier mn `easypanel.env.example`:

```env
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
JWT_SECRET=<nfs backend JWT_SECRET>
NEXT_PUBLIC_APP_URL=https://www.botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
PORT=3000
EVOLUTION_API_URL=https://evolution.api.botflow.ink
EVOLUTION_API_KEY=<nfs Evolution AUTHENTICATION_API_KEY>
```

**Supprimer** ila kaynin: `DATABASE_URL`, `INTEGRATION_ENCRYPTION_KEY`

**Zid bach Instagram OAuth ykhdem:**
```env
META_APP_ID=<nfs backend>
META_APP_SECRET=<nfs backend>
```

### 3 — Domains

- `www.botflow.ink` → HTTPS → port 3000
- `botflow.ink` → HTTPS → port 3000

### 4 — Deploy

1. Klik **Deploy**
2. **Stana 5-10 d9aya** — build kaydar 3la VPS
3. **MA TKLIKICH Cancel!**
4. Logs khasshom ybanu:
   - `Build version: xxxxx`
   - `Launching Next.js on 0.0.0.0:3000`

### 5 — Verify

```bash
curl https://www.botflow.ink/api/health
```

| `version` | Ma3na |
|-----------|-------|
| `"dev"` | Build ma kamelch — redeploy |
| `"50d105f"` (git sha) | Deploy OK ✅ |

---

## Ila ba9i kayfail

| Erreur | Hal |
|--------|-----|
| **Cancel** f 1 thaniya | Source mazal **Docker Image** — badel l **GitHub** |
| **pull access denied** | GHCR private — st3mel **GitHub Source** (mashi Docker Image) |
| **Build Killed** | Stana 10 d9aya w redeploy; VPS khass 2GB+ RAM |
| **spawn error -8** | RAM 9lila — restart VPS |
| Clerk error | Zid `CLERK_SECRET_KEY` + `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` |
| `version: dev` | Redeploy; t2akked Dockerfile = `Dockerfile` |

---

## Tariqa 2 — Webhook (bla build 3la VPS)

1. EasyPanel → **Deployments** → copier **Deployment Trigger** URL
2. GitHub → [Deploy now (paste webhook)](https://github.com/sass-botflow/frontend/actions/workflows/deploy-now.yml) → Run workflow

⚠️ Webhook kaykhdem ghir ila Source = **Docker Image** w GHCR public. Ila GHCR private → st3mel Tariqa 1 (GitHub Source).

---

## Tariqa 3 — Docker Image (b3d ma dir GHCR public)

1. GitHub → Actions → **[Make GHCR package public](https://github.com/sass-botflow/frontend/actions/workflows/ghcr-public.yml)** → Run workflow
2. EasyPanel Source = **Docker Image** → `ghcr.io/sass-botflow/frontend:latest`
3. **Deploy** (pull sari3, ma kaybuildich)

Guide kamil: [DEPLOY-MAIN.md](./DEPLOY-MAIN.md)
