# Deploy — ma khasskch t3ani (Darija)

> **L'mochkil:** GitHub kaybni l'image ✅ — walakin server ma kaypullach ❌ (`version: "dev"` f health).
> **L'hal:** Deploy **daba** b paste URL, wla configuri auto **marra wa7da**.

---

## 🚀 Option 0 — Deploy DABA (2 min, bla secrets)

> ⚠️ **GHCR private** — webhook ghir kaydir **restart** f 1s, ma kaypullich image jdid.  
> Ila `version` ma katbeddelch → chouf **[DEPLOY-EASYPANEL-REGISTRY.md](./DEPLOY-EASYPANEL-REGISTRY.md)**

Ma khassk **la Settings, la secrets**. Ghir paste URL w klik:

### Step 1 — Copier URL mn EasyPanel

1. Dkhol: **http://187.124.12.89:3000**
2. **sass-botflow** → **frontend** → **Deployments**
3. Copier **Deployment Trigger** URL:
   ```
   http://187.124.12.89:3000/api/deploy/xxxxxxxx
   ```

### Step 2 — Run workflow f GitHub

1. Dkhol: https://github.com/sass-botflow/frontend/actions/workflows/deploy-now.yml
2. Klik **Run workflow** (dropdown lfoq)
3. **easypanel_webhook** = paste URL li copiti
4. **Run workflow**

GitHub ghadi ytrigger EasyPanel → pull image jdid → deploy ✅

### Step 3 — T2akked

```bash
curl https://www.botflow.ink/api/health
```

Ila `version` mazal `"98feaff"` wla 9dima → GHCR private. Dir **[DEPLOY-EASYPANEL-REGISTRY.md](./DEPLOY-EASYPANEL-REGISTRY.md)** (Hal 1 wla Hal 2).

---

## ✅ Option 1 — GitHub Source build (RECOMMANDÉ — ma khassch GHCR public)

As7al ila deploy kaykamel f **0-1 seconde**:

1. EasyPanel → **frontend** → **Source** = **GitHub**
2. Repo: `sass-botflow/frontend` · Branch: `main` · Dockerfile: `Dockerfile` · Port: `3000`
3. **Deploy** → stana **5-10 d9aya** (Logs: `npm run build`)
4. **Enable Auto Deploy** ON

---

## Option 1b — Docker Image + webhook (ghir ila GHCR public wla Registry PAT)

F service **frontend**, **Source** khasso ykon:

| Champ | Valeur |
|-------|--------|
| Type | **Docker Image** (+ Registry PAT — voir DEPLOY-EASYPANEL-REGISTRY.md) |
| Image | `ghcr.io/sass-botflow/frontend:latest` |
| Port | `3000` |

**Men daba:** kol `git push origin main` → GitHub webhook → EasyPanel pull + deploy (1-2 d9aya)

---

## ✅ Option 2 — Auto Deploy f EasyPanel (GitHub build)

Nfs Option 1 GitHub Source — ila bghiti EasyPanel ybuildi direct mn code:

1. EasyPanel → **frontend** → **Source** = **GitHub**
2. Repo: `sass-botflow/frontend` · Branch: `main` · Dockerfile
3. **Deploy** → **Enable Auto Deploy** (toggle ON)
4. Zid **Build Arguments** (obligatoire):
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   NEXT_PUBLIC_APP_URL=https://www.botflow.ink
   NEXT_PUBLIC_API_URL=https://api.botflow.ink
   ```

⚠️ **GitHub Source** (Option 1) — ma khassch GHCR public. Docker Image khass Registry PAT wla package public.

---

## ✅ Option 3 — GitHub Secret (webhook f Actions)

Ila bghiti deploy men GitHub Actions:

1. Copier **Deployment Trigger** URL mn EasyPanel (nfs Step 1)
2. https://github.com/sass-botflow/frontend/settings/secrets/actions
3. New secret: `EASYPANEL_DEPLOY_WEBHOOK` = URL
4. Kol push l `main` = build + deploy

---

## Manual (1 click) — ila ma bghitch auto

1. EasyPanel → **frontend**
2. Source = **Docker Image** → `ghcr.io/sass-botflow/frontend:latest`
3. Klik **Deploy** wla **Restart**

---

## T2akked deploy kheddam

```bash
curl https://www.botflow.ink/api/health
```

| `version` | Ma3na |
|-----------|-------|
| `"dev"` | Server 3la image qdima — deploy ma kheddamch |
| `"6987428..."` (git sha) | Deploy jdid ✅ |

Hard refresh: **Ctrl+Shift+R** f browser.

---

## Erreurs

| Mochkil | Hal |
|---------|-----|
| Deploy **0-1 seconde**, version 9dima | GHCR private — [DEPLOY-EASYPANEL-REGISTRY.md](./DEPLOY-EASYPANEL-REGISTRY.md) |
| Deploy → **Cancel** | Source = GitHub → stana 5-10 d9aya |
| Webhook failed (404) | URL ghalat — copier mn EasyPanel → Deployments |
| Pull access denied | GHCR private → Registry PAT wla GitHub Source |
| Ma 3andekch login EasyPanel | Sift l'admin: webhook URL + "enable Docker Image source" |
| Port 404 / logo vert | Internal port = **3000** |

---

## Sift l'admin (copy-paste)

```
Salam, khass deploy dyal BotFlow frontend:

1. EasyPanel → sass-botflow → frontend
2. Source = Docker Image: ghcr.io/sass-botflow/frontend:latest
3. Port = 3000
4. Copier Deployment Trigger URL mn tab Deployments
5. Zid webhook f GitHub: github.com/sass-botflow/frontend/settings/hooks
   - Payload URL = Deployment Trigger URL
   - SSL verification = OFF
   - Events = push

Merci!
```
