export const INTEGRATION_PLATFORMS = ["whatsapp", "instagram", "tiktok"] as const;

export type IntegrationPlatform = (typeof INTEGRATION_PLATFORMS)[number];

export interface PlatformStats {
  primaryMetric: { label: string; value: number };
  leadsCaptured: { label: string; value: number };
}

export interface WhatsAppConnectionDetails {
  businessName: string | null;
  phoneNumber: string | null;
  connectedAt: string | null;
  connectionStatus: "connected";
}

export interface IntegrationRecord {
  id: string;
  platform: IntegrationPlatform;
  externalId: string | null;
  isConnected: boolean;
  displayName: string | null;
  lastSyncedAt: string | null;
  stats: PlatformStats | null;
  createdAt: string;
  updatedAt: string;
  whatsapp?: WhatsAppConnectionDetails | null;
}

export interface IntegrationsResponse {
  integrations: IntegrationRecord[];
  connectedCount: number;
  totalCount: number;
}

export interface ConnectIntegrationResponse {
  integration: IntegrationRecord;
  message: string;
}

export interface DisconnectIntegrationBody {
  platform: IntegrationPlatform;
}

export interface WhatsAppPendingSelectionResponse {
  pendingId: string;
  options: Array<{
    id: string;
    businessName: string;
    wabaName: string;
    phoneNumber: string;
    verifiedName: string;
  }>;
}
