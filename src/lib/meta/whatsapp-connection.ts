import { prisma } from "@/lib/prisma";
import { encryptSecret, decryptSecret } from "@/lib/crypto/token-encryption";
import { fetchWhatsAppPhoneDetails } from "@/lib/meta/graph-api";
import type { WhatsAppPhoneVerificationStatus } from "@/lib/meta/whatsapp-types";
import type { IntegrationRecord } from "@/lib/integrations/types";
import { toIntegrationRecord } from "@/lib/integrations/serialize";

export interface WhatsAppEmbeddedSignupPayload {
  wabaId: string;
  phoneNumberId: string;
  businessId: string;
  phoneNumber: string;
  businessName: string;
  phoneStatus: WhatsAppPhoneVerificationStatus;
  accessToken: string;
}

export async function completeWhatsAppEmbeddedSignup(
  userId: string,
  payload: WhatsAppEmbeddedSignupPayload,
): Promise<IntegrationRecord> {
  const now = new Date();
  const row = await prisma.integration.upsert({
    where: { userId_platform: { userId, platform: "whatsapp" } },
    create: {
      userId,
      platform: "whatsapp",
      isConnected: true,
      accessToken: encryptSecret(payload.accessToken),
      metaBusinessId: payload.wabaId,
      phoneNumberId: payload.phoneNumberId,
      phoneNumber: payload.phoneNumber,
      phoneStatus: payload.phoneStatus,
      businessName: payload.businessName,
      externalId: payload.phoneNumber,
      refreshToken: payload.businessId,
      connectedAt: now,
    },
    update: {
      isConnected: true,
      accessToken: encryptSecret(payload.accessToken),
      metaBusinessId: payload.wabaId,
      phoneNumberId: payload.phoneNumberId,
      phoneNumber: payload.phoneNumber,
      phoneStatus: payload.phoneStatus,
      businessName: payload.businessName,
      externalId: payload.phoneNumber,
      refreshToken: payload.businessId,
      connectedAt: now,
    },
  });

  return toIntegrationRecord(row);
}

export async function refreshWhatsAppConnection(
  userId: string,
): Promise<IntegrationRecord> {
  const row = await prisma.integration.findUnique({
    where: { userId_platform: { userId, platform: "whatsapp" } },
  });

  if (!row?.isConnected || !row.accessToken || !row.phoneNumberId) {
    throw new Error("WhatsApp is not connected for this workspace.");
  }

  const accessToken = decryptSecret(row.accessToken);
  const phone = await fetchWhatsAppPhoneDetails(row.phoneNumberId, accessToken);

  const updated = await prisma.integration.update({
    where: { id: row.id },
    data: {
      phoneNumber: phone.displayPhoneNumber,
      businessName: phone.verifiedName,
      phoneStatus: phone.verificationStatus,
      externalId: phone.displayPhoneNumber,
    },
  });

  return toIntegrationRecord(updated);
}
