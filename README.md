# BotFlow Frontend

Premium AI automation SaaS — unified inbox, AI agent builder, CRM, appointments and analytics.

**Live:** [botflow.ink](https://botflow.ink) · **API:** [api.botflow.ink](https://api.botflow.ink)

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

**Quick guide (Darija):** [DEPLOY-FACILE.md](./DEPLOY-FACILE.md) — deploy en 2 min sans secrets.

GitHub Actions bni `ghcr.io/sass-botflow/frontend:latest` sur chaque push `main`. EasyPanel **kat-pulli** l'image — ma tbuildich f EasyPanel.

### Required settings

| Setting | Value |
|---------|--------|
| Source | **Docker Image** `ghcr.io/sass-botflow/frontend:latest` |
| Internal port | **3000** |
| Domains | `www.botflow.ink` + `botflow.ink` |
| Health check | `/api/health` |

### Runtime env

```
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
JWT_SECRET=<same as backend>
NEXT_PUBLIC_APP_URL=https://www.botflow.ink
NEXT_PUBLIC_API_URL=https://api.botflow.ink
```

### Verify deployment

```bash
curl https://www.botflow.ink/api/health
# version must be a git sha, NOT "dev"
```

### Common fixes

1. Source = **Docker Image** (not GitHub + Dockerfile — causes instant Cancel)
2. GHCR package **public** (or add registry PAT in EasyPanel)
3. Internal port **3000**
4. Remove obsolete `DATABASE_URL` env var

See [EASYPANEL.md](./EASYPANEL.md) and [EASYPANEL.txt](./EASYPANEL.txt).

## Backend

API repo: [sass-botflow/backend](https://github.com/sass-botflow/backend)

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full system design.
