# Deploy `main` — EasyPanel (Darija)

> **GHCR image PRIVATE** → `Docker Image` kaytl3 **Cancel** wla `pull access denied`.  
> **Hal:** Source = **GitHub** + branch `main` + **`Dockerfile.easypanel`**.

---

## Step 1 — EasyPanel Source (dir hadi)

1. `http://187.124.12.89:3000` → **sass-botflow** → **frontend** → **Source**
2. Type = **GitHub**
3. Repo = `sass-botflow/frontend`
4. Branch = **`main`**
5. Build = **Dockerfile** → path **`Dockerfile.easypanel`**
6. Port = **3000**
7. Domains = `www.botflow.ink` + `botflow.ink`
8. **Save**

---

## Step 2 — Environment

Copier mn `easypanel.env.example`:

```env
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
JWT_SECRET=<nfs backend JWT_SECRET>
NEXT_PUBLIC_APP_URL=https://www.botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
PORT=3000
```

**Supprimer** ila kaynin: `DATABASE_URL`, `META_*`, `EVOLUTION_API_KEY`

---

## Step 3 — Deploy

1. **Deploy** (wla **Enable Auto Deploy** ON)
2. **Stana 4-8 d9aya** — build kaykhddam 3la VPS
3. **MA TKLIKICH Cancel!**
4. Logs khasshom ybanu: `Build version: xxxxx` w `Launching Next.js on 0.0.0.0:3000`

---

## Step 4 — Verify

```bash
curl https://www.botflow.ink/api/health
```

| `version` | Ma3na |
|-----------|-------|
| `"dev"` | Build qdim / ma kamelch — redeploy |
| `"e05d4d0"` (git sha) | Deploy OK |

---

## Auto deploy kol push

### Option A — EasyPanel Auto Deploy (as7al)

Source → GitHub → **Enable Auto Deploy** ON

### Option B — GitHub Webhook

1. EasyPanel → **Deployments** → copier **Deployment Trigger** URL
2. GitHub → Settings → Webhooks → Add (push event, SSL off)

Guide: [DEPLOY-FACILE.md](./DEPLOY-FACILE.md)

---

## Troubleshooting

| Mochkil | Hal |
|---------|-----|
| Cancel f 1 thaniya | Source mazal **Docker Image** — badel l **GitHub** |
| `pull access denied` | Nfs l7al — GHCR private, st3mel GitHub Source |
| Build Killed / timeout | Stana 8 d9aya; redeploy; VPS RAM 2GB+ |
| `version: dev` | Redeploy men `main` jdid (`.dockerignore` fix) |
| WhatsApp connect 404 | Backend ma deployach — chouf backend `DEPLOY-EVOLUTION.md` |

---

## Tariqa 2 — Docker Image (b3d ma dir GHCR public)

GitHub → Packages → `frontend` → **Change visibility** → **Public**

EasyPanel Source = Docker Image → `ghcr.io/sass-botflow/frontend:latest`
