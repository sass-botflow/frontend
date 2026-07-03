import type { IntegrationPlatform, IntegrationRecord, PlatformStats } from "@/lib/integrations/types";

const PLATFORM_STATS: Record<IntegrationPlatform, PlatformStats> = {
  whatsapp: {
    primaryMetric: { label: "Conversations today", value: 0 },
    leadsCaptured: { label: "Leads captured", value: 0 },
  },
  instagram: {
    primaryMetric: { label: "DMs today", value: 0 },
    leadsCaptured: { label: "Leads captured", value: 0 },
  },
  tiktok: {
    primaryMetric: { label: "Messages today", value: 0 },
    leadsCaptured: { label: "Leads captured", value: 0 },
  },
};

export function toIntegrationRecord(row: {
  id: string;
  platform: string;
  externalId: string | null;
  isConnected: boolean;
  businessName: string | null;
  phoneNumber: string | null;
  phoneNumberId: string | null;
  phoneStatus: string | null;
  connectedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): IntegrationRecord {
  const platform = row.platform as IntegrationPlatform;
  const connected = row.isConnected;

  return {
    id: row.id,
    platform,
    externalId: row.externalId,
    isConnected: connected,
    displayName:
      connected && platform === "whatsapp"
        ? row.businessName ?? row.phoneNumber ?? row.externalId
        : connected
          ? row.externalId
          : null,
    lastSyncedAt: connected ? row.updatedAt.toISOString() : null,
    stats: connected ? PLATFORM_STATS[platform] : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    whatsapp:
      connected && platform === "whatsapp"
        ? {
            businessName: row.businessName,
            phoneNumber: row.phoneNumber,
            phoneNumberId: row.phoneNumberId,
            phoneStatus:
              row.phoneStatus === "VERIFIED" ||
              row.phoneStatus === "PENDING" ||
              row.phoneStatus === "UNKNOWN"
                ? row.phoneStatus
                : "UNKNOWN",
            connectedAt: row.connectedAt?.toISOString() ?? row.updatedAt.toISOString(),
            connectionStatus: "connected" as const,
          }
        : null,
  };
}
