"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CalendarClock,
  Hash,
  Loader2,
  Phone,
  RefreshCw,
  Unlink,
} from "lucide-react";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { ChannelStatusBadge } from "@/components/channels/channel-status-badge";
import { Button } from "@/components/ui/button";
import type { BackendChannel } from "@/lib/backend/types";
import { formatRelativeTime } from "@/lib/utils";

interface WhatsAppChannelCardProps {
  channel: BackendChannel;
  index: number;
  loading: boolean;
  onDisconnect: (channel: BackendChannel) => void;
  onRefresh: (channelId: string) => Promise<void>;
}

export function WhatsAppChannelCard({
  channel,
  index,
  loading,
  onDisconnect,
  onRefresh,
}: WhatsAppChannelCardProps) {
  const businessName = channel.businessName ?? "WhatsApp Business";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.03] p-5 sm:p-6 backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:bg-emerald-500/[0.05]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#25D366]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex flex-col gap-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <ChannelLogo channel="whatsapp" size="lg" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold tracking-tight">
                  {businessName}
                </h3>
                <ChannelStatusBadge status={channel.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                WhatsApp Business · automated replies enabled
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <Button
              size="lg"
              variant="outline"
              disabled={loading}
              className="h-11 rounded-xl border-border/70 bg-background/40 font-semibold backdrop-blur"
              onClick={() => onRefresh(channel.id)}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Refresh Token
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              disabled={loading}
              className="h-11 rounded-xl border-border/70 bg-background/40 font-semibold backdrop-blur hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
              onClick={() => onDisconnect(channel)}
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

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DetailTile
            icon={Building2}
            label="Business Name"
            value={businessName}
          />
          <DetailTile
            icon={Phone}
            label="WhatsApp Number"
            value={channel.displayPhoneNumber}
          />
          <DetailTile
            icon={Hash}
            label="Phone Number ID"
            value={channel.phoneNumberId}
            mono
          />
          <DetailTile
            icon={CalendarClock}
            label="Connected"
            value={formatRelativeTime(channel.createdAt)}
          />
        </div>
      </div>
    </motion.article>
  );
}

function DetailTile({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/30 p-4 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p
            className={`mt-1 truncate text-sm font-semibold ${mono ? "font-mono text-xs" : ""}`}
            title={value}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
