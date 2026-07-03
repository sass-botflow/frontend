type BackendLogContext = Record<string, string | number | boolean | null | undefined>;

function isBackendDebugEnabled(): boolean {
  return process.env.BACKEND_AUTH_DEBUG === "true" || process.env.NODE_ENV !== "production";
}

export function logBackendRequest(
  method: string,
  path: string,
  context: BackendLogContext = {},
): void {
  if (!isBackendDebugEnabled()) return;
  console.info("[backend-bff] request", {
    method,
    path,
    hasAuthorization: context.hasAuthorization ?? false,
    authorizationScheme: context.authorizationScheme ?? "none",
    ...context,
  });
}

export function logBackendResponse(
  method: string,
  path: string,
  status: number,
  context: BackendLogContext = {},
): void {
  if (!isBackendDebugEnabled()) return;
  console.info("[backend-bff] response", {
    method,
    path,
    status,
    ...context,
  });
}

export function logBackendOAuthRedirect(redirectUrl: string): void {
  if (!isBackendDebugEnabled()) return;
  let host = "unknown";
  try {
    host = new URL(redirectUrl).host;
  } catch {
    // ignore invalid URL for logging
  }
  console.info("[backend-bff] oauth redirect", { host, redirectUrl });
}

export function authHeaderLogMeta(
  authorization: string | undefined,
): Pick<BackendLogContext, "hasAuthorization" | "authorizationScheme"> {
  if (!authorization) {
    return { hasAuthorization: false, authorizationScheme: "none" };
  }
  const scheme = authorization.split(" ")[0] ?? "unknown";
  return { hasAuthorization: true, authorizationScheme: scheme };
}
