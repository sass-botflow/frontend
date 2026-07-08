import { proxyBackendJson } from "@/lib/backend/proxy";

export async function POST() {
  return proxyBackendJson("/api/channels/whatsapp/connect", {
    method: "POST",
  });
}
