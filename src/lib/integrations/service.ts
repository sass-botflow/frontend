import { prisma } from "@/lib/prisma";
import { encryptSecret } from "@/lib/crypto/token-encryption";
import { checkDatabase } from "@/lib/integrations/db";
import {
  getDisplayName,
  validateConnectCredentials,
  type ConnectCredentialsInput,
} from "@/lib/integrations/connect-credentials";
import { toIntegrationRecord } from "@/lib/integrations/serialize";
import type { IntegrationPlatform, IntegrationRecord } from "@/lib/integrations/types";

async function ensureDb() {
  const db = await checkDatabase();
  if (!db.ok) {
    throw new Error(
      "Database not ready. Server admin must set DATABASE_URL=file:/app/data/botflow.db and redeploy.",
    );
  }
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
  await ensureDb();
  await ensurePlatformRows(userId);

  const rows = await prisma.integration.findMany({
    where: { userId },
    orderBy: { platform: "asc" },
  });

  return rows.map(toIntegrationRecord);
}

function mapCredentialsToDb(credentials: ConnectCredentialsInput) {
  switch (credentials.platform) {
    case "instagram":
      return {
        externalId: getDisplayName(credentials),
        accessToken: encryptSecret(credentials.accessToken),
        refreshToken: credentials.pageId,
      };
    case "tiktok":
      return {
        externalId: getDisplayName(credentials),
        accessToken: encryptSecret(credentials.accessToken),
        refreshToken: credentials.businessId,
      };
  }
}

export async function connectPlatform(
  userId: string,
  rawInput: Record<string, string> & { platform: IntegrationPlatform },
): Promise<IntegrationRecord> {
  if (rawInput.platform === "whatsapp") {
    throw new Error(
      "WhatsApp must be connected via Meta OAuth. Use Connect WhatsApp Business.",
    );
  }

  await ensureDb();
  const credentials = validateConnectCredentials(
    rawInput as Record<string, string> & { platform: "instagram" | "tiktok" },
  );
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

  return toIntegrationRecord(row);
}

export async function disconnectPlatform(
  userId: string,
  platform: IntegrationPlatform,
): Promise<IntegrationRecord> {
  await ensureDb();
  const row = await prisma.integration.upsert({
    where: { userId_platform: { userId, platform } },
    create: { userId, platform, isConnected: false },
    update: {
      isConnected: false,
      accessToken: null,
      refreshToken: null,
      externalId: null,
      metaBusinessId: null,
      phoneNumberId: null,
      phoneNumber: null,
      businessName: null,
      connectedAt: null,
    },
  });

  if (platform === "whatsapp") {
    await prisma.metaOAuthPending.deleteMany({ where: { userId } });
  }

  return toIntegrationRecord(row);
}

export function isIntegrationPlatform(value: string): value is IntegrationPlatform {
  return value === "whatsapp" || value === "instagram" || value === "tiktok";
}
