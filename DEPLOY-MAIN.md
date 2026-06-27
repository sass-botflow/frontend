# Deploy `main` — 3 dakika (Darija)

> **Ma t9derch tdeployi?** Chouf **[DEPLOY-FACILE.md](./DEPLOY-FACILE.md)** — webhook GitHub (5 min, marra wa7da).

> **Push l `main` = GitHub kaybni l'image.** Bach yban f `botflow.ink`, khass **webhook** wla **Restart** f EasyPanel.

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

**Guide kamil:** [DEPLOY-FACILE.md](./DEPLOY-FACILE.md)

### As7al — GitHub Webhook (ma khassch Actions secrets)

1. EasyPanel → `frontend` → **Deployments** → copier **Deployment Trigger** URL
   (`http://187.124.12.89:3000/api/deploy/xxxxxxxx`)
2. GitHub → [Webhooks](https://github.com/sass-botflow/frontend/settings/hooks) → **Add webhook**
   - Payload URL = URL li copiti
   - SSL verification = **Disable**
   - Events = **push**
3. Men daba kol push l `main` = deploy automatique ✅

### Wla — GitHub Actions secret

1. Nfs URL → GitHub [Secrets](https://github.com/sass-botflow/frontend/settings/secrets/actions)
2. Name: `EASYPANEL_DEPLOY_WEBHOOK`

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
