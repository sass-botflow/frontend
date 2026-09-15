# Deploy NOW — EasyPanel (2 tari9a)

Site **502** = container ma kaykhdemch. Deploy **0-1s** = ma tbana image jdida.

---

## Tari9a A — GitHub + Dockerfile (ma khasskch GHCR)

1. EasyPanel → `sass-botflow` → `frontend` → **Source**
2. Config:

| Champ | Valeur |
|-------|--------|
| Type | **GitHub** |
| Repo | `sass-botflow/frontend` |
| Branch | `main` |
| Dockerfile | `Dockerfile` |
| Port | `3000` |

3. **Build Arguments** — copier `easypanel.build.args.example` (+ `pk_live_...` dyalek)
4. **Environment** — copier `easypanel.env.example` (+ secrets dyalek)
5. **Domains** — `www.botflow.ink` + `botflow.ink` → port `3000` HTTPS
6. **Deploy** → stana **5-10 d9aya** → **MA TKLIKICH Cancel**
7. Logs khasshom:
   - `Build version: xxxxx`
   - `Launching Next.js on 0.0.0.0:3000`

Verify:
```bash
curl https://www.botflow.ink/api/health/live
# {"status":"ok","probe":"live"}
```

---

## Tari9a B — Docker Image (sari3, 1-2 d9aya) — khass GHCR public

### 1) Dir image public (marra wa7da)

GitHub → https://github.com/orgs/sass-botflow/packages → **frontend** → **Package settings** → **Public**

### 2) EasyPanel Source

| Champ | Valeur |
|-------|--------|
| Type | **Docker Image** |
| Image | `ghcr.io/sass-botflow/frontend:latest` |
| Port | `3000` |

**Environment** — nfs `easypanel.env.example`

### 3) Deploy → 1-2 d9aya (pull)

Ila `pull access denied` → GHCR mazal private → dir Hal 1 (GitHub) wla zid Registry PAT: `DEPLOY-EASYPANEL-REGISTRY.md`

---

## Ila build kayfail (Killed / timeout)

1. EasyPanel → stop **backend** w **evolution** 9lila (bach VPS yfre7 RAM)
2. Redeploy frontend
3. Men ba3d restart services lokhrin

---

## Checklist

- [ ] Source = GitHub **wla** Docker Image + GHCR public
- [ ] `CLERK_SECRET_KEY` + `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` f Environment
- [ ] Port = `3000`
- [ ] Deploy stana 5-10 d9aya (build) wla 1-2 d9aya (image pull)
- [ ] `curl https://www.botflow.ink/api/health/live` → `ok`
