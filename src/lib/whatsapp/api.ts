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

export async function fetchWhatsAppQr(sessionId: string): Promise<WhatsAppQrResponse> {
  const response = await fetch(`/api/whatsapp/sessions/${encodeURIComponent(sessionId)}/qr`, {
    cache: "no-store",
  });

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

  if (!body.session) {
    throw new Error(body.error ?? "Failed to create WhatsApp session.");
  }

  return body.session;
}

export async function fetchWhatsAppSessions(): Promise<WhatsAppSession[]> {
  const response = await fetch("/api/whatsapp/sessions", { cache: "no-store" });
  const body = await parseJsonResponse<{ sessions?: WhatsAppSession[]; error?: string }>(
    response,
  );

  return body.sessions ?? [];
}
