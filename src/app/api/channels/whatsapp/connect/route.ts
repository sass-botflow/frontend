import { proxyBackendJson } from "@/lib/backend/proxy";

export async function GET() {
  return proxyBackendJson("/api/channels/whatsapp/connect");
}
