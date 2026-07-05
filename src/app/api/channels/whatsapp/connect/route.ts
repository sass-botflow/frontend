import { NextResponse } from "next/server";
import { BackendAuthError, BackendApiError } from "@/lib/backend/errors";
import { resolveWhatsAppEmbeddedSignupConnectSession } from "@/lib/meta/whatsapp-connect-session";

export async function GET() {
  try {
    const session = await resolveWhatsAppEmbeddedSignupConnectSession();
    return NextResponse.json(session);
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    if (err instanceof BackendApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json(
      { error: "Failed to start WhatsApp signup." },
      { status: 500 },
    );
  }
}
