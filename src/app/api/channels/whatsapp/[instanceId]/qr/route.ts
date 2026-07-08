import { proxyBackendJson } from "@/lib/backend/proxy";

export async function GET(
  _request: Request,
  context: { params: Promise<{ instanceId: string }> },
) {
  const { instanceId } = await context.params;
  return proxyBackendJson(
    `/api/channels/whatsapp/${encodeURIComponent(instanceId)}/qr`,
  );
}
