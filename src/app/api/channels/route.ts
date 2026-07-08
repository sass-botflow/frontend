import { NextResponse } from "next/server";
import { BackendAuthError } from "@/lib/backend/errors";
import { proxyBackendChannelsWithEvolutionFallback } from "@/lib/whatsapp/whatsapp-bff";

export async function GET() {
  try {
    return await proxyBackendChannelsWithEvolutionFallback();
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load channels." }, { status: 500 });
  }
}
