"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlugZap, Radio, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { ChannelsEmptyState } from "@/components/channels/channels-empty-state";
import { DisconnectChannelDialog } from "@/components/channels/disconnect-channel-dialog";
import { IntegrationCard } from "@/components/channels/integration-card";
import { WhatsAppChannelsSection } from "@/components/channels/whatsapp-channels-section";
import {
  ChannelsHeroSkeleton,
  ChannelsPageSkeleton,
} from "@/components/channels/channels-skeleton";
import { AppBanner } from "@/components/ui/app-banner";
import { useChannels } from "@/hooks/use-channels";
import { useIntegrations } from "@/hooks/use-integrations";
import type { ConnectCredentialsInput } from "@/lib/integrations/connect-credentials";
import type { IntegrationPlatform, IntegrationRecord } from "@/lib/integrations/types";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export function ChannelsDashboard() {
  const {
    integrations,
    loading: integrationsLoading,
    actionPlatform,
    error: integrationsError,
    connect,
    disconnect,
  } = useIntegrations();

  const {
    whatsappChannels,
    loading: channelsLoading,
    refresh: refreshChannels,
  } = useChannels();

  const [disconnectTarget, setDisconnectTarget] =
    useState<IntegrationRecord | null>(null);
  const [banner, setBanner] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const searchParams = useSearchParams();

  const otherIntegrations = integrations.filter((i) => i.platform !== "whatsapp");
  const otherConnectedCount = otherIntegrations.filter((i) => i.isConnected).length;
  const totalConnected = whatsappChannels.length + otherConnectedCount;
  const loading = integrationsLoading || channelsLoading;
  const showEmptyState = !loading && totalConnected === 0;

  useEffect(() => {
    const connected = searchParams.get("connected");
    const error = searchParams.get("error");
    const success = searchParams.get("success");

    if (connected === "whatsapp" || success) {
      setBanner({
        message: "WhatsApp Business connected successfully.",
        variant: "success",
      });
      void refreshChannels();
    } else if (error) {
      setBanner({
        message: decodeURIComponent(error),
        variant: "error",
      });
    }
  }, [searchParams, refreshChannels]);

  async function handleDisconnect(platform: IntegrationPlatform) {
    await disconnect(platform);
    setDisconnectTarget(null);
  }

  return (
    <>
      <DashboardHeader title="Connect" />

      <DisconnectChannelDialog
        integration={disconnectTarget}
        open={disconnectTarget !== null}
        loading={actionPlatform === disconnectTarget?.platform}
        onOpenChange={(open) => {
          if (!open) setDisconnectTarget(null);
        }}
        onConfirm={handleDisconnect}
      />

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
              Messaging apps
            </div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Connect WhatsApp, Instagram &amp; TikTok
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Connect WhatsApp with one click through Meta Embedded Signup.
              Instagram and TikTok use secure credential forms below.
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
                label="Connected"
                value={`${totalConnected} / ${2 + (whatsappChannels.length > 0 ? whatsappChannels.length : 1)}`}
                accent="text-primary"
              />
              <HeroMetric
                icon={PlugZap}
                label="WhatsApp lines"
                value={String(whatsappChannels.length)}
                accent="text-emerald-400"
              />
              <HeroMetric
                icon={Sparkles}
                label="AI coverage"
                value={totalConnected > 0 ? "Live" : "Waiting"}
                accent="text-violet-400"
              />
            </motion.div>
          )}

          {(integrationsError || banner) && (
            <AppBanner
              message={banner?.message ?? integrationsError}
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

              {otherIntegrations.length > 0 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      Other channels
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Instagram and TikTok connect with API credentials.
                    </p>
                  </div>

                  {otherIntegrations.map((integration, index) => (
                    <IntegrationCard
                      key={integration.id}
                      integration={integration}
                      index={index}
                      loading={actionPlatform === integration.platform}
                      onConnect={
                        connect as (credentials: ConnectCredentialsInput) => Promise<void>
                      }
                      onDisconnectRequest={setDisconnectTarget}
                    />
                  ))}
                </div>
              )}
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
