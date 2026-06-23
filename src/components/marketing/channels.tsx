"use client";

import { CHANNELS } from "@/lib/channels";
import { ChannelLogo } from "@/components/channels/channel-logo";

export function Channels() {
  return (
    <section id="channels" className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          Works where your customers are
        </h2>
        <p className="mt-3 text-muted-foreground">
          WhatsApp, Instagram, TikTok — all in one inbox.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {CHANNELS.map((channel) => (
            <div
              key={channel.id}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border/60 bg-card px-8 py-6"
            >
              <ChannelLogo channel={channel.id} size="lg" />
              <span className="font-medium">{channel.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
