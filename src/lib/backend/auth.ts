import { auth } from "@clerk/nextjs/server";

export class BackendAuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "BackendAuthError";
  }
}

export async function getBackendAuthHeaders(): Promise<Record<string, string>> {
  const { userId, getToken } = await auth({ treatPendingAsSignedOut: false });

  if (!userId) {
    throw new BackendAuthError();
  }

  const token = await getToken();
  if (!token) {
    throw new BackendAuthError("Missing session token.");
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
