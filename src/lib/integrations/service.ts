import { prisma } from "@/lib/prisma";
import {
  getDisplayName,
  validateConnectCredentials,
  type ConnectCredentialsInput,
} from "@/lib/integrations/connect-credentials";
import type {
  IntegrationPlatform,
  IntegrationRecord,
  PlatformStats,
} from "@/lib/integrations/types";

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

function toRecord(
  row: {
    id: string;
    platform: string;
    externalId: string | null;
    isConnected: boolean;
    createdAt: Date;
    updatedAt: Date;
  },
): IntegrationRecord {
  const platform = row.platform as IntegrationPlatform;
  const connected = row.isConnected;

  return {
    id: row.id,
    platform,
    externalId: row.externalId,
    isConnected: connected,
    displayName: connected ? row.externalId : null,
    lastSyncedAt: connected ? row.updatedAt.toISOString() : null,
    stats: connected ? PLATFORM_STATS[platform] : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

export async function ensurePlatformRows(userId: string) {
  await Promise.all(
    (["whatsapp", "instagram", "tiktok"] as IntegrationPlatform[]).map(
      (platform) =>
        prisma.integration.upsert({
          where: { userId_platform: { userId, platform } },
          create: { userId, platform, isConnected: false },
          update: {},
        }),
    ),
  );
}

export async function getIntegrationsForUser(
  userId: string,
): Promise<IntegrationRecord[]> {
  await ensurePlatformRows(userId);

  const rows = await prisma.integration.findMany({
    where: { userId },
    orderBy: { platform: "asc" },
  });

  return rows.map(toRecord);
}

function mapCredentialsToDb(credentials: ConnectCredentialsInput) {
  switch (credentials.platform) {
    case "whatsapp":
      return {
        externalId: getDisplayName(credentials),
        accessToken: credentials.accessToken,
        refreshToken: credentials.phoneNumberId,
      };
    case "instagram":
      return {
        externalId: getDisplayName(credentials),
        accessToken: credentials.accessToken,
        refreshToken: credentials.pageId,
      };
    case "tiktok":
      return {
        externalId: getDisplayName(credentials),
        accessToken: credentials.accessToken,
        refreshToken: credentials.businessId,
      };
  }
}

export async function connectPlatform(
  userId: string,
  rawInput: Record<string, string> & { platform: IntegrationPlatform },
): Promise<IntegrationRecord> {
  const credentials = validateConnectCredentials(rawInput);
  const mapped = mapCredentialsToDb(credentials);

  const row = await prisma.integration.upsert({
    where: { userId_platform: { userId, platform: credentials.platform } },
    create: {
      userId,
      platform: credentials.platform,
      ...mapped,
      isConnected: true,
    },
    update: {
      ...mapped,
      isConnected: true,
    },
  });

  return toRecord(row);
}

export async function disconnectPlatform(
  userId: string,
  platform: IntegrationPlatform,
): Promise<IntegrationRecord> {
  const row = await prisma.integration.upsert({
    where: { userId_platform: { userId, platform } },
    create: { userId, platform, isConnected: false },
    update: {
      isConnected: false,
      accessToken: null,
      refreshToken: null,
      externalId: null,
    },
  });

  return toRecord(row);
}

export function isIntegrationPlatform(value: string): value is IntegrationPlatform {
  return value === "whatsapp" || value === "instagram" || value === "tiktok";
}
