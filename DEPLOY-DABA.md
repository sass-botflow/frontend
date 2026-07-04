# Deploy DABA — EasyPanel (2 dakika)

> **L'mochkil:** GHCR image **private** → EasyPanel ma kay9derch ypulli → Deploy **Cancel** f 1 thaniya.
> **L'hal:** Badel Source l **GitHub** (repo public — kaybuildi bla GHCR).

---

## Step 1 — Badel Source f EasyPanel

1. Dkhol: **http://187.124.12.89:3000**
2. **sass-botflow** → **frontend** → tab **Source**
3. Badel mn **Docker Image** → **GitHub**
4. Repo: `sass-botflow/frontend`
5. Branch: `main`
6. Build: **Dockerfile** → path: `Dockerfile`
7. **Save**

---

## Step 2 — Environment (copier kolchi)

F tab **Environment**, 7ot hado (runtime + build — EasyPanel kaysta3melhom f jouj):

```
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
JWT_SECRET=<nfs backend JWT_SECRET>
NEXT_PUBLIC_APP_URL=https://www.botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
PORT=3000
```

**SUPPRIMER** ila kaynin:
- `DATABASE_URL`
- `INTEGRATION_ENCRYPTION_KEY`
- `META_APP_ID` / `META_APP_SECRET` (backend ghir)

---

## Step 3 — Domains & Port

| Champ | Valeur |
|-------|--------|
| Domains | `www.botflow.ink` + `botflow.ink` |
| Proxy port | **3000** |

---

## Step 4 — Deploy

1. Klik **Deploy**
2. **STANA 3-5 d9aya** (build kaykhddam)
3. **MA TKLIKICH Cancel!**
4. Chouf **Logs** — khassk tchouf: `Ready` wla `Launching Next.js on 0.0.0.0:3000`

---

## Step 5 — T2akked

```bash
curl https://www.botflow.ink/api/health
```

Khass `version` ma tkounch `"dev"` (git sha).

---

## Auto-deploy (marra wa7da)

Source → GitHub → **Enable Auto Deploy** ON

Men daba kol push l `main` = rebuild automatique.

---

## Ila ba9i kayfail

| Log / Erreur | Hal |
|--------------|-----|
| `pull access denied` | Source mazal **Docker Image** — badel l GitHub |
| Build failed / npm | Chouf `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` f Environment |
| Container exit 1 | Zid `CLERK_SECRET_KEY` + `JWT_SECRET` |
| Cancel f 1 thaniya | Docker Image + GHCR private → **GitHub** |

---

## Tariqa 2 (ila bghiti Docker Image)

Khass GHCR **Public** marra wa7da:
https://github.com/orgs/sass-botflow/packages → frontend → **Public**

Wla zid f EasyPanel Registry credentials (GitHub PAT `read:packages`).

Image: `ghcr.io/sass-botflow/frontend:latest`
