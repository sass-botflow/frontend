import {
  evolutionConnect,
} from "@/lib/whatsapp/evolution-bff-service";
import { proxyBackendJsonWithEvolutionFallback } from "@/lib/whatsapp/whatsapp-bff";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST() {
  return proxyBackendJsonWithEvolutionFallback(
    "/api/channels/whatsapp/connect",
    { method: "POST" },
    evolutionConnect,
  );
}
