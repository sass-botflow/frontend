export type ChannelConnectionStatus =
  | "CONNECTED"
  | "VERIFIED"
  | "ACTIVE"
  | "PENDING"
  | "REFRESH_REQUIRED"
  | "DISCONNECTED"
  | "UNKNOWN";

export interface BackendChannel {
  id: string;
  workspaceId: string;
  provider: string;
  businessId?: string | null;
  wabaId?: string | null;
  phoneNumberId: string;
  displayPhoneNumber: string;
  businessName?: string | null;
  status: string;
  connectedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BackendChannelsResponse {
  channels: BackendChannel[];
}

export interface BackendBot {
  id: string;
  name: string;
  channelId?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BackendConversation {
  id: string;
  channelId?: string;
  contactName?: string;
  contactPhone?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount?: number;
  provider?: string;
}

export interface BackendMessage {
  id: string;
  conversationId: string;
  direction: "inbound" | "outbound";
  body: string;
  createdAt: string;
  status?: string;
}

export interface WhatsAppEmbeddedSignupConnectResponse {
  appId: string;
  configId: string;
  state: string;
}

export interface WhatsAppEmbeddedSignupCompletePayload {
  code: string;
  state: string;
}

export interface WhatsAppEmbeddedSignupCompleteResponse {
  connected: boolean;
  channelId?: string;
  phoneNumberId?: string;
  wabaId?: string;
  businessId?: string;
}

export type ChannelUiStatus = "connected" | "refresh_required" | "disconnected";

export function mapChannelUiStatus(status: string): ChannelUiStatus {
  const normalized = status.toUpperCase();
  if (
    normalized === "CONNECTED" ||
    normalized === "VERIFIED" ||
    normalized === "ACTIVE"
  ) {
    return "connected";
  }
  if (normalized === "REFRESH_REQUIRED" || normalized === "PENDING") {
    return "refresh_required";
  }
  if (normalized === "DISCONNECTED") {
    return "disconnected";
  }
  return "connected";
}

export function formatChannelStatusLabel(status: ChannelUiStatus): string {
  switch (status) {
    case "connected":
      return "Connected";
    case "refresh_required":
      return "Refresh Required";
    case "disconnected":
      return "Disconnected";
  }
}
