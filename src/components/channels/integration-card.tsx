"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  Loader2,
  MessageCircle,
  TrendingUp,
  Unlink,
  UserRound,
} from "lucide-react";
import { ChannelConnectForm } from "@/components/channels/channel-connect-form";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { WhatsAppConnectedView } from "@/components/channels/whatsapp-connected-view";
import { WhatsAppOAuthConnect } from "@/components/channels/whatsapp-oauth-connect";
import { Button } from "@/components/ui/button";
import { isManualConnectPlatform } from "@/lib/integrations/connect-credentials";
import type { ConnectCredentialsInput } from "@/lib/integrations/connect-credentials";
import type { IntegrationPlatform, IntegrationRecord } from "@/lib/integrations/types";
import { cn, formatRelativeTime } from "@/lib/utils";

interface IntegrationCardProps {
  integration: IntegrationRecord;
  index: number;
  loading: boolean;
  onConnect: (credentials: ConnectCredentialsInput) => Promise<void>;
  onDisconnectRequest: (integration: IntegrationRecord) => void;
}

const PLATFORM_ACCENTS: Record<
  IntegrationPlatform,
  { ring: string; glow: string }
> = {
  whatsapp: {
    ring: "group-hover:ring-[#25D366]/30",
    glow: "from-[#25D366]/20",
  },
  instagram: {
    ring: "group-hover:ring-[#DD2A7B]/30",
    glow: "from-[#DD2A7B]/20",
  },
  tiktok: {
    ring: "group-hover:ring-white/20",
    glow: "from-white/10",
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
  onDisconnectRequest,
}: IntegrationCardProps) {
  const platform = integration.platform;
  const accent = PLATFORM_ACCENTS[platform];
  const connected = integration.isConnected;
  const isWhatsApp = platform === "whatsapp";

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
                {platform === "whatsapp"
                  ? "Reply to customers on WhatsApp Business automatically."
                  : platform === "instagram"
                    ? "Automate Instagram DMs and capture leads."
                    : "Handle TikTok messages from one inbox."}
              </p>

              {connected && !isWhatsApp && integration.displayName && (
                <div className="flex items-center gap-2 text-sm">
                  <UserRound className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Connected account:</span>
                  <span className="font-medium">{integration.displayName}</span>
                </div>
              )}

              {connected && integration.lastSyncedAt && !isWhatsApp && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarClock className="h-3.5 w-3.5" />
                  Last sync {formatRelativeTime(integration.lastSyncedAt)}
                </div>
              )}
            </div>
          </div>

          {connected && !isWhatsApp && (
            <Button
              size="lg"
              variant="outline"
              disabled={loading}
              className="h-11 w-full shrink-0 rounded-xl border-border/70 bg-background/40 font-semibold backdrop-blur hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive lg:w-auto"
              onClick={() => onDisconnectRequest(integration)}
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
          )}
        </div>

        {isWhatsApp && !connected && (
          <WhatsAppOAuthConnect loading={loading} />
        )}

        {isWhatsApp && connected && integration.whatsapp && (
          <WhatsAppConnectedView
            details={integration.whatsapp}
            loading={loading}
            onDisconnect={() => onDisconnectRequest(integration)}
          />
        )}

        {!connected && isManualConnectPlatform(platform) && (
          <ChannelConnectForm
            platform={platform}
            loading={loading}
            onSubmit={onConnect}
          />
        )}

        {connected && integration.stats && !isWhatsApp && (
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
