export type ChannelId = "whatsapp" | "instagram" | "tiktok";

export interface ChannelMeta {
  id: ChannelId;
  name: string;
  color: string;
  dotColor: string;
  dotLabel: string;
  description: string;
  connectLabel: string;
}

export const CHANNEL_MAP: Record<ChannelId, ChannelMeta> = {
  whatsapp: {
    id: "whatsapp",
    name: "WhatsApp Business",
    color: "#25D366",
    dotColor: "bg-[#25D366]",
    dotLabel: "🟢 WhatsApp",
    description: "Reply to customers on WhatsApp Business automatically.",
    connectLabel: "Connect WhatsApp",
  },
  instagram: {
    id: "instagram",
    name: "Instagram Business",
    color: "#E4405F",
    dotColor: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    dotLabel: "🟣 Instagram",
    description: "Handle Instagram DMs and story replies.",
    connectLabel: "Connect Instagram",
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok Business",
    color: "#010101",
    dotColor: "bg-[#010101] dark:bg-white",
    dotLabel: "⚫ TikTok",
    description: "Respond to TikTok messages and comments.",
    connectLabel: "Connect TikTok",
  },
};

export const CHANNELS = Object.values(CHANNEL_MAP);

export function getChannel(id: string): ChannelMeta | undefined {
  return CHANNEL_MAP[id as ChannelId];
}
