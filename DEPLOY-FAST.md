# Deploy FAST — 1 dqiqa (bla build f VPS)

> **Site 502?** VPS kayfail f `next build` (RAM 9lila). **Hal sari3:**

## Dir hadchi daba f EasyPanel

1. **frontend** → **Source**
2. Badel **Dockerfile** → **`Dockerfile.release`** (mashi `Dockerfile`)
3. **Save**
4. **Deploy** → stana **1-2 d9aya** (download ghir, ma kaybuildich)

Logs khasshom:
```
Downloading BotFlow bundle (deploy-latest)...
Bundle ready.
[botflow] Launching Next.js on 0.0.0.0:3000
```

## Verify

```bash
curl https://www.botflow.ink/api/health/live
# {"status":"ok","probe":"live"}
```

## 3lach hada sari3?

- GitHub Actions kaybni l'app f cloud (3 d9aya)
- EasyPanel kaydownload bundle jahz — **ma kaydirch `npm run build` f VPS**
- Kol push `main` → bundle jdid f Release `deploy-latest`

## Ila "404" f download

Bundle mazal ma tbana — stana GitHub Actions "Publish Docker image" ykamel (3 d9aya), w redeploy.

## Fallback

Ila `Dockerfile.release` ma kheddamch → `Dockerfile` (build f VPS, 10-15 d9aya, swap added against OOM)
