"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  Link2,
  Loader2,
  MessageCircle,
  TrendingUp,
  Unlink,
  UserRound,
} from "lucide-react";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { Button } from "@/components/ui/button";
import { CHANNEL_MAP } from "@/lib/channels";
import type { IntegrationPlatform, IntegrationRecord } from "@/lib/integrations/types";
import { cn, formatRelativeTime } from "@/lib/utils";

interface IntegrationCardProps {
  integration: IntegrationRecord;
  index: number;
  loading: boolean;
  onConnect: (platform: IntegrationPlatform) => void;
  onDisconnect: (platform: IntegrationPlatform) => void;
}

const PLATFORM_ACCENTS: Record<
  IntegrationPlatform,
  { ring: string; glow: string; button: string }
> = {
  whatsapp: {
    ring: "group-hover:ring-[#25D366]/30",
    glow: "from-[#25D366]/20",
    button: "bg-[#25D366] hover:bg-[#1fb855] text-white shadow-[0_0_24px_-6px_#25D366]",
  },
  instagram: {
    ring: "group-hover:ring-[#DD2A7B]/30",
    glow: "from-[#DD2A7B]/20",
    button:
      "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 text-white border-0 shadow-[0_0_24px_-6px_#DD2A7B]",
  },
  tiktok: {
    ring: "group-hover:ring-white/20",
    glow: "from-white/10",
    button:
      "bg-foreground text-background hover:bg-foreground/90 shadow-[0_0_24px_-6px_rgba(255,255,255,0.15)]",
  },
};

const PLATFORM_TITLES: Record<IntegrationPlatform, string> = {
  whatsapp: "WhatsApp Business",
  instagram: "Instagram Business",
  tiktok: "TikTok Business",
};

export function IntegrationCard({
  integration,
  index,
  loading,
  onConnect,
  onDisconnect,
}: IntegrationCardProps) {
  const platform = integration.platform;
  const channel = CHANNEL_MAP[platform];
  const accent = PLATFORM_ACCENTS[platform];
  const connected = integration.isConnected;
  const accountLabel =
    platform === "whatsapp" ? "Connected phone" : "Connected account";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300",
        "hover:border-primary/25 hover:bg-card/70 hover:shadow-[0_20px_60px_-30px_rgba(139,92,246,0.45)]",
        connected && "border-emerald-500/25 bg-emerald-500/[0.03]",
        accent.ring,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          accent.glow,
        )}
      />

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
              <ChannelLogo channel={platform} size="lg" className="relative" />
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold tracking-tight">
                  {PLATFORM_TITLES[platform]}
                </h3>
                <StatusBadge connected={connected} />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {channel.description}
              </p>

              {connected && integration.displayName && (
                <div className="flex items-center gap-2 text-sm">
                  <UserRound className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{accountLabel}:</span>
                  <span className="font-medium">{integration.displayName}</span>
                </div>
              )}

              {connected && integration.lastSyncedAt && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarClock className="h-3.5 w-3.5" />
                  Last sync {formatRelativeTime(integration.lastSyncedAt)}
                </div>
              )}
            </div>
          </div>

          <Button
            size="lg"
            variant={connected ? "outline" : "default"}
            disabled={loading}
            className={cn(
              "h-11 w-full shrink-0 rounded-xl font-semibold transition-all lg:w-auto",
              !connected && accent.button,
              connected &&
                "border-border/70 bg-background/40 backdrop-blur hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive",
            )}
            onClick={() =>
              connected ? onDisconnect(platform) : onConnect(platform)
            }
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : connected ? (
              <>
                <Unlink className="h-4 w-4" />
                Disconnect
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4" />
                Connect
              </>
            )}
          </Button>
        </div>

        {connected && integration.stats && (
          <div className="grid gap-3 sm:grid-cols-2">
            <StatTile
              icon={MessageCircle}
              label={integration.stats.primaryMetric.label}
              value={integration.stats.primaryMetric.value}
            />
            <StatTile
              icon={TrendingUp}
              label={integration.stats.leadsCaptured.label}
              value={integration.stats.leadsCaptured.value}
            />
          </div>
        )}
      </div>
    </motion.article>
  );
}

function StatusBadge({ connected }: { connected: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
        connected
          ? "bg-emerald-500/15 text-emerald-500 ring-1 ring-emerald-500/25"
          : "bg-muted/80 text-muted-foreground ring-1 ring-border/60",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          connected ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-muted-foreground/50",
        )}
      />
      {connected ? "Connected" : "Not connected"}
    </span>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MessageCircle;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/30 p-4 backdrop-blur-sm transition-colors group-hover:border-primary/15">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
