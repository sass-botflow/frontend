import type { IntegrationRecord } from "@/lib/integrations/types";

export interface InstagramChannel {
  id: string;
  username: string;
  displayName: string;
  profilePictureUrl: string | null;
  instagramUserId: string | null;
  isConnected: boolean;
  connectedAt: string | null;
}

export function mapInstagramIntegration(
  integration: IntegrationRecord | undefined,
): InstagramChannel | null {
  if (!integration || integration.platform !== "instagram") {
    return null;
  }

  const username = integration.externalId
    ? integration.externalId.startsWith("@")
      ? integration.externalId
      : `@${integration.externalId}`
    : integration.displayName
      ? integration.displayName.startsWith("@")
        ? integration.displayName
        : `@${integration.displayName}`
      : "@instagram";

  return {
    id: integration.id,
    username,
    displayName: integration.displayName ?? username.replace(/^@/, ""),
    profilePictureUrl: null,
    instagramUserId: integration.externalId,
    isConnected: integration.isConnected,
    connectedAt: integration.lastSyncedAt ?? integration.updatedAt ?? null,
  };
}

export interface InstagramOAuthSuccessPayload {
  type: "instagram-oauth-success";
  username: string;
  displayName: string;
  profilePictureUrl: string | null;
}

export interface InstagramOAuthErrorPayload {
  type: "instagram-oauth-error";
  message: string;
}

export type InstagramOAuthMessage =
  | InstagramOAuthSuccessPayload
  | InstagramOAuthErrorPayload;

export const INSTAGRAM_OAUTH_MESSAGE = "instagram-oauth";
