# Deploy kaykamel f 2-3 thaniya? — Fix daba

> Ila EasyPanel Deploy kaykamel **bser3a** (2-3 thaniya) w `version` f health ma katbeddelch → **ma kaydeployich code jdid**.

## Chno kayn daba

Production: `curl https://www.botflow.ink/api/health`

Ila `deployHint` kaygoul "Build 9dim" wla `version` 9dim → deploy ma kheddamch.

## Fix (dir hadi f EasyPanel)

### 1 — Badel Source

EasyPanel → **sass-botflow** → **frontend** → **Source**

| Champ | Valeur |
|-------|--------|
| Type | **GitHub** (mashi Docker Image) |
| Repo | `sass-botflow/frontend` |
| Branch | `main` |
| Dockerfile | `Dockerfile` |
| Port | `3000` |

**Save**

### 2 — Environment

Copier kolchi mn `easypanel.env.example` (CLERK keys, JWT_SECRET, NEXT_PUBLIC_*, PORT=3000).

### 3 — Deploy

1. Klik **Deploy**
2. **Stana 5-10 d9aya** — khass tchouf f Logs:
   - `Build version: xxxxx`
   - `npm run build`
   - `Launching Next.js on 0.0.0.0:3000`
3. **MA TKLIKICH Cancel!**

### 4 — Verify

```bash
curl https://www.botflow.ink/api/health
```

`version` khass tkoun git sha jdid (mashi `dev`, mashi version 9dima).

---

## Ila ba9i kayfail

| Erreur | Hal |
|--------|-----|
| `pull access denied` | Source mazal Docker Image — badel l GitHub |
| `Build Killed` | VPS RAM 9lila — restart VPS w redeploy |
| Cancel f 1 thaniya | Webhook/restart ghir — st3mel GitHub Source + Deploy manual |

## Tariqa 2 — Docker Image (b3d GHCR public)

1. GitHub → Actions → **Make GHCR package public** → Run workflow
2. EasyPanel Source = Docker Image → `ghcr.io/sass-botflow/frontend:latest`
3. Deploy (1-2 d9aya pull)

Guide kamil: [DEPLOY-DABA.md](./DEPLOY-DABA.md)
