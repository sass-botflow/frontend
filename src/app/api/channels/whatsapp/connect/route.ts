import {
  evolutionConnect,
} from "@/lib/whatsapp/evolution-bff-service";
import { proxyBackendJsonWithEvolutionFallback } from "@/lib/whatsapp/whatsapp-bff";

export async function POST() {
  return proxyBackendJsonWithEvolutionFallback(
    "/api/channels/whatsapp/connect",
    { method: "POST" },
    evolutionConnect,
  );
}
