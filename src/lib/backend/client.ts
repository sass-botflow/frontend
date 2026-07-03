import { getBackendApiUrl } from "@/lib/backend/config";
import { getBackendAuthHeaders, BackendAuthError } from "@/lib/backend/auth";
import type {
  BackendBot,
  BackendChannel,
  BackendChannelsResponse,
  BackendConversation,
  BackendMessage,
} from "@/lib/backend/types";

export class BackendApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "BackendApiError";
  }
}

function extractErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== "object") return fallback;
  const record = body as Record<string, unknown>;
  if (typeof record.message === "string") return record.message;
  if (record.message && typeof record.message === "object") {
    const nested = record.message as Record<string, unknown>;
    if (typeof nested.message === "string") return nested.message;
  }
  if (typeof record.error === "string") return record.error;
  return fallback;
}

async function backendFetch<T>(
  path: string,
  init?: RequestInit & { redirect?: RequestRedirect },
): Promise<T> {
  const headers = await getBackendAuthHeaders();
  const response = await fetch(getBackendApiUrl(path), {
    ...init,
    headers: {
      ...headers,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await response.json().catch(() => ({})) : {};

  if (!response.ok) {
    throw new BackendApiError(
      extractErrorMessage(body, response.statusText || "Backend request failed."),
      response.status,
    );
  }

  return body as T;
}

function normalizeChannelsResponse(body: unknown): BackendChannel[] {
  if (Array.isArray(body)) return body as BackendChannel[];
  if (body && typeof body === "object") {
    const record = body as BackendChannelsResponse & { data?: BackendChannel[] };
    if (Array.isArray(record.channels)) return record.channels;
    if (Array.isArray(record.data)) return record.data;
  }
  return [];
}

export async function fetchBackendChannels(): Promise<BackendChannel[]> {
  const body = await backendFetch<unknown>("/api/channels");
  return normalizeChannelsResponse(body);
}

export async function refreshBackendChannel(channelId: string): Promise<BackendChannel> {
  const body = await backendFetch<BackendChannel | { channel: BackendChannel }>(
    `/api/channels/refresh?channelId=${encodeURIComponent(channelId)}`,
  );
  if (body && typeof body === "object" && "channel" in body) {
    return (body as { channel: BackendChannel }).channel;
  }
  return body as BackendChannel;
}

export async function disconnectBackendChannel(channelId: string): Promise<void> {
  await backendFetch<void>(
    `/api/channels/disconnect?channelId=${encodeURIComponent(channelId)}`,
  );
}

export async function startWhatsAppOAuthRedirectUrl(): Promise<string> {
  const headers = await getBackendAuthHeaders();
  const response = await fetch(getBackendApiUrl("/api/integrations/whatsapp/oauth"), {
    method: "GET",
    headers,
    redirect: "manual",
    cache: "no-store",
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (location) return location;
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new BackendApiError(
      extractErrorMessage(body, "Failed to start WhatsApp OAuth."),
      response.status,
    );
  }

  const body = (await response.json().catch(() => ({}))) as {
    url?: string;
    redirectUrl?: string;
  };
  if (body.url) return body.url;
  if (body.redirectUrl) return body.redirectUrl;

  return getBackendApiUrl("/api/integrations/whatsapp/oauth");
}

export async function fetchBackendBots(): Promise<BackendBot[]> {
  const body = await backendFetch<BackendBot[] | { bots: BackendBot[]; data: BackendBot[] }>(
    "/api/bots",
  );
  if (Array.isArray(body)) return body;
  if (body && typeof body === "object") {
    if (Array.isArray(body.bots)) return body.bots;
    if (Array.isArray(body.data)) return body.data;
  }
  return [];
}

export async function updateBackendBot(
  botId: string,
  payload: Partial<Pick<BackendBot, "name" | "channelId" | "status">>,
): Promise<BackendBot> {
  return backendFetch<BackendBot>(`/api/bots/${encodeURIComponent(botId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function fetchBackendConversations(
  channelId?: string,
): Promise<BackendConversation[]> {
  const path = channelId
    ? `/api/inbox/conversations?channelId=${encodeURIComponent(channelId)}`
    : "/api/inbox/conversations";
  const body = await backendFetch<
    BackendConversation[] | { conversations: BackendConversation[]; data: BackendConversation[] }
  >(path);

  if (Array.isArray(body)) return body;
  if (body && typeof body === "object") {
    if (Array.isArray(body.conversations)) return body.conversations;
    if (Array.isArray(body.data)) return body.data;
  }
  return [];
}

export async function fetchBackendMessages(
  conversationId: string,
): Promise<BackendMessage[]> {
  const body = await backendFetch<
    BackendMessage[] | { messages: BackendMessage[]; data: BackendMessage[] }
  >(`/api/inbox/conversations/${encodeURIComponent(conversationId)}/messages`);

  if (Array.isArray(body)) return body;
  if (body && typeof body === "object") {
    if (Array.isArray(body.messages)) return body.messages;
    if (Array.isArray(body.data)) return body.data;
  }
  return [];
}

export { BackendAuthError };
