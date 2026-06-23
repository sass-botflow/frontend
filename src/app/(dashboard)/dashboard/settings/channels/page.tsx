"use client";

import { useState } from "react";
import { ChannelConnectionCard } from "@/components/settings/channel-connection-card";
import { SettingsPageShell } from "@/components/settings/settings-page-shell";
import { SettingsSection } from "@/components/settings/settings-section";
import { CHANNELS, type ChannelId } from "@/lib/channels";

interface ChannelState {
  connected: boolean;
  detail?: string;
}

const initialState: Record<ChannelId, ChannelState> = {
  whatsapp: { connected: true, detail: "+212 6XX XXX XXX" },
  instagram: { connected: false },
  tiktok: { connected: false },
};

export default function ChannelsSettingsPage() {
  const [channels, setChannels] = useState(initialState);
  const connectedCount = Object.values(channels).filter((c) => c.connected).length;

  function toggle(channelId: ChannelId) {
    setChannels((prev) => ({
      ...prev,
      [channelId]: { ...prev[channelId], connected: !prev[channelId].connected },
    }));
  }

  return (
    <SettingsPageShell
      title="Channels"
      description={`${connectedCount} of ${CHANNELS.length} channels connected. Link your messaging platforms to start automating conversations.`}
    >
      <SettingsSection title="Connected platforms">
        <div className="space-y-4">
          {CHANNELS.map((channel) => (
            <ChannelConnectionCard
              key={channel.id}
              channelId={channel.id}
              connected={channels[channel.id].connected}
              detail={channels[channel.id].detail}
              onToggle={() => toggle(channel.id)}
            />
          ))}
        </div>
      </SettingsSection>
    </SettingsPageShell>
  );
}
