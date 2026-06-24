# Deploy BotFlow f EasyPanel — Guide étape par étape

> **Problème actuel:** `botflow.ink` kay affichi 404 (logo vert dyal EasyPanel) = l'app ma kaynach déployée wla l'container ma kaykhdemch.

## Étape 1 — Dkhol l EasyPanel

1. Fta7 EasyPanel f navigateur (ex: `http://187.124.12.89:3000` wla l'URL li 3tak)
2. Connecté b username/password dyalek

## Étape 2 — Créer le projet (ila ma kaynach)

1. **Create Project** → smiya: `sass-botflow`
2. Dkhol f le projet

## Étape 3 — Ajouter le service Frontend

1. **+ Service** → **App**
2. **Source:** GitHub
3. Connecté GitHub (ila ma connectitch):
   - Install EasyPanel GitHub App
   - Authorize `sass-botflow/frontend`
4. Config:

| Champ | Valeur |
|-------|--------|
| Repository | `sass-botflow/frontend` |
| Branch | `main` |
| Build method | **Dockerfile** |
| Dockerfile path | `Dockerfile` |
| Port | `3000` |

## Étape 4 — Domain

1. F service → **Domains**
2. Zid: `botflow.ink`
3. Enable **HTTPS** (Let's Encrypt)
4. **Internal port:** `3000`

## Étape 5 — Environment Variables

F **Environment** zid had les variables (**runtime**):

```
PORT=3000
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink

# Clerk (obligatoire pour login)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/en
```

F **Build Arguments** (nafs les `NEXT_PUBLIC_*` — EasyPanel → Build):

```
NEXT_PUBLIC_APP_URL=https://botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/en
```

> ⚠️ `NEXT_PUBLIC_*` khasshom yكونو f **build ET runtime**. `CLERK_SECRET_KEY` runtime ghir.

## Étape 6 — Deploy

1. Click **Deploy** (wla **Rebuild**)
2. Sber 3-5 minutes (build kayakhod wa9t)
3. Chouf **Logs** — khass tchouf:
   ```
   ✓ Ready on http://0.0.0.0:3000
   ```

## Étape 7 — Vérification

```bash
curl https://botflow.ink/api/health
```

Khass trj3:
```json
{"status":"ok","service":"botflow-frontend",...}
```

---

## Erreurs communes

### 1. 404 (logo vert EasyPanel)
**Cause:** Container ma kaykhdemch
**Solution:**
- Chouf **Logs** f EasyPanel
- Ila kayn `getaddrinfo EAI_AGAIN` → pull latest `main` (déjà fixé)
- Redeploy

### 2. Build failed
**Cause:** GitHub ma connectich wla branch ghalat
**Solution:**
- Vérifier Repository = `sass-botflow/frontend`
- Branch = `main`
- Reconnect GitHub

### 3. 502 Bad Gateway
**Cause:** Port ghalat
**Solution:** Port = `3000` (mach 80 wla 8000)

### 4. SSL error (Cloudflare)
**Solution:** F Cloudflare → SSL/TLS → **Full** (mach Flexible)

---

## Cloudflare DNS

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | `@` (botflow.ink) | `187.124.12.89` | Proxied ☁️ |
| CNAME | `www` | `botflow.ink` | Proxied ☁️ |
| A | `api` | `187.124.12.89` | Proxied ☁️ |

⚠️ **www** ma tkounch pointée l `parkingpage.namecheap.com`

---

## Backend (API) — service jdid

Ila bghiti `api.botflow.ink` ykhdem, khass service jdid:

| Champ | Valeur |
|-------|--------|
| Repository | `sass-botflow/backend` |
| Branch | `main` |
| Port | `8000` |
| Domain | `api.botflow.ink` |

---

## Checklist rapide

- [ ] GitHub connecté f EasyPanel
- [ ] Repo: `sass-botflow/frontend`
- [ ] Branch: `main`
- [ ] Builder: Dockerfile
- [ ] Port: 3000
- [ ] Domain: botflow.ink + HTTPS
- [ ] Env vars zedthom
- [ ] Deploy / Rebuild
- [ ] Logs: "Ready on 0.0.0.0:3000"
- [ ] `curl https://botflow.ink/api/health` → ok
