import { NextResponse } from "next/server";
import { BackendAuthError } from "@/lib/backend/errors";
import { extractErrorMessage } from "@/lib/backend/extract-error-message";
import { proxyBackendRequest } from "@/lib/backend/proxy";
import { normalizeWhatsAppSession, normalizeWhatsAppSessions } from "@/lib/whatsapp/types";

export async function GET() {
  try {
    const response = await proxyBackendRequest("/api/whatsapp/sessions");
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: extractErrorMessage(body, "Failed to load WhatsApp sessions.") },
        { status: response.status },
      );
    }

    return NextResponse.json({
      sessions: normalizeWhatsAppSessions(body),
    });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to load WhatsApp sessions." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const response = await proxyBackendRequest("/api/whatsapp/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload || "{}",
    });
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: extractErrorMessage(body, "Failed to create WhatsApp session.") },
        { status: response.status },
      );
    }

    const session = normalizeWhatsAppSession(body);
    if (!session) {
      return NextResponse.json(
        { error: "Backend returned an invalid WhatsApp session." },
        { status: 502 },
      );
    }

    return NextResponse.json({ session }, { status: 201 });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create WhatsApp session." }, { status: 500 });
  }
}
