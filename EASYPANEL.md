# EasyPanel — BotFlow Frontend Deploy

> **Guide sari3 (Darija):** [EASYPANEL.txt](./EASYPANEL.txt) · [DEPLOY-FACILE.md](./DEPLOY-FACILE.md)

## ⚠️ GHCR image est PRIVATE

`ghcr.io/sass-botflow/frontend:latest` → **pull access denied** sans credentials.

**Solution recommandée:** EasyPanel **Source = GitHub** (build sur VPS). Voir [DEPLOY-DABA.md](./DEPLOY-DABA.md).

**Alternative:** rendre GHCR public (Actions → **Make GHCR package public**) puis Source = Docker Image.

---

## Configuration (marra wa7da)

| Champ | Valeur |
|-------|--------|
| Project | `sass-botflow` |
| Service | `frontend` |
| **Source type** | **GitHub** (GHCR private) |
| **Repo** | `sass-botflow/frontend` |
| **Branch** | `main` |
| **Dockerfile** | `Dockerfile` |
| **Port** | `3000` |
| Domains | `www.botflow.ink` **et** `botflow.ink` |
| Health check | `/api/health` |

### Environment variables (runtime)

```
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
JWT_SECRET=<same as backend JWT_SECRET>
NEXT_PUBLIC_APP_URL=https://www.botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
PORT=3000
```

**Supprimer** (plus utilisés depuis Prisma removal):

- `DATABASE_URL`
- `INTEGRATION_ENCRYPTION_KEY`

---

## Deploy

1. Push sur `main` → GitHub build image
2. EasyPanel → **Deploy** (ou webhook auto — voir DEPLOY-FACILE.md)
3. **Ne pas cliquer Cancel** — attendre 1-2 min (pull image)

### Vérifier

```bash
curl https://www.botflow.ink/api/health
```

| `version` | Signification |
|-----------|---------------|
| `"dev"` | Image locale / vieille — pas le GHCR build |
| `"9714138..."` (git sha) | Deploy OK ✅ |

---

## Troubleshooting

| Symptôme | Cause | Fix |
|----------|-------|-----|
| Deploy → **Cancel** en 1s | Source = GitHub build | Passer à **Docker Image** |
| **pull access denied** | GHCR image private | GitHub Packages → `frontend` → **Public** (ou PAT registry) |
| EasyPanel 404 (logo vert) | Container down ou domain manquant | Port `3000`, ajouter `botflow.ink` |
| `getaddrinfo EAI_AGAIN` | HOSTNAME bug | Image récente (docker-start.sh force `0.0.0.0`) |
| `version: "dev"` | Pas le GHCR image | Source = Docker Image + redeploy |
| 502 | Mauvais port interne | `3000` |

### GHCR private — registry credentials EasyPanel

Si l'image reste private:

| Champ | Valeur |
|-------|--------|
| Registry | `ghcr.io` |
| Username | ton GitHub username |
| Password | GitHub PAT avec scope `read:packages` |

---

## Cloudflare DNS

```
botflow.ink     A     187.124.12.89    Proxied
www             CNAME botflow.ink      Proxied
api             A     187.124.12.89    Proxied
```

SSL mode: **Full** (pas Flexible).
