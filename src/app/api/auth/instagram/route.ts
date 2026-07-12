import { proxyBackendRedirect } from "@/lib/backend/proxy";
import { logBackendOAuthRedirect } from "@/lib/backend/logger";

export async function GET() {
  const response = await proxyBackendRedirect("/api/auth/instagram");

  const location = response.headers.get("location");
  if (location) {
    logBackendOAuthRedirect(location);
  }

  return response;
}
