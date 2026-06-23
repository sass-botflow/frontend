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
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key |

## Routes

| Path | Description |
|------|-------------|
| `/` | Marketing landing page |
| `/pricing` | Pricing plans |
| `/login`, `/register` | Authentication |
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

1. Connect repo `sass-botflow/frontend` (branch: `main`)
2. Domain: `botflow.ink` → port `3000`
3. Build args:
   - `NEXT_PUBLIC_APP_URL=https://botflow.ink`
   - `NEXT_PUBLIC_API_URL=https://api.botflow.ink`
4. Uses included `Dockerfile` (Next.js standalone)

## Backend

API repo: [sass-botflow/backend](https://github.com/sass-botflow/backend)

See [ARCHITECTURE.md](./ARCHITECTURE.md) for full system design.
