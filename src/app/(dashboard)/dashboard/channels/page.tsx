"use client";

import { useState } from "react";
import { CheckCircle2, Link2, Unlink } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { ChannelBadge } from "@/components/channels/channel-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CHANNELS, type ChannelId } from "@/lib/channels";
import { cn } from "@/lib/utils";

interface ChannelState {
  connected: boolean;
  phone?: string;
  handle?: string;
}

const initialState: Record<ChannelId, ChannelState> = {
  whatsapp: { connected: true, phone: "+212 6XX XXX XXX" },
  instagram: { connected: false, handle: "@yourbusiness" },
  tiktok: { connected: false, handle: "@yourbusiness" },
};

export default function ChannelsPage() {
  const [channels, setChannels] = useState(initialState);

  function toggle(channelId: ChannelId) {
    setChannels((prev) => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        connected: !prev[channelId].connected,
      },
    }));
  }

  const connectedCount = Object.values(channels).filter((c) => c.connected).length;

  return (
    <>
      <DashboardHeader title="Channels" />
      <div className="mx-auto max-w-2xl flex-1 p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Your channels
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {connectedCount} of {CHANNELS.length} connected — connect the rest to
            reach more customers.
          </p>
        </div>

        <div className="space-y-4">
          {CHANNELS.map((channel) => {
            const state = channels[channel.id];
            const isConnected = state.connected;

            return (
              <Card
                key={channel.id}
                className={cn(
                  "overflow-hidden border-border/60 shadow-none transition-colors",
                  isConnected && "border-emerald-500/30 bg-emerald-500/[0.02]",
                )}
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <ChannelLogo channel={channel.id} size="lg" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-semibold">{channel.name}</h3>
                          {isConnected ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Connected
                            </span>
                          ) : (
                            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                              Not connected
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {channel.description}
                        </p>
                        {isConnected && channel.id === "whatsapp" && state.phone && (
                          <p className="mt-2 text-sm font-medium">
                            Phone: <span className="text-muted-foreground">{state.phone}</span>
                          </p>
                        )}
                        {isConnected && channel.id !== "whatsapp" && state.handle && (
                          <p className="mt-2 text-sm font-medium">
                            Account:{" "}
                            <span className="text-muted-foreground">{state.handle}</span>
                          </p>
                        )}
                        <div className="mt-3 sm:hidden">
                          <ChannelBadge channel={channel.id} />
                        </div>
                      </div>
                    </div>

                    <Button
                      variant={isConnected ? "outline" : "default"}
                      size="lg"
                      className={cn(
                        "w-full shrink-0 sm:w-auto",
                        !isConnected && channel.id === "whatsapp" && "bg-[#25D366] hover:bg-[#20bd5a] text-white",
                        !isConnected && channel.id === "instagram" && "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 text-white border-0",
                        !isConnected && channel.id === "tiktok" && "bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black",
                      )}
                      onClick={() => toggle(channel.id)}
                    >
                      {isConnected ? (
                        <>
                          <Unlink className="h-4 w-4" />
                          Disconnect
                        </>
                      ) : (
                        <>
                          <Link2 className="h-4 w-4" />
                          {channel.connectLabel}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
