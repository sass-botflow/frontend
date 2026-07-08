import { getBackendApiUrl } from "@/lib/backend/config";
import { getBackendAuthHeaders } from "@/lib/backend/auth";
import { BackendApiError, BackendAuthError } from "@/lib/backend/errors";
import {
  authHeaderLogMeta,
  logBackendRequest,
  logBackendResponse,
} from "@/lib/backend/logger";
import type {
  BackendBot,
  BackendChannel,
  BackendChannelsResponse,
  BackendConversation,
  BackendMessage,
} from "@/lib/backend/types";

export { BackendApiError, BackendAuthError } from "@/lib/backend/errors";

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
  const method = init?.method ?? "GET";

  logBackendRequest(method, path, authHeaderLogMeta(headers.Authorization));

  const response = await fetch(getBackendApiUrl(path), {
    ...init,
    headers: {
      ...headers,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  logBackendResponse(method, path, response.status);

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
  const body = await backendFetch<BackendChannel>(
    `/api/channels/${encodeURIComponent(channelId)}/refresh`,
    { method: "POST" },
  );
  return body;
}

export async function disconnectBackendChannel(channelId: string): Promise<void> {
  await backendFetch<void>(`/api/channels/${encodeURIComponent(channelId)}/disconnect`, {
    method: "POST",
  });
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
  const conversation = await backendFetch<{
    messages?: Array<{
      id: string;
      content: string;
      direction: string;
      createdAt: string;
      conversationId?: string;
    }>;
  }>(`/api/inbox/conversations/${encodeURIComponent(conversationId)}`);

  const messages = conversation.messages ?? [];
  return messages.map((message) => ({
    id: message.id,
    conversationId: message.conversationId ?? conversationId,
    direction: message.direction.toLowerCase() === "outbound" ? "outbound" : "inbound",
    body: message.content,
    createdAt: message.createdAt,
  }));
}
