import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/integrations/auth";
import { getPendingWhatsAppSelection } from "@/lib/meta/whatsapp-connection";

export async function GET() {
  const authResult = await requireUserId();
  if ("error" in authResult) return authResult.error;

  try {
    const pending = await getPendingWhatsAppSelection(authResult.userId);
    if (!pending) {
      return NextResponse.json({ pending: null });
    }
    return NextResponse.json({ pending });
  } catch (err) {
    console.error("[whatsapp] pending GET failed:", err);
    return NextResponse.json({ error: "Failed to load WhatsApp selection." }, { status: 500 });
  }
}
