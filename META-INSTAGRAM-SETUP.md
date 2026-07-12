# Instagram Connect — Meta Setup (Darija)

> **Erreur "URL bloquée"?** Redirect URI ma zedtihch f **Instagram Business Login** settings.

---

## 1 — Meta Developer Console

Dkhol: https://developers.facebook.com/apps/1811541566932500/

### A) Zid Instagram product

1. **Add Product** → **Instagram** → Set up
2. **API setup with Instagram login** → Continue

### B) Business Login settings (MOHIM!)

**Instagram** → **API setup with Instagram login** → **Set up Instagram business login** → **Business login settings**

| Champ | Valeur |
|-------|--------|
| **OAuth redirect URIs** | `https://www.botflow.ink/api/auth/instagram/callback` |
| **Deauthorize callback** | `https://www.botflow.ink/api/auth/instagram/callback` |
| **Data deletion** | `https://www.botflow.ink/data-deletion` |

⚠️ **Copier Instagram App ID** w **Instagram App Secret** mn had section — **mashi** Facebook App ID!

### C) Facebook Login (optional backup)

**Facebook Login** → **Settings** → Valid OAuth Redirect URIs:
```
https://www.botflow.ink/api/auth/instagram/callback
```

---

## 2 — EasyPanel Environment

```env
# Instagram Business Login (mn Business login settings — MOHIM!)
INSTAGRAM_APP_ID=<Instagram App ID>
INSTAGRAM_APP_SECRET=<Instagram App Secret>

# Fallback (ila ma 3andekch INSTAGRAM_APP_ID)
META_APP_ID=1811541566932500
META_APP_SECRET=<secret>
```

---

## 3 — Deploy w test

1. EasyPanel → Deploy (stana 5-10 d9aya)
2. `https://www.botflow.ink/dashboard/channels`
3. **Continue with Instagram**
4. Khass ytl3 **Instagram login** (mashi Facebook generic)
5. Connecti compte Instagram Professional dyalek

---

## Erreurs

| Erreur | Hal |
|--------|-----|
| URL bloquée | Zid redirect URI f **Instagram Business login settings** |
| Facebook login b7al | Zid `INSTAGRAM_APP_ID` (Instagram App ID, mashi Facebook) |
| No IG account | Compte khasso ykon **Professional** (Business/Creator) |
