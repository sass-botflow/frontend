export function getBackendApiUrl(path = ""): string {
  const base = (
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.BACKEND_API_URL ??
    "http://localhost:8000"
  ).replace(/\/$/, "");

  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
