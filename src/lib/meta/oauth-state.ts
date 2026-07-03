import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const STATE_TTL_MS = 10 * 60 * 1000;

interface OAuthStatePayload {
  userId: string;
  nonce: string;
  exp: number;
  reconnect?: boolean;
}

function getStateSecret() {
  return (
    process.env.META_OAUTH_STATE_SECRET ??
    process.env.INTEGRATION_ENCRYPTION_KEY ??
    process.env.CLERK_SECRET_KEY ??
    "botflow-dev-oauth-state"
  );
}

function sign(data: string) {
  return createHmac("sha256", getStateSecret()).update(data).digest("base64url");
}

export function createOAuthState(userId: string, reconnect = false) {
  const payload: OAuthStatePayload = {
    userId,
    nonce: randomBytes(16).toString("hex"),
    exp: Date.now() + STATE_TTL_MS,
    reconnect: reconnect || undefined,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifyOAuthState(state: string): OAuthStatePayload {
  const [encoded, signature] = state.split(".");
  if (!encoded || !signature) {
    throw new Error("Invalid OAuth state.");
  }

  const expected = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw new Error("OAuth state signature mismatch.");
  }

  const payload = JSON.parse(
    Buffer.from(encoded, "base64url").toString("utf8"),
  ) as OAuthStatePayload;

  if (!payload.userId || !payload.exp || payload.exp < Date.now()) {
    throw new Error("OAuth state expired.");
  }

  return payload;
}
