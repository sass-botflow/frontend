/** Absolute OAuth callback URL required by Clerk in production. */
export function getOAuthCallbackUrl(path: string): string {
  const base =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL ?? "https://www.botflow.ink");

  return `${base.replace(/\/$/, "")}${path}`;
}

/** Single callback route — avoids sign-in catch-all swallowing nested paths. */
export const SSO_CALLBACK = "/sso-callback";
