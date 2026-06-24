# Deploy bla EasyPanel — 3 dakika

> **Ma t9derch tdkhol EasyPanel?** Makayn mochkil. GitHub kaybni l'image, w nta kat-deployi mn **GitHub Actions** (browser ghir).

---

## Wa7ed marra — zid 3 secrets f GitHub

1. Dkhol: https://github.com/sass-botflow/frontend/settings/secrets/actions
2. **New repository secret** — zid had 3:

| Secret | Chno t7ot |
|--------|-----------|
| `DEPLOY_SSH_HOST` | `187.124.12.89` |
| `DEPLOY_SSH_USER` | `root` |
| `DEPLOY_SSH_KEY` | Clé SSH privée kamla (mn `-----BEGIN OPENSSH PRIVATE KEY-----` tal `-----END...`) |

### Fin tjib SSH key?

- Ila 3andek accès l server: `cat ~/.ssh/id_rsa` (wla key li khdamt bha m3a EasyPanel)
- Ila ma 3andekch: sift l'mhost / l'admin server bach y3tik key wla ydir deploy lik

---

## Kol marra bghiti deploy — 2 clics

1. Dkhol: https://github.com/sass-botflow/frontend/actions/workflows/deploy-easypanel-ssh.yml
2. Klik **Run workflow** → **Run workflow**

GitHub ghadi:
- Pull `ghcr.io/sass-botflow/frontend:latest`
- Restart container dyal frontend
- Ma khassk **t7ell EasyPanel**

**Bonus:** Ila secrets mconfigurin, deploy kaytla3 **automatiquement** men ba3d kol build dyal `main`.

---

## T2akked deploy kheddam

```bash
curl https://www.botflow.ink/api/health
```

Khassk tchouf:
```json
{
  "status": "ok",
  "features": { "premiumChannels": true, "integrationsApi": true }
}
```

F browser: **Ctrl+Shift+R** on https://www.botflow.ink/dashboard/channels

---

## Ila ma 3andekch SSH key — 2 options

### Option A — Sift screenshot l'admin
Sift l'admin server had l'message:
> "Pull `ghcr.io/sass-botflow/frontend:latest` w restart container frontend"

### Option B — SSH direct (ila 3andek password)
```bash
ssh root@187.124.12.89
docker pull ghcr.io/sass-botflow/frontend:latest
docker restart $(docker ps -q --filter name=frontend)
```

---

## Erreurs communes

| Problème | Solution |
|----------|----------|
| Workflow failed: secrets missing | Zid `DEPLOY_SSH_HOST`, `DEPLOY_SSH_USER`, `DEPLOY_SSH_KEY` |
| SSH permission denied | Key ghalat wla user ghalat |
| No running container | Service ma kaynach f server — admin khasso ycreerih f EasyPanel marra wa7da |
| Site mazal qdim | Hard refresh Ctrl+Shift+R wla clear cache |
