# WhatsApp Cloud API — Meta Embedded Signup

BotFlow uses **only** the official Meta WhatsApp Cloud API. Evolution API has been removed.

## Customer flow

1. Login → **Dashboard** → **Connect** (`/dashboard/channels`)
2. Click **Connect WhatsApp Business**
3. Meta Embedded Signup popup (APP_ID + CONFIG_ID)
4. Approve → channel saved encrypted in PostgreSQL
5. Inbound messages: Meta → backend webhook → PostgreSQL → n8n → reply via Graph API

## Production config

| Variable | Value |
|----------|-------|
| `META_APP_ID` | `1811541566932500` |
| `META_EMBEDDED_SIGNUP_CONFIG_ID` | `1353028573456188` |
| OAuth callback | `https://api.botflow.ink/api/channels/whatsapp/callback` |
| Webhook URL | `https://api.botflow.ink/api/channels/whatsapp/webhook` |
| Verify token | `botflow-wa-verify-7k9m2x4p8q` |
| n8n webhook | `https://ecomgcc21.app.n8n.cloud/webhook/0edc08c4-6908-43ce-8f9f-dbc5ace31958` |

## Frontend env (EasyPanel)

```env
NEXT_PUBLIC_META_APP_ID=1811541566932500
NEXT_PUBLIC_META_EMBEDDED_SIGNUP_CONFIG_ID=1353028573456188
NEXT_PUBLIC_API_URL=https://api.botflow.ink
JWT_SECRET=<same as backend>
```

## Backend env (EasyPanel)

See `sass-botflow/backend/.env.example` — never expose `META_APP_SECRET` on frontend.

## n8n reply contract

After processing an inbound message, n8n should call:

```
POST https://api.botflow.ink/messages/send
Content-Type: application/json

{
  "workspaceId": "...",
  "conversationId": "...",
  "phoneNumberId": "...",
  "message": "Reply text"
}
```

## Legacy routes removed

- `/dashboard/whatsapp-profiles` → redirects to `/dashboard/channels`
- `/api/whatsapp/sessions/*` — removed
- Evolution API — removed
