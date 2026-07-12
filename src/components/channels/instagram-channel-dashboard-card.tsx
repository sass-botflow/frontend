"use client";

import { motion } from "framer-motion";
import { Clock3, Loader2, MessageCircle, Unlink, UserRound } from "lucide-react";
import { ChannelStatusBadge } from "@/components/channels/channel-status-badge";
import { InstagramIcon } from "@/components/channels/channel-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { InstagramChannel } from "@/lib/integrations/instagram-types";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface InstagramChannelDashboardCardProps {
  channel: InstagramChannel;
  index?: number;
  loading?: boolean;
  onDisconnect: () => void;
  onReconnect: () => void;
}

export function InstagramChannelDashboardCard({
  channel,
  index = 0,
  loading = false,
  onDisconnect,
  onReconnect,
}: InstagramChannelDashboardCardProps) {
  const initials = channel.displayName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-lg shadow-black/5 backdrop-blur-xl transition-all hover:border-[#DD2A7B]/25 hover:shadow-[#DD2A7B]/5 sm:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(221,42,123,0.08),transparent_55%)] opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="h-16 w-16 rounded-2xl ring-2 ring-[#DD2A7B]/20">
                {channel.profilePictureUrl ? (
                  <AvatarImage
                    src={channel.profilePictureUrl}
                    alt={channel.displayName}
                    className="rounded-2xl object-cover"
                  />
                ) : null}
                <AvatarFallback className="rounded-2xl bg-gradient-to-br from-[#F58529]/20 via-[#DD2A7B]/20 to-[#8134AF]/20 text-base font-semibold text-[#DD2A7B]">
                  {initials || "IG"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] shadow-md">
                <InstagramIcon className="h-3.5 w-3.5 text-white" />
              </div>
            </div>

            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold tracking-tight">{channel.displayName}</h3>
                <ChannelStatusBadge status="connected" />
              </div>
              <p className="text-sm text-muted-foreground">{channel.username}</p>
              <p className="text-sm text-emerald-500">Connected to BotFlow — manage everything here.</p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <Button
              size="lg"
              variant="outline"
              disabled={loading}
              className="h-11 rounded-xl border-border/70 bg-background/40 font-semibold backdrop-blur"
              onClick={onReconnect}
            >
              Reconnect
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={loading}
              className="h-11 rounded-xl border-border/70 bg-background/40 font-semibold backdrop-blur hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
              onClick={onDisconnect}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Unlink className="h-4 w-4" />
                  Disconnect
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <MetricTile icon={UserRound} label="Account" value={channel.username} />
          <MetricTile icon={MessageCircle} label="DMs" value="Automation active" accent="text-[#DD2A7B]" />
          <MetricTile
            icon={Clock3}
            label="Connected"
            value={channel.connectedAt ? formatRelativeTime(channel.connectedAt) : "Just now"}
          />
        </div>
      </div>
    </motion.article>
  );
}

function MetricTile({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof UserRound;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-background/30 p-4 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F58529]/10 via-[#DD2A7B]/10 to-[#8134AF]/10">
          <Icon className={cn("h-4 w-4 text-[#DD2A7B]", accent)} />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className={cn("mt-1 truncate text-sm font-semibold", accent)} title={value}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
