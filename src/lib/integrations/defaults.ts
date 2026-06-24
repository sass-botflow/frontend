import type { IntegrationPlatform, IntegrationRecord } from "@/lib/integrations/types";
import { INTEGRATION_PLATFORMS } from "@/lib/integrations/types";

const PLACEHOLDER_TIME = "1970-01-01T00:00:00.000Z";

export function createDefaultIntegration(
  platform: IntegrationPlatform,
): IntegrationRecord {
  return {
    id: `default-${platform}`,
    platform,
    externalId: null,
    isConnected: false,
    displayName: null,
    lastSyncedAt: null,
    stats: null,
    createdAt: PLACEHOLDER_TIME,
    updatedAt: PLACEHOLDER_TIME,
  };
}

export const DEFAULT_INTEGRATIONS: IntegrationRecord[] =
  INTEGRATION_PLATFORMS.map(createDefaultIntegration);
