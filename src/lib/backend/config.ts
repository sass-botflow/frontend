const DEFAULT_LOCAL_BACKEND = "http://localhost:8000";
const PRODUCTION_BACKEND = "https://api.botflow.ink";

/** Hostnames that serve the Next.js frontend — never use as backend API base. */
const FRONTEND_HOSTS = new Set(["botflow.ink", "www.botflow.ink"]);

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/$/, "");
}

function isFrontendHostname(hostname: string): boolean {
  return FRONTEND_HOSTS.has(hostname.toLowerCase());
}

/**
 * Resolve backend API base URL for BFF server-side calls.
 * Prefers BACKEND_API_URL (server-only) over NEXT_PUBLIC_API_URL.
 * Auto-corrects misconfigured frontend domains that cause Cloudflare HTML 502 loops.
 */
export function getBackendApiUrl(path = ""): string {
  const configured =
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    DEFAULT_LOCAL_BACKEND;

  let base = normalizeBaseUrl(configured);

  try {
    const hostname = new URL(base).hostname;
    if (isFrontendHostname(hostname)) {
      console.warn(
        `[backend-config] API URL points to frontend (${hostname}) — using ${PRODUCTION_BACKEND}. ` +
          "Set NEXT_PUBLIC_API_URL=https://api.botflow.ink in EasyPanel.",
      );
      base = PRODUCTION_BACKEND;
    }
  } catch {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        `[backend-config] Invalid API URL "${configured}" — using ${PRODUCTION_BACKEND}`,
      );
      base = PRODUCTION_BACKEND;
    }
  }

  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getConfiguredBackendApiUrl(): string {
  return normalizeBaseUrl(
    process.env.BACKEND_API_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      DEFAULT_LOCAL_BACKEND,
  );
}
