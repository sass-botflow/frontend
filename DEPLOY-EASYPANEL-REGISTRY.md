# EasyPanel — GHCR Registry (deploy kaykamel f 1s?)

> **Symptôme:** Deployments tab → durée **0-1 seconde** + version ma katbeddelch.  
> **Cause:** Source = **Docker Image** w GHCR **private** → EasyPanel ma kay9derch ypulli → restart ghir.

Image jdid kayn f GitHub Actions (`d0ed613` wla aktar) — walakin server ma kaywslouch.

---

## Hal 1 — GitHub Source (as7al, bla GHCR)

1. EasyPanel → **sass-botflow** → **frontend** → **Source**
2. Badel:

| Champ | Valeur |
|-------|--------|
| Type | **GitHub** |
| Repo | `sass-botflow/frontend` |
| Branch | `main` |
| Dockerfile | `Dockerfile` |
| Port | `3000` |

3. **Save** → **Deploy**
4. **Stana 5-10 d9aya** — f **Logs** khass tchouf `npm run build`
5. Verify: `curl https://www.botflow.ink/api/health` → `version` ≠ `98feaff`

---

## Hal 2 — Docker Image + Registry credentials (sari3, 1-2 d9aya)

Ila bghiti tb9a 3la **Docker Image** + webhook:

### A) Dir GHCR public (1 dqiqa)

1. Dkhol: https://github.com/orgs/sass-botflow/packages
2. Clique **frontend** → **Package settings**
3. **Change visibility** → **Public**
4. EasyPanel → **Deploy**

### B) Wla zid Registry credentials f EasyPanel

EasyPanel → **frontend** → **Source** (Docker Image) → **Registry**

| Champ | Valeur |
|-------|--------|
| Registry URL | `ghcr.io` |
| Username | GitHub username dyalek (ex: `BAYLA09`) |
| Password | GitHub **PAT** b scope `read:packages` |

**Créer PAT:**
1. https://github.com/settings/tokens → **Generate new token (classic)**
2. Scope: `read:packages`
3. Copier token → paste f EasyPanel Registry Password

**Image:** `ghcr.io/sass-botflow/frontend:latest`  
**Port:** `3000`

Men ba3d: **Deploy** → khass yakhod 1-2 d9aya (pull) w `version` ytbeddel.

---

## Chno ma dirch

| ❌ Ghalat | ✅ S7i7 |
|----------|--------|
| Deploy f Deployments tab → 1s → version 9dima | Source = GitHub → Deploy → 5-10 d9aya |
| Webhook ghir bla registry credentials | Registry PAT wla GHCR public |
| Cancel f build | Stana l build ykamel |

---

## Verify

```bash
curl -s https://www.botflow.ink/api/health | grep version
```

Khass `version` tkoun `d0ed613` (wla aktar) — mashi `98feaff`.
