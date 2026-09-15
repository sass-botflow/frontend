# URGENT — Site 502 (dir hadchi daba)

## 1) Cancel deploy li kaykhdem
Ila kayban `Creating an optimized production build` → **CANCEL** (build 9dim, 20+ d9aya).

## 2) EasyPanel → frontend → Source
| Champ | Valeur |
|-------|--------|
| Type | GitHub |
| Repo | sass-botflow/frontend |
| Branch | **main** |
| Dockerfile | **Dockerfile** |
| Port | **3000** |

## 3) Environment (obligatoire!)
EasyPanel → frontend → **Environment** — khass hado ykonu m3amarin:
```
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
JWT_SECRET=...
NEXT_PUBLIC_APP_URL=https://www.botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
PORT=3000
```

## 4) Deploy
Klik **Deploy** → stana **1-2 d9aya**.

### Logs s7i7 (sari3):
```
Downloading BotFlow bundle (deploy-latest)...
Bundle ready.
[botflow] Launching Next.js on 0.0.0.0:3000
```

### Logs ghalat (9dim — cancel):
```
npm run build
Creating an optimized production build
```

## 5) Verify
```bash
curl https://www.botflow.ink/api/health/live
```
Khass: `{"status":"ok"}`

## Ila mazal 502
Sift screenshot: **Logs** + **Environment** (blur secrets) + **Source** tab.
