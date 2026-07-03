import { proxyBackendJson } from "@/lib/backend/proxy";

export async function POST(request: Request) {
  const body = await request.text();
  return proxyBackendJson("/api/integrations/disconnect", {
    method: "POST",
    body,
  });
}
