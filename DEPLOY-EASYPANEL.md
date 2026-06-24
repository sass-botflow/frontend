# Deploy BotFlow f EasyPanel — Guide simple (Darija + FR)

> **Daba `botflow.ink` kay affichi 404** = l'app ma deployéch wla l'container ma kaykhdemch.
> Hadi l'guide b jouj tari9a — **Tari9a 1 (Docker Image) hiya l'as7al**.

---

## Tari9a 1 — Docker Image (MA7BOUS ✅)

Ma khassk **tbuildi** f EasyPanel. GitHub kaybni l'image automatiquement, w nta ghir kat-pulliha.

### 1) GitHub Secrets (marra wa7da)

F GitHub → `sass-botflow/frontend` → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret | Valeur |
|--------|--------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` (mn Clerk Dashboard) |

B3d ma tzid had secret, dir **push** l `main` wla f **Actions** → **Publish Docker image** → **Run workflow**.

### 2) Khalli l'image public (marra wa7da)

Men ba3d awwal build:
- GitHub → **Packages** → `frontend` → **Package settings** → **Change visibility** → **Public**

(Ila b9at private, khass credentials f EasyPanel.)

### 3) EasyPanel — créer / configurer service

1. Dkhol EasyPanel (`http://187.124.12.89:3000` wla URL dyalek)
2. Projet: `sass-botflow` → Service: `frontend` (wla créer jdid)
3. **Source** → **`Docker Image`** (mashi GitHub!)
4. Image:
   ```
   ghcr.io/sass-botflow/frontend:latest
   ```
5. **Port:** `3000`
6. **Domains** → `botflow.ink` + HTTPS ON + Internal port `3000`

### 4) Environment Variables (runtime)

```
PORT=3000
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://www.botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/en
DATABASE_URL=file:/app/data/botflow.db
```

### 5) Deploy — **ma khasskch rebuild!**

GitHub kaybni `ghcr.io/sass-botflow/frontend:latest` automatiquement men `main`.

| Ila 3andek | Dir hadchi |
|------------|------------|
| Service deja kaykhdem | **Restart** ghir (mashi Deploy/Rebuild) |
| Ma kaynach Restart | **Deploy** — ghadi ypulli image jdid |
| Ma t9derch tdkhol EasyPanel | Chouf **Option B** lta7t |

---

## ⚡ Ma qdertch ndir Deploy? — 3 options

### Option A — Restart (1 click)
1. EasyPanel → `sass-botflow` → `frontend`
2. Klik **Restart** (icon ↻)
3. Chouf Logs: `Ready on http://0.0.0.0:3000`

### Option B — SSH (ila 3andek accès l server)
```bash
ssh root@187.124.12.89
docker pull ghcr.io/sass-botflow/frontend:latest
docker restart $(docker ps -q --filter name=frontend)
```
*(smiya dyal container yemken tkoun mختلفة — chouf `docker ps`)*

### Option C — 3tini screenshot
Sift screenshot dyal EasyPanel (service frontend) w nqolk **fin tkliki b daba**.

---

### Erreurs communes

| Problème | Solution |
|----------|----------|
| Ma kaynach Deploy button | Khass tkoun f **Project → Service** (mashi accueil) |
| Build failed | St3mel **Docker Image** (Tari9a 1), mashi GitHub build |
| Pull image failed | GHCR public wla credentials |
| 404 / logo vert | Port = **3000**, chouf Logs |
| 502 | Internal port = **3000** |

### Test après restart

F browser: **Ctrl+Shift+R** (hard refresh) on https://www.botflow.ink/dashboard/channels

Vérifier version déployée:
```bash
curl https://www.botflow.ink/api/health
```

Khassk tchouf:
```json
{
  "version": "6987428...",
  "features": { "premiumChannels": true, "integrationsApi": true }
}
```

Ila `version` ma kaynach wla `premiumChannels: false` → **server mazal 3la version qdima**. Khass **Deploy** (pull image), mashi ghir Restart.

