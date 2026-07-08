import { NextResponse } from "next/server";
import { BackendAuthError } from "@/lib/backend/errors";
import { evolutionConnect } from "@/lib/whatsapp/evolution-bff-service";
import { isEvolutionConfigured } from "@/lib/whatsapp/evolution-server";
import { proxyBackendJsonWithEvolutionFallback } from "@/lib/whatsapp/whatsapp-bff";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST() {
  try {
    return await proxyBackendJsonWithEvolutionFallback(
      "/api/channels/whatsapp/connect",
      { method: "POST" },
      evolutionConnect,
    );
  } catch (error) {
    if (error instanceof BackendAuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const message =
      error instanceof Error ? error.message : "WhatsApp connect failed.";

    return NextResponse.json(
      {
        error: isEvolutionConfigured()
          ? message
          : "Set EVOLUTION_API_URL and EVOLUTION_API_KEY on the frontend server.",
        message,
      },
      { status: 502 },
    );
  }
}
