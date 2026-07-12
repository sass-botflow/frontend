import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const INSTAGRAM_GRAPH_VERSION = "v21.0";
const STATE_TTL_MS = 10 * 60 * 1000;

/** Instagram API with Instagram Login — direct IG professional account connect */
const INSTAGRAM_BUSINESS_SCOPES = [
  "instagram_business_basic",
  "instagram_business_manage_messages",
  "instagram_business_manage_comments",
].join(",");

export interface InstagramAppConfig {
  appId: string;
  appSecret: string;
  redirectUri: string;
}

export interface InstagramOAuthAccount {
  username: string;
  displayName: string;
  pageId: string;
  accessToken: string;
  instagramUserId: string;
  profilePictureUrl: string | null;
}

function base64Url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, "base64").toString("utf8");
}

function getStateSecret(): string {
  const secret = process.env.JWT_SECRET ?? process.env.BACKEND_JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required for Instagram OAuth.");
  }
  return secret;
}

function getAppBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

/**
 * Instagram Business Login uses a dedicated Instagram App ID (not the Facebook App ID).
 * Meta Dashboard → Instagram → API setup with Instagram login → Business login settings
 */
export function getInstagramAppConfig(): InstagramAppConfig | null {
  const appId =
    process.env.INSTAGRAM_APP_ID ??
    process.env.META_INSTAGRAM_APP_ID ??
    process.env.META_APP_ID ??
    process.env.FACEBOOK_APP_ID;
  const appSecret =
    process.env.INSTAGRAM_APP_SECRET ??
    process.env.META_INSTAGRAM_APP_SECRET ??
    process.env.META_APP_SECRET ??
    process.env.FACEBOOK_APP_SECRET;

  if (!appId || !appSecret) return null;

  return {
    appId,
    appSecret,
    redirectUri: `${getAppBaseUrl()}/api/auth/instagram/callback`,
  };
}

export function isInstagramOAuthConfigured(): boolean {
  return getInstagramAppConfig() !== null;
}

export function createInstagramOAuthState(
  userId: string,
  options?: { popup?: boolean },
): string {
  const payload = {
    userId,
    popup: Boolean(options?.popup),
    exp: Date.now() + STATE_TTL_MS,
    nonce: randomBytes(16).toString("hex"),
  };
  const data = base64Url(JSON.stringify(payload));
  const signature = base64Url(
    createHmac("sha256", getStateSecret()).update(data).digest(),
  );
  return `${data}.${signature}`;
}

export function verifyInstagramOAuthState(state: string): {
  userId: string;
  popup: boolean;
} {
  const [data, signature] = state.split(".");
  if (!data || !signature) {
    throw new Error("Invalid OAuth state.");
  }

  const expected = base64Url(
    createHmac("sha256", getStateSecret()).update(data).digest(),
  );

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    throw new Error("OAuth state signature mismatch.");
  }

  const payload = JSON.parse(fromBase64Url(data)) as {
    userId?: string;
    popup?: boolean;
    exp?: number;
  };

  if (!payload.userId || !payload.exp || payload.exp < Date.now()) {
    throw new Error("OAuth state expired. Please try again.");
  }

  return { userId: payload.userId, popup: Boolean(payload.popup) };
}

/** Direct Instagram login — user connects their IG Professional account (not generic Facebook). */
export function buildInstagramAuthorizationUrl(state: string): string {
  const config = getInstagramAppConfig();
  if (!config) {
    throw new Error("Instagram OAuth is not configured on the server.");
  }

  const params = new URLSearchParams({
    client_id: config.appId,
    redirect_uri: config.redirectUri,
    state,
    scope: INSTAGRAM_BUSINESS_SCOPES,
    response_type: "code",
    enable_fb_login: "0",
    force_reauth: "1",
  });

  return `https://www.instagram.com/oauth/authorize?${params.toString()}`;
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => ({}))) as T & {
    error?: { message?: string };
    error_message?: string;
  };

  if (!response.ok) {
    const message =
      body.error?.message ??
      body.error_message ??
      `Instagram API error (${response.status})`;
    throw new Error(message);
  }

  return body;
}

export async function exchangeInstagramCode(code: string): Promise<{
  accessToken: string;
  instagramUserId: string;
}> {
  const config = getInstagramAppConfig();
  if (!config) {
    throw new Error("Instagram OAuth is not configured on the server.");
  }

  const form = new FormData();
  form.append("client_id", config.appId);
  form.append("client_secret", config.appSecret);
  form.append("grant_type", "authorization_code");
  form.append("redirect_uri", config.redirectUri);
  form.append("code", code.replace(/#_$/, ""));

  const response = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    body: form,
    cache: "no-store",
  });

  const body = await parseJsonResponse<{
    access_token?: string;
    user_id?: string;
    data?: Array<{ access_token?: string; user_id?: string }>;
  }>(response);

  const entry = body.data?.[0];
  const accessToken = entry?.access_token ?? body.access_token;
  const instagramUserId = entry?.user_id ?? body.user_id;

  if (!accessToken || !instagramUserId) {
    throw new Error("Instagram did not return an access token.");
  }

  const longLivedParams = new URLSearchParams({
    grant_type: "ig_exchange_token",
    client_secret: config.appSecret,
    access_token: accessToken,
  });

  const longLived = await parseJsonResponse<{ access_token?: string }>(
    await fetch(
      `https://graph.instagram.com/access_token?${longLivedParams.toString()}`,
      { cache: "no-store" },
    ),
  );

  return {
    accessToken: longLived.access_token ?? accessToken,
    instagramUserId,
  };
}

export async function fetchInstagramProfile(
  accessToken: string,
  instagramUserId: string,
): Promise<InstagramOAuthAccount> {
  const params = new URLSearchParams({
    fields: "user_id,username,name,profile_picture_url",
    access_token: accessToken,
  });

  const profile = await parseJsonResponse<{
    user_id?: string;
    username?: string;
    name?: string;
    profile_picture_url?: string;
  }>(
    await fetch(
      `https://graph.instagram.com/${INSTAGRAM_GRAPH_VERSION}/me?${params.toString()}`,
      { cache: "no-store" },
    ),
  );

  const username = profile.username
    ? profile.username.startsWith("@")
      ? profile.username
      : `@${profile.username}`
    : profile.name
      ? `@${profile.name.replace(/\s+/g, "").toLowerCase()}`
      : "@instagram";

  return {
    username,
    displayName: profile.name ?? profile.username ?? username.replace(/^@/, ""),
    pageId: profile.user_id ?? instagramUserId,
    accessToken,
    instagramUserId: profile.user_id ?? instagramUserId,
    profilePictureUrl: profile.profile_picture_url ?? null,
  };
}

export function getInstagramOAuthStartUrl(): string {
  return `${getAppBaseUrl()}/api/auth/instagram`;
}

export function getInstagramRedirectUri(): string {
  return `${getAppBaseUrl()}/api/auth/instagram/callback`;
}
