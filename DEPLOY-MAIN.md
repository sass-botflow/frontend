# Deploy `main` — 3 dakika (Darija)

> **Push l `main` = GitHub kaybni l'image.** Bach yban f `botflow.ink`, khass **Restart** f EasyPanel (wla webhook marra wa7da).

---

## Kol marra — push l main

```bash
git push origin main
```

GitHub Actions ghadi ybni `ghcr.io/sass-botflow/frontend:latest` automatiquement.

---

## Bach y-deployi l server — 1 click f EasyPanel

1. Dkhol EasyPanel: `http://187.124.12.89:3000`
2. **sass-botflow** → **frontend**
3. T2akked **Source** = **Docker Image** (mashi GitHub):
   ```
   ghcr.io/sass-botflow/frontend:latest
   ```
4. Klik **Restart** ↻ (wla **Deploy**)

**Ma khassk rebuild!** Ghir pull + restart.

---

## Auto deploy (marra wa7da) — webhook

Hadi hiya **l'as7al** — ma khasskch tdkhol EasyPanel kol marra.

1. EasyPanel → `frontend` → tab **Deployments** → copier **Webhook URL**
2. GitHub → [Secrets](https://github.com/sass-botflow/frontend/settings/secrets/actions) → **New secret**:
   - Name: `EASYPANEL_DEPLOY_WEBHOOK`
   - Value: URL li copiti
3. Men daba, kol **push l main** = build + deploy automatique ✅

---

## T2akked

```bash
curl https://www.botflow.ink/api/health
```

Khass `version` ma tkounch `"dev"` — ila b9at `dev`, server mazal 3la image qdima → dir **Restart** f EasyPanel.

---

## Ila ma kheddamch

| Mochkil | Solution |
|---------|----------|
| GitHub Actions failed (workflow file issue) | Merge latest `main` — fixed in PR workflow hotfix |
| Deploy kaytl3 Cancel | Source = **Docker Image**, mashi GitHub build |
| 404 logo vert | Port = **3000**, chouf Logs |
| version = "dev" | Restart f EasyPanel (pull image jdid) |
| Workflow failed "missing server host" | Zid `EASYPANEL_DEPLOY_WEBHOOK` wla SSH secrets |
| Ma 3andekch accès EasyPanel | Sift l'admin: "Restart container frontend" |

Guide kamil: [DEPLOY-EASYPANEL.md](./DEPLOY-EASYPANEL.md)
