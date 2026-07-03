export const META_GRAPH_VERSION = "v21.0";

export const META_OAUTH_SCOPES = [
  "whatsapp_business_management",
  "whatsapp_business_messaging",
  "business_management",
] as const;

export function getMetaAppId() {
  const appId = process.env.META_APP_ID;
  if (!appId) {
    throw new Error("META_APP_ID is not configured.");
  }
  return appId;
}

export function getMetaAppSecret() {
  const secret = process.env.META_APP_SECRET;
  if (!secret) {
    throw new Error("META_APP_SECRET is not configured.");
  }
  return secret;
}

export function getMetaOAuthRedirectUri() {
  return (
    process.env.META_OAUTH_REDIRECT_URI ??
    `${process.env.NEXT_PUBLIC_APP_URL ?? "https://www.botflow.ink"}/auth/meta/callback`
  );
}

export function getMetaOAuthAuthorizeUrl(state: string) {
  const params = new URLSearchParams({
    client_id: getMetaAppId(),
    redirect_uri: getMetaOAuthRedirectUri(),
    state,
    scope: META_OAUTH_SCOPES.join(","),
    response_type: "code",
  });

  return `https://www.facebook.com/${META_GRAPH_VERSION}/dialog/oauth?${params.toString()}`;
}
