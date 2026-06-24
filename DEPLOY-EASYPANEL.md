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
```

### 5) Deploy

1. Click **Deploy**
2. Chouf **Logs** — khass:
   ```
   Ready on http://0.0.0.0:3000
   ```
3. Test:
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
