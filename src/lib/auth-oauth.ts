/** Absolute OAuth callback URL required by Clerk in production. */
export function getOAuthCallbackUrl(path: string): string {
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL ?? "https://botflow.ink");

  return `${base.replace(/\/$/, "")}${path}`;
}

export const SIGN_IN_SSO_CALLBACK = "/sign-in/sso-callback";
export const SIGN_UP_SSO_CALLBACK = "/sign-up/sso-callback";
