import { fetchWhatsAppPhoneDetails } from "@/lib/meta/graph-api";
import type { WhatsAppPhoneVerificationStatus } from "@/lib/meta/whatsapp-types";
import {
  channelRepository,
  normalizeChannelStatus,
  type UpsertWhatsAppChannelInput,
} from "@/lib/channels/repository";
import type { ChannelRecord } from "@/lib/channels/types";
import { prisma } from "@/lib/prisma";
import { resolveWorkspaceId } from "@/lib/workspace";

export interface WhatsAppChannelConnectInput {
  businessId: string;
  wabaId: string;
  phoneNumberId: string;
  displayPhoneNumber: string;
  businessName: string;
  status: WhatsAppPhoneVerificationStatus;
  accessToken: string;
}

async function syncWhatsAppIntegrationSlot(
  workspaceId: string,
  channel: ChannelRecord | null,
) {
  const connected = channel !== null && channel.status !== "DISCONNECTED";
  const now = new Date();

  await prisma.integration.upsert({
    where: { userId_platform: { userId: workspaceId, platform: "whatsapp" } },
    create: {
      userId: workspaceId,
      platform: "whatsapp",
      isConnected: connected,
      metaBusinessId: channel?.wabaId ?? null,
      phoneNumberId: channel?.phoneNumberId ?? null,
      phoneNumber: channel?.displayPhoneNumber ?? null,
      phoneStatus: channel?.status ?? null,
      businessName: channel?.businessName ?? null,
      externalId: channel?.displayPhoneNumber ?? null,
      refreshToken: channel?.businessId ?? null,
      connectedAt: connected ? now : null,
    },
    update: {
      isConnected: connected,
      metaBusinessId: channel?.wabaId ?? null,
      phoneNumberId: channel?.phoneNumberId ?? null,
      phoneNumber: channel?.displayPhoneNumber ?? null,
      phoneStatus: channel?.status ?? null,
      businessName: channel?.businessName ?? null,
      externalId: channel?.displayPhoneNumber ?? null,
      refreshToken: channel?.businessId ?? null,
      connectedAt: connected ? now : null,
      accessToken: null,
      updatedAt: now,
    },
  });
}

export class ChannelService {
  async listWorkspaceChannels(
    userId: string,
    provider?: "whatsapp",
  ): Promise<ChannelRecord[]> {
    const workspaceId = resolveWorkspaceId(userId);
    return channelRepository.findByWorkspace(workspaceId, provider);
  }

  async getPrimaryWhatsAppChannel(userId: string): Promise<ChannelRecord | null> {
    const workspaceId = resolveWorkspaceId(userId);
    return channelRepository.findPrimaryWhatsApp(workspaceId);
  }

  async connectWhatsAppChannel(
    userId: string,
    input: WhatsAppChannelConnectInput,
  ): Promise<ChannelRecord> {
    const workspaceId = resolveWorkspaceId(userId);

    const payload: UpsertWhatsAppChannelInput = {
      workspaceId,
      businessId: input.businessId,
      wabaId: input.wabaId,
      phoneNumberId: input.phoneNumberId,
      displayPhoneNumber: input.displayPhoneNumber,
      businessName: input.businessName,
      status: normalizeChannelStatus(input.status),
      accessToken: input.accessToken,
    };

    const channel = await channelRepository.upsertWhatsAppChannel(payload);
    await syncWhatsAppIntegrationSlot(workspaceId, channel);
    return channel;
  }

  async refreshPrimaryWhatsAppChannel(userId: string): Promise<ChannelRecord> {
    const workspaceId = resolveWorkspaceId(userId);
    const channel = await channelRepository.findPrimaryWhatsApp(workspaceId);

    if (!channel) {
      throw new Error("WhatsApp is not connected for this workspace.");
    }

    const accessToken = await channelRepository.getDecryptedAccessToken(
      channel.id,
      workspaceId,
    );
    const phone = await fetchWhatsAppPhoneDetails(channel.phoneNumberId, accessToken);

    const updated = await channelRepository.updateWhatsAppChannelDetails(
      channel.id,
      workspaceId,
      {
        displayPhoneNumber: phone.displayPhoneNumber,
        businessName: phone.verifiedName,
        status: normalizeChannelStatus(phone.verificationStatus),
      },
    );

    await syncWhatsAppIntegrationSlot(workspaceId, updated);
    return updated;
  }

  async disconnectPrimaryWhatsAppChannel(userId: string): Promise<void> {
    const workspaceId = resolveWorkspaceId(userId);
    const channel = await channelRepository.findPrimaryWhatsApp(workspaceId);

    if (channel) {
      await channelRepository.disconnectWhatsAppChannel(channel.id, workspaceId);
    } else {
      await channelRepository.disconnectAllWhatsAppChannels(workspaceId);
    }

    await syncWhatsAppIntegrationSlot(workspaceId, null);
  }

  async disconnectWhatsAppChannel(
    userId: string,
    channelId: string,
  ): Promise<ChannelRecord> {
    const workspaceId = resolveWorkspaceId(userId);
    const disconnected = await channelRepository.disconnectWhatsAppChannel(
      channelId,
      workspaceId,
    );

    const primary = await channelRepository.findPrimaryWhatsApp(workspaceId);
    await syncWhatsAppIntegrationSlot(workspaceId, primary);
    return disconnected;
  }
}

export const channelService = new ChannelService();
