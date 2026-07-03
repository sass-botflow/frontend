import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import { refreshWhatsAppConnection } from "@/lib/meta/whatsapp-connection";

export async function POST() {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  try {
    const integration = await refreshWhatsAppConnection(authResult.userId);
    return NextResponse.json({
      integration,
      message: "WhatsApp connection refreshed.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to refresh WhatsApp connection.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
