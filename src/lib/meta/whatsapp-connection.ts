import { prisma } from "@/lib/prisma";
import { encryptSecret } from "@/lib/crypto/token-encryption";
import type { IntegrationRecord } from "@/lib/integrations/types";
import { toIntegrationRecord } from "@/lib/integrations/serialize";

export interface WhatsAppEmbeddedSignupPayload {
  wabaId: string;
  phoneNumberId: string;
  businessId: string;
  phoneNumber: string;
  businessName: string;
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
      businessName: payload.businessName,
      externalId: payload.phoneNumber,
      refreshToken: payload.businessId,
      connectedAt: now,
    },
  });

  return toIntegrationRecord(row);
}
