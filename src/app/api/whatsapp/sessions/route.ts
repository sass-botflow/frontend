import { NextResponse } from "next/server";
import { BackendAuthError } from "@/lib/backend/errors";
import {
  extractBackendErrorMessage,
  formatNonJsonBackendError,
  formatRedirectBackendError,
  jsonErrorPayload,
  readBackendResponse,
} from "@/lib/backend/read-backend-response";
import { normalizeWhatsAppSession, normalizeWhatsAppSessions } from "@/lib/whatsapp/types";
import { proxyWhatsAppBackend } from "@/lib/whatsapp/bff";

export async function GET() {
  try {
    const { response, backendUrl } = await proxyWhatsAppBackend("");
    const parsed = await readBackendResponse(response);

    if (response.status >= 300 && response.status < 400) {
      const message = formatRedirectBackendError(
        backendUrl,
        response.status,
        response.headers.get("location"),
        "Failed to load WhatsApp sessions.",
      );
      return NextResponse.json(
        jsonErrorPayload(message, response.status, backendUrl),
        { status: 502 },
      );
    }

    if (!parsed.isJson) {
      const message = formatNonJsonBackendError(
        backendUrl,
        parsed.status,
        parsed.rawText,
        "Failed to load WhatsApp sessions.",
      );
      return NextResponse.json(
        jsonErrorPayload(message, parsed.status, backendUrl, parsed.rawText),
        { status: parsed.status >= 400 ? parsed.status : 502 },
      );
    }

    if (!response.ok) {
      const message = extractBackendErrorMessage(
        parsed.data,
        "Failed to load WhatsApp sessions.",
      );
      return NextResponse.json(
        jsonErrorPayload(message, parsed.status, backendUrl),
        { status: parsed.status },
      );
    }

    return NextResponse.json({
      sessions: normalizeWhatsAppSessions(parsed.data),
    });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message, status: 401 }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to load WhatsApp sessions.", status: 500 },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const { response, backendUrl } = await proxyWhatsAppBackend("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload || "{}",
    });
    const parsed = await readBackendResponse(response);

    if (response.status >= 300 && response.status < 400) {
      const message = formatRedirectBackendError(
        backendUrl,
        response.status,
        response.headers.get("location"),
        "Failed to create WhatsApp session.",
      );
      return NextResponse.json(
        jsonErrorPayload(message, response.status, backendUrl),
        { status: 502 },
      );
    }

    if (!parsed.isJson) {
      const message = formatNonJsonBackendError(
        backendUrl,
        parsed.status,
        parsed.rawText,
        "Failed to create WhatsApp session.",
      );
      return NextResponse.json(
        jsonErrorPayload(message, parsed.status, backendUrl, parsed.rawText),
        { status: parsed.status >= 400 ? parsed.status : 502 },
      );
    }

    if (!response.ok) {
      const message = extractBackendErrorMessage(
        parsed.data,
        "Failed to create WhatsApp session.",
      );
      return NextResponse.json(
        jsonErrorPayload(message, parsed.status, backendUrl),
        { status: parsed.status },
      );
    }

    const session = normalizeWhatsAppSession(parsed.data);
    if (!session) {
      return NextResponse.json(
        jsonErrorPayload(
          "Backend returned an invalid WhatsApp session.",
          502,
          backendUrl,
          parsed.rawText,
        ),
        { status: 502 },
      );
    }

    return NextResponse.json({ session }, { status: 201 });
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message, status: 401 }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Failed to create WhatsApp session.", status: 500 },
      { status: 500 },
    );
  }
}
