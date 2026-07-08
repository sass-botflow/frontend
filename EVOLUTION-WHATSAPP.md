# WhatsApp — Evolution API (QR Code)

BotFlow connects WhatsApp via **Evolution API** and QR code pairing.

## Customer flow

1. Dashboard → **Channels** → **WhatsApp**
2. Click **Connect WhatsApp Business**
3. Scan the QR code with WhatsApp → Linked Devices
4. Channel appears as connected with phone number and profile

## Frontend API (BFF → backend)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/channels/whatsapp/connect` | Create instance → `{ instanceId, status: "waiting_qr" }` |
| GET | `/api/channels/whatsapp/{id}/qr` | Poll QR code (base64) |
| GET | `/api/channels/whatsapp/{id}/status` | Poll connection status |
| DELETE | `/api/channels/whatsapp/{id}` | Disconnect / delete session |
| POST | `/api/channels/whatsapp/send` | Send outbound message |

## Backend env (EasyPanel)

```env
EVOLUTION_API_URL=http://sass-botflow_evolution-api:8080
EVOLUTION_API_KEY=<your-api-key>
JWT_SECRET=<same as frontend>
```

## Polling

- QR: every **2 seconds** until available; auto-refresh on expiry
- Status: every **2 seconds** until `CONNECTED`

## Removed

- Meta Embedded Signup / Facebook Login / OAuth
- Meta SDK / WABA / Phone Number ID manual entry
