# Deploy DABA — EasyPanel (2 dakika)

> **GHCR private** → ma tst3melch Docker Image. St3mel **GitHub Source** (Tariqa 1).

Guide kamil: **[DEPLOY-MAIN.md](./DEPLOY-MAIN.md)**

---

## Tariqa 1 — GitHub Build ✅ (dir hadi daba)

1. **http://187.124.12.89:3000** → **sass-botflow** → **frontend** → **Source**
2. Type = **GitHub** → `sass-botflow/frontend` → branch **`main`** → **Dockerfile**
3. Port = **3000**
4. Domains: `www.botflow.ink` + `botflow.ink`
5. **Environment** (copier mn `easypanel.env.example`):

```env
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
JWT_SECRET=<nfs backend JWT_SECRET>
NEXT_PUBLIC_APP_URL=https://www.botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
PORT=3000
```

6. **SUPPRIMER:** `DATABASE_URL`, `META_*`, `EVOLUTION_API_KEY`
7. **Deploy** → stana 4-8 d9aya — **MA TKLIKICH Cancel!**
8. Test:

```bash
curl https://www.botflow.ink/api/health
```

Khass `version` ≠ `"dev"`.

9. **Enable Auto Deploy** ON → kol push `main` = rebuild auto

---

## Tariqa 2 — Webhook (bla secrets)

1. EasyPanel → **Deployments** → copier **Deployment Trigger** URL
2. GitHub Actions → **[Deploy now (paste webhook)](https://github.com/sass-botflow/frontend/actions/workflows/deploy-now.yml)** → Run workflow

---

## Tariqa 3 — Docker Image (b3d ma dir GHCR public)

1. GitHub → Packages → `frontend` → **Package settings** → **Public**
2. EasyPanel Source = **Docker Image** → `ghcr.io/sass-botflow/frontend:latest`
3. **Restart** (mashi rebuild 3la VPS)

---

## Ila ba9i kayfail

| Log / Erreur | Hal |
|--------------|-----|
| Cancel f 1 thaniya | Source = **GitHub** (mashi Docker Image) |
| `pull access denied` | GHCR private → GitHub Source |
| Build Killed / timeout | Stana; redeploy; 2GB+ RAM |
| `version: dev` | Redeploy men `main` jdid |
| WhatsApp connect 404 | Backend redeploy — Evolution routes |
