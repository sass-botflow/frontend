import { auth, currentUser } from "@clerk/nextjs/server";
import { BackendAuthError } from "@/lib/backend/errors";
import { resolveBackendBearerToken } from "@/lib/backend/token-bridge";
import { authHeaderLogMeta } from "@/lib/backend/logger";

export { BackendAuthError } from "@/lib/backend/errors";

export async function getBackendAuthHeaders(): Promise<Record<string, string>> {
  const authState = await auth({ treatPendingAsSignedOut: false });
  const user = await currentUser();

  if (!authState.userId) {
    throw new BackendAuthError();
  }

  const token = await resolveBackendBearerToken();
  if (!token) {
    throw new BackendAuthError("Missing API session token.");
  }

  const authorization = `Bearer ${token}`;
  const logMeta = authHeaderLogMeta(authorization);

  if (process.env.BACKEND_AUTH_DEBUG === "true" || process.env.NODE_ENV !== "production") {
    console.info("[backend-bff] clerk session resolved", {
      clerkUserId: authState.userId,
      clerkSessionId: authState.sessionId ?? null,
      clerkEmail: user?.primaryEmailAddressId ?? null,
      ...logMeta,
    });
  }

  return {
    Authorization: authorization,
    "Content-Type": "application/json",
  };
}
