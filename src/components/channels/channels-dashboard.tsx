"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlugZap, Radio, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { ChannelsEmptyState } from "@/components/channels/channels-empty-state";
import {
  ChannelsHeroSkeleton,
  ChannelsPageSkeleton,
} from "@/components/channels/channels-skeleton";
import { AppBanner } from "@/components/ui/app-banner";
import { WhatsAppChannelsSection } from "@/components/channels/whatsapp-channels-section";
import { useChannels } from "@/hooks/use-channels";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export function ChannelsDashboard() {
  const {
    whatsappChannels,
    loading,
    refresh: refreshChannels,
    error,
  } = useChannels();

  const [banner, setBanner] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const searchParams = useSearchParams();

  const showEmptyState = !loading && whatsappChannels.length === 0;

  useEffect(() => {
    const connected = searchParams.get("connected");
    const queryError = searchParams.get("error");
    const success = searchParams.get("success");

    if (connected === "whatsapp" || success) {
      setBanner({
        message: "WhatsApp Business connected successfully.",
        variant: "success",
      });
      void refreshChannels();
    } else if (queryError) {
      setBanner({
        message: decodeURIComponent(queryError),
        variant: "error",
      });
    }
  }, [searchParams, refreshChannels]);

  return (
    <>
      <DashboardHeader title="Connect" />

      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_60%)]" />
        <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-8 space-y-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              WhatsApp Business
            </div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Connect WhatsApp Business
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              One-click Meta Embedded Signup. Your tokens and channels are stored
              securely in the BotFlow API — not on this frontend server.
            </p>
          </motion.div>

          {loading ? (
            <ChannelsHeroSkeleton />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 grid gap-3 sm:grid-cols-3"
            >
              <HeroMetric
                icon={Radio}
                label="Connected lines"
                value={String(whatsappChannels.length)}
                accent="text-emerald-400"
              />
              <HeroMetric
                icon={PlugZap}
                label="Routing"
                value={whatsappChannels.length > 0 ? "Active" : "Waiting"}
                accent="text-primary"
              />
              <HeroMetric
                icon={Sparkles}
                label="AI coverage"
                value={whatsappChannels.length > 0 ? "Live" : "Waiting"}
                accent="text-violet-400"
              />
            </motion.div>
          )}

          {(error || banner) && (
            <AppBanner
              message={banner?.message ?? error}
              variant={banner?.variant ?? "error"}
              onDismiss={() => setBanner(null)}
            />
          )}

          {loading ? (
            <ChannelsPageSkeleton />
          ) : (
            <div className="space-y-8">
              {showEmptyState && <ChannelsEmptyState />}
              <WhatsAppChannelsSection />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function HeroMetric({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Radio;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="glass rounded-2xl border border-border/50 p-4 transition-all hover:border-primary/20 hover:bg-card/60">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className={cn("mt-1 text-2xl font-semibold tracking-tight", accent)}>
            {value}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
