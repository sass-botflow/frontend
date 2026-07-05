export interface WhatsAppSession {
  id: string;
  profileName: string;
  instanceName: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WhatsAppSessionsResponse {
  sessions: WhatsAppSession[];
}

function readString(
  record: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return undefined;
}

export function normalizeWhatsAppSession(raw: unknown): WhatsAppSession | null {
  if (!raw || typeof raw !== "object") return null;

  const record = raw as Record<string, unknown>;
  const id = readString(record, "id", "sessionId", "session_id");
  if (!id) return null;

  return {
    id,
    profileName:
      readString(record, "profileName", "profile_name", "name") ??
      "WhatsApp Profile",
    instanceName:
      readString(record, "instanceName", "instance_name", "instanceId", "instance_id") ??
      "—",
    status: readString(record, "status") ?? "pending",
    createdAt: readString(record, "createdAt", "created_at"),
    updatedAt: readString(record, "updatedAt", "updated_at"),
  };
}

export function normalizeWhatsAppSessions(raw: unknown): WhatsAppSession[] {
  if (Array.isArray(raw)) {
    return raw
      .map(normalizeWhatsAppSession)
      .filter((session): session is WhatsAppSession => session !== null);
  }

  if (raw && typeof raw === "object") {
    const record = raw as Record<string, unknown>;
    const list = record.sessions ?? record.data ?? record.items;
    if (Array.isArray(list)) {
      return list
        .map(normalizeWhatsAppSession)
        .filter((session): session is WhatsAppSession => session !== null);
    }

    const single = normalizeWhatsAppSession(raw);
    return single ? [single] : [];
  }

  return [];
}
