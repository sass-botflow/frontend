"use client";

import { CheckCircle2, Link2, Unlink } from "lucide-react";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { Button } from "@/components/ui/button";
import type { ChannelId } from "@/lib/channels";
import { getChannel } from "@/lib/channels";
import { cn } from "@/lib/utils";

interface ChannelConnectionCardProps {
  channelId: ChannelId;
  connected: boolean;
  detail?: string;
  onToggle: () => void;
}

export function ChannelConnectionCard({
  channelId,
  connected,
  detail,
  onToggle,
}: ChannelConnectionCardProps) {
  const channel = getChannel(channelId);
  if (!channel) return null;

  return (
    <div
      className={cn(
        "rounded-xl border border-border/60 bg-card p-5 transition-colors sm:p-6",
        connected && "border-emerald-500/30 bg-emerald-500/[0.02]",
      )}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <ChannelLogo channel={channelId} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">{channel.name}</h3>
              {connected ? (
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
            {connected && detail && (
              <p className="mt-2 text-sm">
                <span className="text-muted-foreground">{detail}</span>
              </p>
            )}
          </div>
        </div>

        <Button
          variant={connected ? "outline" : "default"}
          className={cn(
            "w-full shrink-0 sm:w-auto",
            !connected && channelId === "whatsapp" && "bg-[#25D366] text-white hover:bg-[#20bd5a]",
            !connected && channelId === "instagram" && "border-0 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:opacity-90",
            !connected && channelId === "tiktok" && "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black",
          )}
          onClick={onToggle}
        >
          {connected ? (
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
    </div>
  );
}
