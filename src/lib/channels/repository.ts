import { prisma } from "@/lib/prisma";
import { encryptSecret, decryptSecret } from "@/lib/crypto/token-encryption";
import {
  isChannelStatus,
  toChannelRecord,
  type ChannelProvider,
  type ChannelRecord,
  type ChannelStatus,
} from "@/lib/channels/types";

export interface UpsertWhatsAppChannelInput {
  workspaceId: string;
  businessId: string;
  wabaId: string;
  phoneNumberId: string;
  displayPhoneNumber: string;
  businessName: string;
  status: ChannelStatus;
  accessToken: string;
}

export class ChannelRepository {
  async findByWorkspace(
    workspaceId: string,
    provider?: ChannelProvider,
  ): Promise<ChannelRecord[]> {
    const rows = await prisma.channel.findMany({
      where: {
        workspaceId,
        ...(provider ? { provider } : {}),
        status: { not: "DISCONNECTED" },
      },
      orderBy: { updatedAt: "desc" },
    });

    return rows.map(toChannelRecord);
  }

  async findPrimaryWhatsApp(workspaceId: string): Promise<ChannelRecord | null> {
    const row = await prisma.channel.findFirst({
      where: {
        workspaceId,
        provider: "whatsapp",
        status: { not: "DISCONNECTED" },
      },
      orderBy: { updatedAt: "desc" },
    });

    return row ? toChannelRecord(row) : null;
  }

  async findByPhoneNumberId(phoneNumberId: string): Promise<ChannelRecord | null> {
    const row = await prisma.channel.findUnique({
      where: { phoneNumberId },
    });

    return row ? toChannelRecord(row) : null;
  }

  async findById(id: string, workspaceId: string): Promise<ChannelRecord | null> {
    const row = await prisma.channel.findFirst({
      where: { id, workspaceId },
    });

    return row ? toChannelRecord(row) : null;
  }

  async upsertWhatsAppChannel(
    input: UpsertWhatsAppChannelInput,
  ): Promise<ChannelRecord> {
    const existing = await prisma.channel.findUnique({
      where: { phoneNumberId: input.phoneNumberId },
    });

    if (existing && existing.workspaceId !== input.workspaceId) {
      throw new Error(
        "This WhatsApp phone number is already connected to another workspace.",
      );
    }

    const encryptedAccessToken = encryptSecret(input.accessToken);
    const now = new Date();

    const row = existing
      ? await prisma.channel.update({
          where: { id: existing.id },
          data: {
            businessId: input.businessId,
            wabaId: input.wabaId,
            displayPhoneNumber: input.displayPhoneNumber,
            businessName: input.businessName,
            encryptedAccessToken,
            status: input.status,
            updatedAt: now,
          },
        })
      : await prisma.channel.create({
          data: {
            workspaceId: input.workspaceId,
            provider: "whatsapp",
            businessId: input.businessId,
            wabaId: input.wabaId,
            phoneNumberId: input.phoneNumberId,
            displayPhoneNumber: input.displayPhoneNumber,
            businessName: input.businessName,
            encryptedAccessToken,
            status: input.status,
          },
        });

    return toChannelRecord(row);
  }

  async updateChannelStatus(
    id: string,
    workspaceId: string,
    status: ChannelStatus,
  ): Promise<ChannelRecord> {
    const existing = await prisma.channel.findFirst({
      where: { id, workspaceId },
    });

    if (!existing) {
      throw new Error("Channel not found in this workspace.");
    }

    const row = await prisma.channel.update({
      where: { id },
      data: { status },
    });

    return toChannelRecord(row);
  }

  async updateWhatsAppChannelDetails(
    id: string,
    workspaceId: string,
    data: {
      displayPhoneNumber: string;
      businessName: string;
      status: ChannelStatus;
    },
  ): Promise<ChannelRecord> {
    const existing = await prisma.channel.findFirst({
      where: { id, workspaceId, provider: "whatsapp" },
    });

    if (!existing) {
      throw new Error("WhatsApp channel not found for this workspace.");
    }

    const row = await prisma.channel.update({
      where: { id },
      data: {
        displayPhoneNumber: data.displayPhoneNumber,
        businessName: data.businessName,
        status: data.status,
      },
    });

    return toChannelRecord(row);
  }

  async disconnectWhatsAppChannel(
    id: string,
    workspaceId: string,
  ): Promise<ChannelRecord> {
    return this.updateChannelStatus(id, workspaceId, "DISCONNECTED");
  }

  async disconnectAllWhatsAppChannels(workspaceId: string): Promise<void> {
    await prisma.channel.updateMany({
      where: { workspaceId, provider: "whatsapp", status: { not: "DISCONNECTED" } },
      data: { status: "DISCONNECTED" },
    });
  }

  async getDecryptedAccessToken(id: string, workspaceId: string): Promise<string> {
    const row = await prisma.channel.findFirst({
      where: { id, workspaceId, provider: "whatsapp" },
    });

    if (!row?.encryptedAccessToken) {
      throw new Error("WhatsApp channel credentials not found.");
    }

    return decryptSecret(row.encryptedAccessToken);
  }
}

export const channelRepository = new ChannelRepository();

export function normalizeChannelStatus(value?: string | null): ChannelStatus {
  if (value && isChannelStatus(value)) {
    return value;
  }
  return "UNKNOWN";
}
