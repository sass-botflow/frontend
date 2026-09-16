import { BETTER_AUTH_BASE_PATH } from "@/lib/auth/constants";

/**
 * Same-origin base URL for Better Auth client requests (proxied to NestJS).
 * Never points at api.botflow.ink from the browser.
 */
export function getAuthAppBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

export function getAuthClientOptions() {
  return {
    baseURL: getAuthAppBaseUrl(),
    basePath: BETTER_AUTH_BASE_PATH,
    fetchOptions: {
      credentials: "include" as RequestCredentials,
    },
  };
}
