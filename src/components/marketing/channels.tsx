"use client";

import { CHANNELS } from "@/lib/constants";

export function Channels() {
  return (
    <section id="channels" className="py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          Works where your customers are
        </h2>
        <p className="mt-3 text-muted-foreground">
          All messages land in one simple inbox.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {CHANNELS.map((channel) => (
            <div
              key={channel.id}
              className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-6 py-4"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: channel.color }}
              >
                {channel.name[0]}
              </div>
              <span className="font-medium">{channel.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
