export interface WhatsAppSession {
  id: string;
  profileName: string;
  instanceName: string;
  status: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface WhatsAppSessionsResponse {
  sessions: WhatsAppSession[];
}

export interface CreateWhatsAppSessionRequest {
  displayName: string;
}

export interface WhatsAppQrResponse {
  qr: string;
  expiresAt?: string;
  expired?: boolean;
}

export interface WhatsAppStatusResponse {
  status: string;
  phoneNumber?: string;
  profileName?: string;
  instanceName?: string;
}

const CONNECTED_STATUSES = new Set([
  "CONNECTED",
  "connected",
  "OPEN",
  "open",
  "ACTIVE",
  "active",
]);

const QR_EXPIRED_STATUSES = new Set([
  "QR_EXPIRED",
  "qr_expired",
  "QRCODE_EXPIRED",
  "qrcode_expired",
  "EXPIRED",
  "expired",
]);

export function isWhatsAppSessionConnected(status: string): boolean {
  return CONNECTED_STATUSES.has(status.trim());
}

export function isWhatsAppQrExpired(status: string): boolean {
  return QR_EXPIRED_STATUSES.has(status.trim());
}

export function toQrDataUrl(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("data:image")) return trimmed;
  return `data:image/png;base64,${trimmed}`;
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

function readBoolean(record: Record<string, unknown>, ...keys: string[]): boolean {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "boolean") return value;
  }
  return false;
}

export function normalizeWhatsAppSession(raw: unknown): WhatsAppSession | null {
  if (!raw || typeof raw !== "object") return null;

  const record = raw as Record<string, unknown>;
  const id = readString(record, "id", "sessionId", "session_id");
  if (!id) return null;

  return {
    id,
    profileName:
      readString(
        record,
        "displayName",
        "display_name",
        "profileName",
        "profile_name",
        "name",
      ) ?? "WhatsApp Profile",
    instanceName:
      readString(record, "instanceName", "instance_name", "instanceId", "instance_id") ??
      "—",
    status: readString(record, "status") ?? "pending",
    phoneNumber: readString(
      record,
      "phoneNumber",
      "phone_number",
      "displayPhoneNumber",
      "display_phone_number",
      "number",
    ),
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

export function normalizeWhatsAppQrResponse(raw: unknown): WhatsAppQrResponse | null {
  if (!raw || typeof raw !== "object") return null;

  const record = raw as Record<string, unknown>;
  const nested = record.qr && typeof record.qr === "object"
    ? (record.qr as Record<string, unknown>)
    : null;

  const qr =
    readString(record, "qr", "qrcode", "qrCode", "qr_code", "base64", "image") ??
    (nested
      ? readString(nested, "base64", "qr", "qrcode", "qrCode", "image")
      : undefined);

  if (!qr) return null;

  return {
    qr,
    expiresAt: readString(record, "expiresAt", "expires_at", "expiredAt", "expired_at"),
    expired: readBoolean(record, "expired", "isExpired", "is_expired"),
  };
}

export function normalizeWhatsAppStatusResponse(
  raw: unknown,
): WhatsAppStatusResponse | null {
  if (!raw || typeof raw !== "object") return null;

  const record = raw as Record<string, unknown>;
  const status = readString(record, "status", "state", "connectionStatus");
  if (!status) return null;

  return {
    status,
    phoneNumber: readString(
      record,
      "phoneNumber",
      "phone_number",
      "displayPhoneNumber",
      "display_phone_number",
      "number",
    ),
    profileName: readString(
      record,
      "displayName",
      "display_name",
      "profileName",
      "profile_name",
      "name",
    ),
    instanceName: readString(record, "instanceName", "instance_name"),
  };
}
