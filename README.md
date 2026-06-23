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

The app expects the backend API at `http://localhost:3001` by default (override with `VITE_API_URL`). The backend's CORS is preconfigured for `http://localhost:5173`.

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
| `VITE_API_URL` | `http://localhost:3001` | Base URL of the backend API |

## Routes

| Path | Description |
|------|-------------|
| `/login`, `/register` | Authentication |
| `/` | Dashboard — list / create / update / delete bots |
| `/bots/:botId` | Bot detail — manage workflows |
