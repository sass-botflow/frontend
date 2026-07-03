import { prisma } from "@/lib/prisma";
import { encryptSecret } from "@/lib/crypto/token-encryption";
import type { WhatsAppPhoneOption } from "@/lib/meta/graph-api";
import type { IntegrationRecord } from "@/lib/integrations/types";
import { toIntegrationRecord } from "@/lib/integrations/serialize";

const PENDING_TTL_MS = 15 * 60 * 1000;

export interface WhatsAppSelectionOption {
  id: string;
  businessName: string;
  wabaName: string;
  phoneNumber: string;
  verifiedName: string;
}

export async function savePendingWhatsAppSelection(
  userId: string,
  accessToken: string,
  options: WhatsAppPhoneOption[],
) {
  await prisma.metaOAuthPending.deleteMany({ where: { userId } });

  const payload = JSON.stringify({ options });
  const pending = await prisma.metaOAuthPending.create({
    data: {
      userId,
      accessToken: encryptSecret(accessToken),
      payload,
      expiresAt: new Date(Date.now() + PENDING_TTL_MS),
    },
  });

  return {
    pendingId: pending.id,
    options: options.map((option, index) => ({
      id: String(index),
      businessName: option.businessName,
      wabaName: option.wabaName,
      phoneNumber: option.phoneNumber,
      verifiedName: option.verifiedName,
    })),
  };
}

export async function getPendingWhatsAppSelection(userId: string) {
  const pending = await prisma.metaOAuthPending.findFirst({
    where: {
      userId,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!pending) return null;

  const parsed = JSON.parse(pending.payload) as { options: WhatsAppPhoneOption[] };
  return {
    pendingId: pending.id,
    options: parsed.options.map((option, index) => ({
      id: String(index),
      businessName: option.businessName,
      wabaName: option.wabaName,
      phoneNumber: option.phoneNumber,
      verifiedName: option.verifiedName,
    })),
  };
}

export async function completeWhatsAppOAuth(
  userId: string,
  option: WhatsAppPhoneOption,
  accessToken: string,
): Promise<IntegrationRecord> {
  const now = new Date();
  const row = await prisma.integration.upsert({
    where: { userId_platform: { userId, platform: "whatsapp" } },
    create: {
      userId,
      platform: "whatsapp",
      isConnected: true,
      accessToken: encryptSecret(accessToken),
      metaBusinessId: option.wabaId,
      phoneNumberId: option.phoneNumberId,
      phoneNumber: option.phoneNumber,
      businessName: option.verifiedName || option.businessName,
      externalId: option.phoneNumber,
      refreshToken: option.businessId,
      connectedAt: now,
    },
    update: {
      isConnected: true,
      accessToken: encryptSecret(accessToken),
      metaBusinessId: option.wabaId,
      phoneNumberId: option.phoneNumberId,
      phoneNumber: option.phoneNumber,
      businessName: option.verifiedName || option.businessName,
      externalId: option.phoneNumber,
      refreshToken: option.businessId,
      connectedAt: now,
    },
  });

  await prisma.metaOAuthPending.deleteMany({ where: { userId } });
  return toIntegrationRecord(row);
}

export async function completeWhatsAppFromPending(
  userId: string,
  pendingId: string,
  optionIndex: number,
): Promise<IntegrationRecord> {
  const pending = await prisma.metaOAuthPending.findFirst({
    where: {
      id: pendingId,
      userId,
      expiresAt: { gt: new Date() },
    },
  });

  if (!pending) {
    throw new Error("WhatsApp selection session expired. Please connect again.");
  }

  const parsed = JSON.parse(pending.payload) as { options: WhatsAppPhoneOption[] };
  const option = parsed.options[optionIndex];
  if (!option) {
    throw new Error("Invalid WhatsApp phone selection.");
  }

  const { decryptSecret } = await import("@/lib/crypto/token-encryption");
  const accessToken = decryptSecret(pending.accessToken);
  return completeWhatsAppOAuth(userId, option, accessToken);
}
