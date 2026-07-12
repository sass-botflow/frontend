"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/header";
import { ChannelsPageSkeleton } from "@/components/channels/channels-skeleton";
import { AppBanner } from "@/components/ui/app-banner";
import { InstagramChannelsSection } from "@/components/channels/instagram-channels-section";
import { WhatsAppChannelsSection } from "@/components/channels/whatsapp-channels-section";
import { useWhatsAppChannels } from "@/hooks/use-whatsapp-evolution";
import { useSearchParams } from "next/navigation";

export function ChannelsDashboard() {
  const channelsQuery = useWhatsAppChannels();
  const [banner, setBanner] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);
  const searchParams = useSearchParams();

  const channels = channelsQuery.data ?? [];
  const hasWhatsAppChannels = channels.length > 0;

  useEffect(() => {
    const connected = searchParams.get("connected");
    const queryError = searchParams.get("error");
    const success = searchParams.get("success");

    if (connected === "whatsapp" || (success && connected !== "instagram")) {
      setBanner({
        message: "WhatsApp connected successfully.",
        variant: "success",
      });
      void channelsQuery.refetch();
    } else if (connected === "instagram") {
      setBanner({
        message: "Instagram connected successfully.",
        variant: "success",
      });
    } else if (queryError) {
      setBanner({
        message: decodeURIComponent(queryError),
        variant: "error",
      });
    }
  }, [searchParams, channelsQuery]);

  return (
    <>
      <DashboardHeader title="Channels" />

      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(37,211,102,0.07),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

        <div className="relative mx-auto max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
          {banner ? (
            <AppBanner
              message={banner.message}
              variant={banner.variant}
              onDismiss={() => setBanner(null)}
            />
          ) : null}

          {channelsQuery.isLoading ? (
            <ChannelsPageSkeleton />
          ) : (
            <div className="space-y-12">
              <div className="space-y-6">
                {hasWhatsAppChannels ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-2"
                  >
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      WhatsApp
                    </h2>
                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      Connect and manage WhatsApp Business numbers via QR code pairing.
                    </p>
                  </motion.div>
                ) : null}
                <WhatsAppChannelsSection />
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="space-y-2"
                >
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Instagram
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Connect your Instagram Professional account with Meta OAuth.
                  </p>
                </motion.div>
                <InstagramChannelsSection />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
