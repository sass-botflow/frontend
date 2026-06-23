# Botflow Frontend

Frontend for the Botflow SaaS platform.

## Domains (EasyPanel)

| Service  | Domain              | Port |
| -------- | ------------------- | ---- |
| Frontend | `botflow.ink`       | 3000 |
| Backend  | `api.botflow.ink`   | 8000 |

## Environment

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable               | Value                      |
| ---------------------- | -------------------------- |
| `NEXT_PUBLIC_APP_URL`  | `https://botflow.ink`      |
| `NEXT_PUBLIC_API_URL`  | `https://api.botflow.ink`  |

## Local development

```bash
npm install
npm run dev
```

App runs on http://localhost:3000

## EasyPanel deployment

1. Connect this GitHub repo in EasyPanel
2. Set **domain** to `botflow.ink`
3. Set **internal port** to `3000`
4. Add build env vars:
   - `NEXT_PUBLIC_APP_URL=https://botflow.ink`
   - `NEXT_PUBLIC_API_URL=https://api.botflow.ink`
5. Use the included `Dockerfile` (or set start command to `npm run start`)

## Backend CORS

On `api.botflow.ink` (port 8000), allow requests from:

```
https://botflow.ink
```
