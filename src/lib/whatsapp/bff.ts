import { NextResponse } from "next/server";
import { BackendAuthError } from "@/lib/backend/errors";
import { extractErrorMessage } from "@/lib/backend/extract-error-message";
import { proxyBackendRequest } from "@/lib/backend/proxy";

export async function proxyWhatsAppSessionJson(
  sessionId: string,
  pathSuffix: string,
  fallbackError: string,
): Promise<NextResponse> {
  try {
    const response = await proxyBackendRequest(
      `/api/whatsapp/sessions/${encodeURIComponent(sessionId)}/${pathSuffix}`,
    );
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        { error: extractErrorMessage(body, fallbackError) },
        { status: response.status },
      );
    }

    return NextResponse.json(body);
  } catch (err) {
    if (err instanceof BackendAuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json({ error: fallbackError }, { status: 500 });
  }
}
