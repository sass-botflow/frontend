# BotFlow Frontend Architecture

## Product

BotFlow is a premium AI automation SaaS for businesses to manage customer communication across WhatsApp, Instagram, TikTok, and Messenger from one unified dashboard.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | Shadcn UI (Radix primitives) |
| Animation | Framer Motion |
| Charts | Recharts |
| Workflow Builder | @xyflow/react |
| Theming | next-themes (dark/light) |

## Production Domains (EasyPanel)

| Service | Domain | Port |
|---------|--------|------|
| Frontend | `botflow.ink` | 3000 |
| API | `api.botflow.ink` | 8000 |

## Directory Structure

```
src/
├── app/
│   ├── (marketing)/          # Landing, pricing
│   │   ├── page.tsx
│   │   └── pricing/
│   ├── (auth)/               # Login, register
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/          # Authenticated app
│   │   └── dashboard/
│   │       ├── page.tsx          # Overview
│   │       ├── inbox/            # Unified inbox
│   │       ├── bots/             # AI agent list
│   │       ├── bots/[id]/        # Visual builder
│   │       ├── crm/              # Contacts & pipelines
│   │       ├── appointments/     # Calendar
│   │       ├── analytics/        # Charts
│   │       ├── knowledge/        # Knowledge base
│   │       ├── team/             # Roles & permissions
│   │       ├── billing/          # Stripe plans
│   │       └── settings/         # Branding, integrations
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                   # Shadcn primitives
│   ├── marketing/            # Landing page sections
│   ├── dashboard/            # App shell components
│   ├── auth/                 # Auth forms
│   └── providers/            # Theme provider
└── lib/
    ├── api.ts                # API client (JWT)
    ├── constants.ts          # Plans, channels, nav
    └── utils.ts              # cn(), formatters
```

## Feature Map

| # | Feature | Route | Status |
|---|---------|-------|--------|
| 1 | Multi-channel Inbox | `/dashboard/inbox` | UI complete |
| 2 | AI Agent Builder | `/dashboard/bots/[id]` | React Flow canvas |
| 3 | WhatsApp Automation | Settings integrations | UI shell |
| 4 | Instagram Automation | Settings integrations | UI shell |
| 5 | TikTok Automation | Settings integrations | UI shell |
| 6 | CRM | `/dashboard/crm` | UI complete |
| 7 | Appointments | `/dashboard/appointments` | UI complete |
| 8 | Analytics | `/dashboard/analytics` | Recharts |
| 9 | Agency Mode | Team + Settings white-label | UI shell |
| 10 | Knowledge Base | `/dashboard/knowledge` | UI complete |
| 11 | Team Management | `/dashboard/team` | UI complete |
| 12 | Subscriptions | `/dashboard/billing` | Stripe UI shell |
| 13 | Notifications | Header bell icon | UI shell |
| 14 | Settings | `/dashboard/settings` | UI complete |

## API Integration

All data fetching goes through `src/lib/api.ts`:

```typescript
import { apiFetch } from '@/lib/api';

const bots = await apiFetch<Bot[]>('/bots');
```

JWT token stored in `localStorage` as `botflow_token`.

## Design System

- **Inspiration:** Linear, Notion, Stripe, Framer
- **Typography:** Geist Sans + Geist Mono
- **Colors:** Indigo/violet primary with OKLCH tokens
- **Dark mode:** Default, system-aware toggle
- **Spacing:** Generous padding, rounded-xl cards

## Deployment

See `Dockerfile` and `README.md` for EasyPanel setup.

## Implementation Phases

1. ✅ Foundation — Next.js shell, all routes, premium UI
2. 🔲 API wiring — Connect all pages to NestJS endpoints
3. 🔲 Real-time — WebSocket inbox updates via Redis
4. 🔲 Bot engine — Workflow execution runtime
5. 🔲 Channel OAuth — WhatsApp, IG, TikTok, Messenger
6. 🔲 Stripe checkout — Live subscription flow
