import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import { completeWhatsAppFromPending } from "@/lib/meta/whatsapp-connection";

export async function POST(request: Request) {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  let body: { pendingId?: string; optionIndex?: number };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.pendingId || typeof body.optionIndex !== "number") {
    return NextResponse.json(
      { error: "pendingId and optionIndex are required" },
      { status: 400 },
    );
  }

  try {
    const integration = await completeWhatsAppFromPending(
      authResult.userId,
      body.pendingId,
      body.optionIndex,
    );
    return NextResponse.json({
      integration,
      message: "WhatsApp Business connected",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Connect failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
