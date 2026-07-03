import type { Channel } from "@prisma/client";

export const CHANNEL_PROVIDERS = ["whatsapp"] as const;

export type ChannelProvider = (typeof CHANNEL_PROVIDERS)[number];

export type ChannelStatus = "VERIFIED" | "PENDING" | "UNKNOWN" | "DISCONNECTED";

export interface ChannelRecord {
  id: string;
  workspaceId: string;
  provider: ChannelProvider;
  businessId: string;
  wabaId: string;
  phoneNumberId: string;
  displayPhoneNumber: string;
  businessName: string | null;
  status: ChannelStatus;
  createdAt: string;
  updatedAt: string;
}

export function isChannelProvider(value: string): value is ChannelProvider {
  return value === "whatsapp";
}

export function isChannelStatus(value: string): value is ChannelStatus {
  return (
    value === "VERIFIED" ||
    value === "PENDING" ||
    value === "UNKNOWN" ||
    value === "DISCONNECTED"
  );
}

export function toChannelRecord(row: Channel): ChannelRecord {
  return {
    id: row.id,
    workspaceId: row.workspaceId,
    provider: row.provider as ChannelProvider,
    businessId: row.businessId,
    wabaId: row.wabaId,
    phoneNumberId: row.phoneNumberId,
    displayPhoneNumber: row.displayPhoneNumber,
    businessName: row.businessName,
    status: isChannelStatus(row.status) ? row.status : "UNKNOWN",
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}