### Deploy mn GitHub (ila EasyPanel ma kheddamch)

1. GitHub → repo → **Settings** → **Secrets** → zid:
   - `DEPLOY_SSH_HOST` = `187.124.12.89`
   - `DEPLOY_SSH_USER` = `root`
   - `DEPLOY_SSH_KEY` = clé SSH privée
2. **Actions** → **Deploy to EasyPanel server** → **Run workflow**

---

### Ancien test health
   ```bash
   curl https://www.botflow.ink/api/health
   ```

---

## Tari9a 2 — GitHub + Dockerfile

Ila bghiti EasyPanel ybuildi mn code:

| Champ | Valeur |
|-------|--------|
| Source | GitHub |
| Repository | `sass-botflow/frontend` |
| Branch | `main` |
| Build method | **Dockerfile** |
| Dockerfile path | `Dockerfile` |
| Port | `3000` |

**Build Arguments** (obligatoire):

```
NEXT_PUBLIC_APP_URL=https://www.botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/en
```

**Runtime env:** nafs variables + `CLERK_SECRET_KEY` + `PORT=3000`.

---

## Ma9dertch ndir Deploy? — Solutions

### "Ma kaynach Deploy button" / ma 3reftch fin
- Khass tkoun f **Project** → **Service** (mashi ghir l'accueil)
- Service type = **App**
- Ila ma kaynach service: **+ Service** → **App**

### "Build failed" (Tari9a 2)
- Vérifier **Build Arguments** — `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` khasso yكون
- Branch = `main`
- GitHub connecté (EasyPanel GitHub App)
- **Solution as7al:** st3mel **Tari9a 1** (Docker Image)

### "Pull image failed" (Tari9a 1)
- Image public f GitHub Packages (voir étape 2)
- Wla zid Registry credentials f EasyPanel:
  - Username: ton GitHub username
  - Password: GitHub Personal Access Token (`read:packages`)

### 404 (logo vert EasyPanel)
- Container ma kaykhdemch — chouf **Logs**
- Port = `3000` (machi 80)
- Redeploy

### 502 Bad Gateway
- Internal port ghalat → `3000`

### SSL / Cloudflare
- Cloudflare → SSL/TLS → **Full** (machi Flexible)

---

## Cloudflare DNS

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | `@` | `187.124.12.89` | Proxied ☁️ |
| CNAME | `www` | `botflow.ink` | Proxied ☁️ |
| A | `api` | `187.124.12.89` | Proxied ☁️ |

⚠️ `www` ma tkounch `parkingpage.namecheap.com`

---

## Clerk Dashboard (obligatoire)

F [dashboard.clerk.com](https://dashboard.clerk.com) → **User & Authentication**:

| Setting | Valeur |
|---------|--------|
| **Email** | Enabled |
| **Password** | Enabled |
| **Verify at sign-up** | **OFF** (ma khassch code f email) |
| **Client Trust** | **OFF** (ma yb9ach yطلب verify kol mara) |
| **Session lifetime** | **7 days** wla ktar (Sessions → max lifetime) |
| **Google** | Enabled |
| **Domains** | `https://www.botflow.ink` + `https://botflow.ink` |

---

## Checklist rapide

- [ ] GitHub secret `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` zedtih
- [ ] Workflow **Publish Docker image** kheddam (Actions tab)
- [ ] Package GHCR public
- [ ] EasyPanel source = **Docker Image** `ghcr.io/sass-botflow/frontend:latest`
- [ ] Port 3000 + domain `botflow.ink`
- [ ] Env vars (Clerk keys)
- [ ] Deploy → Logs "Ready on 0.0.0.0:3000"
- [ ] `curl https://www.botflow.ink/api/health` → ok

---

## Backend (API) — service jdid

| Champ | Valeur |
|-------|--------|
| Repository | `sass-botflow/backend` |
| Branch | `main` |
| Port | `8000` |
| Domain | `api.botflow.ink` |
