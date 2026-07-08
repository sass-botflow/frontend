import {
  evolutionGetQr,
} from "@/lib/whatsapp/evolution-bff-service";
import { proxyBackendJsonWithEvolutionFallback } from "@/lib/whatsapp/whatsapp-bff";

export async function GET(
  _request: Request,
  context: { params: Promise<{ instanceId: string }> },
) {
  const { instanceId } = await context.params;

  return proxyBackendJsonWithEvolutionFallback(
    `/api/channels/whatsapp/${encodeURIComponent(instanceId)}/qr`,
    undefined,
    () => evolutionGetQr(instanceId),
  );
}
