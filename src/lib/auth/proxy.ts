import { BETTER_AUTH_BASE_PATH } from "@/lib/auth/constants";
import { getBackendApiUrl } from "@/lib/backend/config";

export function buildBackendBetterAuthUrl(pathSegments: string[], search: string): string {
  const path = `${BETTER_AUTH_BASE_PATH}/${pathSegments.join("/")}`;
  const base = getBackendApiUrl(path);
  return search ? `${base}${search}` : base;
}

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

/**
 * Rewrite Set-Cookie from api.botflow.ink so the browser stores it on www.botflow.ink.
 */
export function rewriteSetCookieForFrontend(setCookie: string): string {
  let cookie = setCookie.replace(/;\s*Domain=[^;]*/gi, "");
  cookie = cookie.replace(/;\s*Path=[^;]*/gi, "");

  if (!/;\s*Path=/i.test(cookie)) {
    cookie += "; Path=/";
  }

  if (process.env.NODE_ENV === "production" && !/;\s*Secure/i.test(cookie)) {
    cookie += "; Secure";
  }

  if (!/;\s*SameSite=/i.test(cookie)) {
    cookie += "; SameSite=Lax";
  }

  if (!/;\s*HttpOnly/i.test(cookie)) {
    cookie += "; HttpOnly";
  }

  return cookie;
}

export function collectSetCookies(headers: Headers): string[] {
  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  const single = headers.get("set-cookie");
  return single ? [single] : [];
}

export function buildProxyRequestHeaders(request: Request): Headers {
  const headers = new Headers();

  request.headers.forEach((value, key) => {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower)) return;
    headers.set(key, value);
  });

  return headers;
}

export function buildProxyResponseHeaders(upstream: Headers): Headers {
  const headers = new Headers();

  upstream.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") return;
    if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) return;
    headers.append(key, value);
  });

  for (const cookie of collectSetCookies(upstream)) {
    headers.append("set-cookie", rewriteSetCookieForFrontend(cookie));
  }

  return headers;
}
