import { parseJsonResponse } from "@/lib/api/parse-json-response";
import type {
  CreateWhatsAppSessionRequest,
  WhatsAppQrResponse,
  WhatsAppSession,
  WhatsAppStatusResponse,
} from "@/lib/whatsapp/types";
import {
  normalizeWhatsAppQrResponse,
  normalizeWhatsAppStatusResponse,
} from "@/lib/whatsapp/types";

async function readError(response: Response, fallback: string): Promise<string> {
  try {
    const body = await parseJsonResponse<{ error?: string; message?: string }>(response);
    return body.error ?? body.message ?? fallback;
  } catch {
    return fallback;
  }
}

export async function fetchWhatsAppQr(sessionId: string): Promise<WhatsAppQrResponse> {
  const response = await fetch(`/api/whatsapp/sessions/${encodeURIComponent(sessionId)}/qr`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(await readError(response, "Failed to load QR code."));
  }

  const body = await parseJsonResponse<Record<string, unknown>>(response);
  const qr = normalizeWhatsAppQrResponse(body);
  if (!qr) {
    throw new Error("Backend returned an invalid QR code.");
  }

  return qr;
}

export async function fetchWhatsAppStatus(
  sessionId: string,
): Promise<WhatsAppStatusResponse> {
  const response = await fetch(
    `/api/whatsapp/sessions/${encodeURIComponent(sessionId)}/status`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(await readError(response, "Failed to check connection status."));
  }

  const body = await parseJsonResponse<Record<string, unknown>>(response);
  const status = normalizeWhatsAppStatusResponse(body);
  if (!status) {
    throw new Error("Backend returned an invalid session status.");
  }

  return status;
}

export async function createWhatsAppSession(
  displayName: string,
): Promise<WhatsAppSession> {
  const payload: CreateWhatsAppSessionRequest = { displayName };
  const response = await fetch("/api/whatsapp/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await parseJsonResponse<{ session?: WhatsAppSession; error?: string }>(
    response,
  );

  if (!response.ok || !body.session) {
    throw new Error(body.error ?? "Failed to create WhatsApp session.");
  }

  return body.session;
}

export async function fetchWhatsAppSessions(): Promise<WhatsAppSession[]> {
  const response = await fetch("/api/whatsapp/sessions", { cache: "no-store" });
  const body = await parseJsonResponse<{ sessions?: WhatsAppSession[]; error?: string }>(
    response,
  );

  if (!response.ok) {
    throw new Error(body.error ?? "Failed to load WhatsApp profiles.");
  }

  return body.sessions ?? [];
}
