# BotFlow Frontend

Premium AI automation SaaS — unified inbox, AI agent builder, CRM, appointments and analytics.

**Live:** [botflow.ink](https://botflow.ink) · **API:** [api.botflow.ink](https://api.botflow.ink)

### Ma qdertch tdeployi? (2 dakika)

**L'image kaybni f GitHub** — khass ghir t-triggeri EasyPanel:

| Ila 3andek EasyPanel | Ila ma 3andekch EasyPanel |
|----------------------|---------------------------|
| 1. [http://187.124.12.89:3000](http://187.124.12.89:3000) | Sift l'admin message lta7t |
| 2. `sass-botflow` → `frontend` | |
| 3. Klik **Restart** ↻ | |

**Wla** (bla secrets): [Actions → Deploy now → Run workflow](https://github.com/sass-botflow/frontend/actions/workflows/deploy-now.yml) — paste **Deployment Trigger** URL mn EasyPanel.

Guide kamil: [DEPLOY-FACILE.md](./DEPLOY-FACILE.md)

## Stack

- **Next.js 15** + TypeScript + App Router
- **Tailwind CSS v4** + **Shadcn UI**
- **Framer Motion** + **Recharts** + **React Flow**

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Frontend URL (`https://botflow.ink`) |
| `NEXT_PUBLIC_API_URL` | Backend API (`https://api.botflow.ink`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key (server only) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key |

## Routes

| Path | Description |
|------|-------------|
| `/` | Marketing landing page |
| `/pricing` | Pricing plans |
| `/sign-in`, `/sign-up` | Clerk authentication (email + Google) |
| `/onboarding` | Post-signup business setup |
| `/login`, `/register` | Redirect to `/sign-in` and `/sign-up` |
| `/dashboard` | Overview with KPIs |
| `/dashboard/inbox` | Unified multi-channel inbox |
| `/dashboard/bots` | AI agent list |
| `/dashboard/bots/[id]` | Visual workflow builder |
| `/dashboard/crm` | Contacts & pipelines |
| `/dashboard/appointments` | Calendar & booking |
| `/dashboard/analytics` | Charts & metrics |
| `/dashboard/knowledge` | AI knowledge base |
| `/dashboard/team` | Team roles & permissions |
| `/dashboard/billing` | Stripe subscriptions |
| `/dashboard/settings` | Branding & integrations |

## EasyPanel deployment

**Quick guide (Darija):** [DEPLOY-FACILE.md](./DEPLOY-FACILE.md) — webhook GitHub (auto deploy marra wa7da).

### Required settings

| Setting | Value |
|---------|--------|
| Source | GitHub `sass-botflow/frontend` |
| Branch | `main` |
| Build method | **Dockerfile** |
| Domain | `botflow.ink` |
| Internal port | **3000** |
| Health check path | `/api/health` |

### Build arguments

```
NEXT_PUBLIC_APP_URL=https://botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
```

### Verify deployment

After deploy, these must return `200`:

- `https://botflow.ink/`
- `https://botflow.ink/api/health`

If you see EasyPanel's green logo 404 page, the container is not running or the internal port is wrong.

### Common fixes

1. Set internal port to **3000** (not 80 or 8080)
2. Use **Dockerfile** build (not custom start without Docker)
3. Redeploy after pushing latest `main`
4. Check deploy logs for `getaddrinfo` / `HOSTNAME` errors

See [EASYPANEL.md](./EASYPANEL.md) for full troubleshooting.

## Backend

API repo: [sass-botflow/backend](https://github.com/sass-botflow/backend)

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full system design.
