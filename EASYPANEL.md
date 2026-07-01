# EasyPanel Deployment Guide — BotFlow Frontend

## Root cause of EasyPanel 404

EasyPanel shows its own 404 page (green hexagon logo) when the reverse proxy cannot reach a healthy container.

**Primary code cause (fixed):** Docker injects `HOSTNAME=<container-id>` at runtime. Next.js standalone reads `process.env.HOSTNAME` and tries to bind to that hostname. The server crashes with:

```
Error: getaddrinfo EAI_AGAIN <container-id>
```

The container never stays up → EasyPanel returns 404.

**Fix:** Force bind address at runtime:

```dockerfile
CMD ["sh", "-c", "HOSTNAME=0.0.0.0 PORT=${PORT:-3000} node server.js"]
```

## EasyPanel configuration

### Service settings

| Field | Value |
|-------|-------|
| Project | `sass-botflow` |
| Service name | `frontend` |
| Repository | `https://github.com/sass-botflow/frontend` |
| Branch | `main` |
| Builder | **Dockerfile** |
| Dockerfile path | `./Dockerfile` |

### Networking

| Field | Value |
|-------|-------|
| Domains | **`www.botflow.ink`** and **`botflow.ink`** (both required) |
| HTTPS | Enabled (Let's Encrypt) for each domain |
| Internal port | `3000` |
| Health check | `/api/health` |

> **Important:** If only `www.botflow.ink` is configured, apex `botflow.ink` shows the green EasyPanel 404 page for every route (`/privacy`, `/`, etc.). Add **both** domains to the same `frontend` service.

### Environment / build args

**Runtime env:**
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

**Docker build args** (same `NEXT_PUBLIC_*` keys):
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

## Verification checklist

After deploy:

```bash
curl -I https://www.botflow.ink/privacy
# Expected: HTTP/2 200

curl -I https://botflow.ink/privacy
# Expected: HTTP/2 308 (redirect to www) or 200

curl https://www.botflow.ink/api/health
# Expected: {"status":"ok","service":"botflow-frontend",...}

./scripts/verify-production.sh
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| EasyPanel 404 logo | Container not running **or apex domain missing** | Add `botflow.ink` + `www.botflow.ink` in Domains |
| `getaddrinfo EAI_AGAIN` | HOSTNAME binding bug | Pull latest `main` with Dockerfile fix |
| Build fails | Missing lockfile | Ensure `package-lock.json` is committed |
| 502 Bad Gateway | Wrong internal port | Set port to `3000` in EasyPanel |
| SSL errors | Cloudflare mode | Use **Full** SSL mode |

## Cloudflare DNS

```
botflow.ink     A     187.124.12.89    Proxied
www             CNAME botflow.ink      Proxied
api             A     187.124.12.89    Proxied
```

Do **not** point `www` to `parkingpage.namecheap.com`.
