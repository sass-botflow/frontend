import type { IntegrationRecord } from "@/lib/integrations/types";
import { toIntegrationRecord } from "@/lib/integrations/serialize";
import { channelService } from "@/lib/channels/service";
import type { WhatsAppPhoneVerificationStatus } from "@/lib/meta/whatsapp-types";
import { prisma } from "@/lib/prisma";
import { resolveWorkspaceId } from "@/lib/workspace";

export interface WhatsAppEmbeddedSignupPayload {
  wabaId: string;
  phoneNumberId: string;
  businessId: string;
  phoneNumber: string;
  businessName: string;
  phoneStatus: WhatsAppPhoneVerificationStatus;
  accessToken: string;
}

async function getWhatsAppIntegrationRecord(
  workspaceId: string,
): Promise<IntegrationRecord> {
  const row = await prisma.integration.findUnique({
    where: { userId_platform: { userId: workspaceId, platform: "whatsapp" } },
  });

  if (!row) {
    throw new Error("WhatsApp integration slot not found.");
  }

  return toIntegrationRecord(row);
}

export async function completeWhatsAppEmbeddedSignup(
  userId: string,
  payload: WhatsAppEmbeddedSignupPayload,
): Promise<IntegrationRecord> {
  await channelService.connectWhatsAppChannel(userId, {
    businessId: payload.businessId,
    wabaId: payload.wabaId,
    phoneNumberId: payload.phoneNumberId,
    displayPhoneNumber: payload.phoneNumber,
    businessName: payload.businessName,
    status: payload.phoneStatus,
    accessToken: payload.accessToken,
  });

  return getWhatsAppIntegrationRecord(resolveWorkspaceId(userId));
}

export async function refreshWhatsAppConnection(
  userId: string,
): Promise<IntegrationRecord> {
  await channelService.refreshPrimaryWhatsAppChannel(userId);
  return getWhatsAppIntegrationRecord(resolveWorkspaceId(userId));
}

export async function disconnectWhatsAppConnection(userId: string): Promise<void> {
  await channelService.disconnectPrimaryWhatsAppChannel(userId);
}
