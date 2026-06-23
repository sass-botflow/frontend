# Sass Botflow Frontend

React + TypeScript + Vite single-page app for the [Sass Botflow](https://github.com/sass-botflow) SaaS platform. Lets users sign up / sign in and manage their automation **bots** and **workflows**, talking to the [backend API](https://github.com/sass-botflow/backend).

## Stack

- **React 19** + **TypeScript**
- **Vite** (dev server + build)
- **React Router** for routing
- **oxlint** for linting

## Quick start

```bash
# Install dependencies
npm install

# (optional) point the app at a non-default backend
cp .env.example .env

# Start the dev server (http://localhost:5173)
npm run dev
```

The app expects the backend API at `http://localhost:8000` by default (override with `VITE_API_URL`).

## EasyPanel deployment

| Service | Domain | Port |
|---------|--------|------|
| Frontend | `botflow.ink` | `3000` |
| Backend | `api.botflow.ink` | `8000` |

1. Connect this GitHub repo in EasyPanel (branch: `main`)
2. Set domain to `botflow.ink` and internal port to `3000`
3. EasyPanel will use the included `Dockerfile`
4. Set build arg / env: `VITE_API_URL=https://api.botflow.ink`
5. On the backend, allow CORS from `https://botflow.ink`

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR (port 5173) |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run lint` | Run oxlint |
| `npm run preview` | Preview the production build |

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Base URL of the backend API |

## Routes

| Path | Description |
|------|-------------|
| `/login`, `/register` | Authentication |
| `/` | Dashboard — list / create / update / delete bots |
| `/bots/:botId` | Bot detail — manage workflows |
