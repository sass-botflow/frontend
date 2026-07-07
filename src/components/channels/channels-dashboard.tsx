"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { ChannelsPageSkeleton } from "@/components/channels/channels-skeleton";
import { AppBanner } from "@/components/ui/app-banner";
import { WhatsAppChannelsSection } from "@/components/channels/whatsapp-channels-section";
import { useChannels } from "@/hooks/use-channels";
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

  const hasChannels = whatsappChannels.length > 0;

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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(37,211,102,0.07),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

        <div className="relative mx-auto max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
          {hasChannels && !loading ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-8 space-y-2"
            >
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                WhatsApp channels
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Your connected WhatsApp Business numbers. Add more lines or
                reconnect through Meta Embedded Signup anytime.
              </p>
            </motion.div>
          ) : null}

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
            <WhatsAppChannelsSection />
          )}
        </div>
      </div>
    </>
  );
}
