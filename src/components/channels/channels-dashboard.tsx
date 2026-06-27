"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PlugZap, Radio, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { ChannelsEmptyState } from "@/components/channels/channels-empty-state";
import { DisconnectChannelDialog } from "@/components/channels/disconnect-channel-dialog";
import { IntegrationCard } from "@/components/channels/integration-card";
import {
  ChannelsHeroSkeleton,
  ChannelsPageSkeleton,
} from "@/components/channels/channels-skeleton";
import { useIntegrations } from "@/hooks/use-integrations";
import type { IntegrationPlatform, IntegrationRecord } from "@/lib/integrations/types";
import { cn } from "@/lib/utils";

export function ChannelsDashboard() {
  const {
    integrations,
    connectedCount,
    loading,
    actionPlatform,
    error,
    connect,
    disconnect,
  } = useIntegrations();

  const [disconnectTarget, setDisconnectTarget] =
    useState<IntegrationRecord | null>(null);

  const showEmptyState = !loading && connectedCount === 0;

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
              Link the apps your customers use. Paste your credentials on each card
              below — then click Save &amp; connect.
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
                value={`${connectedCount} / 3`}
                accent="text-primary"
              />
              <HeroMetric
                icon={PlugZap}
                label="Active automations"
                value={connectedCount > 0 ? String(connectedCount * 2) : "0"}
                accent="text-violet-400"
              />
              <HeroMetric
                icon={Sparkles}
                label="AI coverage"
                value={connectedCount > 0 ? "Live" : "Waiting"}
                accent="text-emerald-400"
              />
            </motion.div>
          )}

          {error && (
            <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              <p className="font-medium">Could not sync saved channels</p>
              <p className="mt-1 text-amber-200/80">
                {error}. Scroll down — WhatsApp, Instagram and TikTok forms are
                still available below.
              </p>
            </div>
          )}

          {loading ? (
            <ChannelsPageSkeleton />
          ) : (
            <div className="space-y-5">
              {showEmptyState && <ChannelsEmptyState />}

              {integrations.map((integration, index) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  index={index}
                  loading={actionPlatform === integration.platform}
                  onConnect={connect}
                  onDisconnectRequest={setDisconnectTarget}
                />
              ))}
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
