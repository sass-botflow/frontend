"use client";

import { motion } from "framer-motion";
import { Loader2, MessageCircle, Plus, Radio } from "lucide-react";
import { AppBanner } from "@/components/ui/app-banner";
import { DisconnectWhatsAppChannelDialog } from "@/components/channels/disconnect-whatsapp-channel-dialog";
import { WhatsAppChannelCard } from "@/components/channels/whatsapp-channel-card";
import { WhatsAppConnectionProgress } from "@/components/channels/whatsapp-connection-progress";
import { WhatsAppOnboardingWizard } from "@/components/channels/whatsapp-onboarding-wizard";
import { IntegrationCardSkeleton } from "@/components/channels/channels-skeleton";
import { useChannels } from "@/hooks/use-channels";
import { useWhatsAppEmbeddedSignup } from "@/hooks/use-whatsapp-embedded-signup";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { BackendChannel } from "@/lib/backend/types";

export function WhatsAppChannelsSection() {
  const {
    whatsappChannels,
    loading,
    actionChannelId,
    error,
    refresh,
    refreshChannel,
    disconnectChannel,
  } = useChannels();

  const [disconnectTarget, setDisconnectTarget] = useState<BackendChannel | null>(
    null,
  );
  const [banner, setBanner] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  const {
    launchSignup,
    phase: connectPhase,
    loading: connecting,
    errorMessage: connectError,
    reset: resetConnect,
  } = useWhatsAppEmbeddedSignup({
    onSuccess: async () => {
      await refresh();
      setBanner({
        message: "WhatsApp channel connected successfully.",
        variant: "success",
      });
    },
    onError: (message) => {
      setBanner({ message, variant: "error" });
    },
  });

  async function handleDisconnect(channelId: string) {
    try {
      await disconnectChannel(channelId);
      setDisconnectTarget(null);
      setBanner({
        message: "WhatsApp channel disconnected.",
        variant: "success",
      });
    } catch {
      setBanner({
        message: "Could not disconnect this channel. Please try again.",
        variant: "error",
      });
    }
  }

  async function handleRefresh(channelId: string) {
    try {
      await refreshChannel(channelId);
      setBanner({
        message: "WhatsApp token refreshed successfully.",
        variant: "success",
      });
    } catch {
      setBanner({
        message: "Token refresh failed. Reconnect if the issue persists.",
        variant: "error",
      });
    }
  }

  function handleAddAnother() {
    if (connectPhase === "error") resetConnect();
    void launchSignup();
  }

  const showWizard = whatsappChannels.length === 0;

  return (
    <section className="space-y-6">
      <DisconnectWhatsAppChannelDialog
        channel={disconnectTarget}
        open={disconnectTarget !== null}
        loading={actionChannelId === disconnectTarget?.id}
        onOpenChange={(open) => {
          if (!open) setDisconnectTarget(null);
        }}
        onConfirm={handleDisconnect}
      />

      {(error || banner || connectError) && (
        <AppBanner
          message={banner?.message ?? connectError ?? error ?? ""}
          variant={banner?.variant ?? "error"}
          onDismiss={() => {
            setBanner(null);
            if (connectError) resetConnect();
            void refresh();
          }}
        />
      )}

      {loading ? (
        <IntegrationCardSkeleton />
      ) : showWizard ? (
        <WhatsAppOnboardingWizard
          phase={connectPhase}
          loading={connecting}
          errorMessage={connectError}
          onConnect={() => void launchSignup()}
          onReset={resetConnect}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Connected channels
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage your WhatsApp Business numbers and reconnect via Meta
                when needed.
              </p>
            </div>
            <Button
              onClick={handleAddAnother}
              disabled={connecting}
              className="h-11 rounded-xl bg-[#25D366] font-semibold text-white hover:bg-[#1fb855]"
            >
              {connecting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Add another number
            </Button>
          </div>

          {connecting ? (
            <div className="rounded-2xl border border-border/60 bg-card/60 p-5 backdrop-blur-xl">
              <p className="mb-4 text-sm font-medium">Connecting another number</p>
              <WhatsAppConnectionProgress phase={connectPhase} className="rounded-xl" />
            </div>
          ) : null}

          <div className="space-y-4">
            {whatsappChannels.map((channel, index) => (
              <WhatsAppChannelCard
                key={channel.id}
                channel={channel}
                index={index}
                loading={actionChannelId === channel.id}
                onDisconnect={setDisconnectTarget}
                onRefresh={handleRefresh}
                onReconnect={() => void launchSignup()}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-3 sm:grid-cols-2"
          >
            <MetricTile
              icon={Radio}
              label="Connected numbers"
              value={String(whatsappChannels.length)}
              accent="text-emerald-400"
            />
            <MetricTile
              icon={MessageCircle}
              label="Inbound routing"
              value="Active"
              accent="text-primary"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}

function MetricTile({
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
    <div className="glass rounded-2xl border border-border/50 p-4">
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
