import { prisma } from "@/lib/prisma";
import type {
  IntegrationPlatform,
  IntegrationRecord,
  PlatformStats,
} from "@/lib/integrations/types";

const PLATFORM_DISPLAY: Record<
  IntegrationPlatform,
  { label: string; mockAccount: string }
> = {
  whatsapp: { label: "WhatsApp Business", mockAccount: "+212 612 345 678" },
  instagram: { label: "Instagram Business", mockAccount: "@botflow.studio" },
  tiktok: { label: "TikTok Business", mockAccount: "@botflow.official" },
};

const PLATFORM_STATS: Record<IntegrationPlatform, PlatformStats> = {
  whatsapp: {
    primaryMetric: { label: "Conversations today", value: 47 },
    leadsCaptured: { label: "Leads captured", value: 12 },
  },
  instagram: {
    primaryMetric: { label: "DMs today", value: 23 },
    leadsCaptured: { label: "Leads captured", value: 8 },
  },
  tiktok: {
    primaryMetric: { label: "Messages today", value: 15 },
    leadsCaptured: { label: "Leads captured", value: 5 },
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

export async function connectPlatform(
  userId: string,
  platform: IntegrationPlatform,
): Promise<IntegrationRecord> {
  const mock = PLATFORM_DISPLAY[platform];
  const externalId = mock.mockAccount;
  const tokenSuffix = crypto.randomUUID().slice(0, 12);

  const row = await prisma.integration.upsert({
    where: { userId_platform: { userId, platform } },
    create: {
      userId,
      platform,
      externalId,
      accessToken: `bf_${platform}_access_${tokenSuffix}`,
      refreshToken: `bf_${platform}_refresh_${tokenSuffix}`,
      isConnected: true,
    },
    update: {
      externalId,
      accessToken: `bf_${platform}_access_${tokenSuffix}`,
      refreshToken: `bf_${platform}_refresh_${tokenSuffix}`,
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
