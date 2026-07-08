import { parseJsonResponse } from "@/lib/api/parse-json-response";
import type {
  WhatsAppConnectResponse,
  WhatsAppDisconnectResponse,
  WhatsAppQrResponse,
  WhatsAppSendPayload,
  WhatsAppSendResponse,
  WhatsAppStatusResponse,
} from "@/lib/whatsapp/evolution-types";

async function requestJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const body = await parseJsonResponse<T & { error?: string; message?: string }>(
    response,
  );

  if (!response.ok) {
    throw new Error(
      body.error ?? body.message ?? `Request failed (${response.status})`,
    );
  }

  return body;
}

export function connectWhatsAppInstance(): Promise<WhatsAppConnectResponse> {
  return requestJson<WhatsAppConnectResponse>("/api/channels/whatsapp/connect", {
    method: "POST",
  });
}

export function fetchWhatsAppQr(instanceId: string): Promise<WhatsAppQrResponse> {
  return requestJson<WhatsAppQrResponse>(
    `/api/channels/whatsapp/${encodeURIComponent(instanceId)}/qr`,
  );
}

export function fetchWhatsAppStatus(
  instanceId: string,
): Promise<WhatsAppStatusResponse> {
  return requestJson<WhatsAppStatusResponse>(
    `/api/channels/whatsapp/${encodeURIComponent(instanceId)}/status`,
  );
}

export function disconnectWhatsAppInstance(
  instanceId: string,
): Promise<WhatsAppDisconnectResponse> {
  return requestJson<WhatsAppDisconnectResponse>(
    `/api/channels/whatsapp/${encodeURIComponent(instanceId)}`,
    { method: "DELETE" },
  );
}

export function sendWhatsAppMessage(
  instanceId: string,
  payload: WhatsAppSendPayload,
): Promise<WhatsAppSendResponse> {
  return requestJson<WhatsAppSendResponse>("/api/channels/whatsapp/send", {
    method: "POST",
    body: JSON.stringify({ instanceId, ...payload }),
  });
}
