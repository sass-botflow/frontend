import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const META_GRAPH_VERSION = "v21.0";
const STATE_TTL_MS = 10 * 60 * 1000;

const INSTAGRAM_SCOPES = [
  "instagram_basic",
  "instagram_manage_messages",
  "pages_show_list",
  "pages_read_engagement",
  "business_management",
].join(",");

export interface MetaAppConfig {
  appId: string;
  appSecret: string;
  redirectUri: string;
}

export interface InstagramOAuthAccount {
  username: string;
  pageId: string;
  accessToken: string;
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

export function getMetaAppConfig(): MetaAppConfig | null {
  const appId = process.env.META_APP_ID ?? process.env.FACEBOOK_APP_ID;
  const appSecret = process.env.META_APP_SECRET ?? process.env.FACEBOOK_APP_SECRET;
  if (!appId || !appSecret) return null;

  return {
    appId,
    appSecret,
    redirectUri: `${getAppBaseUrl()}/api/auth/instagram/callback`,
  };
}

export function isInstagramOAuthConfigured(): boolean {
  return getMetaAppConfig() !== null;
}

export function createInstagramOAuthState(userId: string): string {
  const payload = {
    userId,
    exp: Date.now() + STATE_TTL_MS,
    nonce: randomBytes(16).toString("hex"),
  };
  const data = base64Url(JSON.stringify(payload));
  const signature = base64Url(
    createHmac("sha256", getStateSecret()).update(data).digest(),
  );
  return `${data}.${signature}`;
}

export function verifyInstagramOAuthState(state: string): { userId: string } {
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
    exp?: number;
  };

  if (!payload.userId || !payload.exp || payload.exp < Date.now()) {
    throw new Error("OAuth state expired. Please try again.");
  }

  return { userId: payload.userId };
}

export function buildInstagramAuthorizationUrl(state: string): string {
  const config = getMetaAppConfig();
  if (!config) {
    throw new Error("Instagram OAuth is not configured on the server.");
  }

  const params = new URLSearchParams({
    client_id: config.appId,
    redirect_uri: config.redirectUri,
    state,
    scope: INSTAGRAM_SCOPES,
    response_type: "code",
  });

  return `https://www.facebook.com/${META_GRAPH_VERSION}/dialog/oauth?${params.toString()}`;
}

async function graphGet<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  const body = (await response.json().catch(() => ({}))) as T & {
    error?: { message?: string };
  };

  if (!response.ok) {
    const message = body.error?.message ?? `Meta API error (${response.status})`;
    throw new Error(message);
  }

  return body;
}

export async function exchangeInstagramCode(code: string): Promise<string> {
  const config = getMetaAppConfig();
  if (!config) {
    throw new Error("Instagram OAuth is not configured on the server.");
  }

  const shortLivedParams = new URLSearchParams({
    client_id: config.appId,
    client_secret: config.appSecret,
    redirect_uri: config.redirectUri,
    code,
  });

  const shortLived = await graphGet<{ access_token?: string }>(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/oauth/access_token?${shortLivedParams.toString()}`,
  );

  if (!shortLived.access_token) {
    throw new Error("Meta did not return an access token.");
  }

  const longLivedParams = new URLSearchParams({
    grant_type: "fb_exchange_token",
    client_id: config.appId,
    client_secret: config.appSecret,
    fb_exchange_token: shortLived.access_token,
  });

  const longLived = await graphGet<{ access_token?: string }>(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/oauth/access_token?${longLivedParams.toString()}`,
  );

  return longLived.access_token ?? shortLived.access_token;
}

export async function fetchInstagramBusinessAccount(
  userAccessToken: string,
): Promise<InstagramOAuthAccount> {
  const pages = await graphGet<{
    data?: Array<{
      id?: string;
      name?: string;
      access_token?: string;
      instagram_business_account?: { id?: string; username?: string };
    }>;
  }>(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/me/accounts?fields=id,name,access_token,instagram_business_account{id,username}&access_token=${encodeURIComponent(userAccessToken)}`,
  );

  const page = pages.data?.find(
    (entry) => entry.instagram_business_account?.id && entry.access_token,
  );

  if (!page?.id || !page.access_token || !page.instagram_business_account?.username) {
    throw new Error(
      "No Instagram Professional account found. Link Instagram to a Facebook Page in Meta Business Suite, then try again.",
    );
  }

  return {
    username: page.instagram_business_account.username.startsWith("@")
      ? page.instagram_business_account.username
      : `@${page.instagram_business_account.username}`,
    pageId: page.id,
    accessToken: page.access_token,
  };
}

export function getInstagramOAuthStartUrl(): string {
  return `${getAppBaseUrl()}/api/auth/instagram`;
}
