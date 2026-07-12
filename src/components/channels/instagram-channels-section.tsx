"use client";

import { useCallback, useEffect, useState } from "react";
import { AppBanner } from "@/components/ui/app-banner";
import { ChannelsHeroSkeleton } from "@/components/channels/channels-skeleton";
import { InstagramChannelDashboardCard } from "@/components/channels/instagram-channel-dashboard-card";
import { InstagramConnectCard } from "@/components/channels/instagram-connect-card";
import {
  useInstagramDisconnect,
  useInstagramIntegration,
  instagramQueryKeys,
} from "@/hooks/use-instagram-integration";
import {
  INSTAGRAM_OAUTH_MESSAGE,
  type InstagramChannel,
} from "@/lib/integrations/instagram-types";
import { useQueryClient } from "@tanstack/react-query";

function resolveAppOrigin(): string {
  const { hostname, origin } = window.location;
  if (hostname === "botflow.ink") return "https://www.botflow.ink";
  return origin;
}

function openInstagramOAuthPopup(): Window | null {
  const width = 520;
  const height = 720;
  const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
  const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);
  const url = `${resolveAppOrigin()}/api/auth/instagram?popup=1`;

  return window.open(
    url,
    "botflow-instagram-oauth",
    `popup=yes,width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`,
  );
}

export function InstagramChannelsSection() {
  const queryClient = useQueryClient();
  const integrationQuery = useInstagramIntegration();
  const disconnectMutation = useInstagramDisconnect();

  const [previewChannel, setPreviewChannel] = useState<InstagramChannel | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [banner, setBanner] = useState<{
    message: string;
    variant: "success" | "error";
  } | null>(null);

  const channel = previewChannel ?? integrationQuery.data ?? null;
  const isConnected = Boolean(channel?.isConnected);
  const loading = integrationQuery.isLoading;

  const refreshIntegration = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: instagramQueryKeys.integration() });
  }, [queryClient]);

  const startConnect = useCallback(() => {
    setBanner(null);
    setConnecting(true);

    const popup = openInstagramOAuthPopup();
    if (!popup) {
      setConnecting(false);
      setBanner({
        message: "Popup blocked. Allow popups for BotFlow and try again.",
        variant: "error",
      });
      return;
    }

    const timer = window.setInterval(() => {
      if (popup.closed) {
        window.clearInterval(timer);
        setConnecting(false);
        void refreshIntegration();
      }
    }, 500);
  }, [refreshIntegration]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== INSTAGRAM_OAUTH_MESSAGE) return;

      setConnecting(false);

      if (event.data.status === "success") {
        setPreviewChannel({
          id: "preview",
          username: event.data.username || "@instagram",
          displayName: event.data.displayName || "Instagram",
          profilePictureUrl: event.data.profilePictureUrl ?? null,
          instagramUserId: null,
          isConnected: true,
          connectedAt: new Date().toISOString(),
        });
        setBanner({
          message: `${event.data.displayName} connected to BotFlow.`,
          variant: "success",
        });
        void refreshIntegration();
        return;
      }

      setBanner({
        message: event.data.message ?? "Instagram connection failed.",
        variant: "error",
      });
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [refreshIntegration]);

  const handleDisconnect = useCallback(async () => {
    try {
      await disconnectMutation.mutateAsync();
      setPreviewChannel(null);
      setBanner({ message: "Instagram disconnected.", variant: "success" });
    } catch (error) {
      setBanner({
        message: error instanceof Error ? error.message : "Could not disconnect Instagram.",
        variant: "error",
      });
    }
  }, [disconnectMutation]);

  return (
    <section className="space-y-6">
      {banner ? (
        <AppBanner
          message={banner.message}
          variant={banner.variant}
          onDismiss={() => setBanner(null)}
        />
      ) : null}

      {integrationQuery.error ? (
        <AppBanner
          message={
            integrationQuery.error instanceof Error
              ? integrationQuery.error.message
              : "Could not load Instagram connection."
          }
          variant="error"
          onDismiss={() => void refreshIntegration()}
        />
      ) : null}

      {loading ? (
        <ChannelsHeroSkeleton />
      ) : isConnected && channel ? (
        <InstagramChannelDashboardCard
          channel={channel}
          loading={disconnectMutation.isPending}
          onDisconnect={() => void handleDisconnect()}
          onReconnect={startConnect}
        />
      ) : (
        <InstagramConnectCard loading={connecting} onConnect={startConnect} />
      )}
    </section>
  );
}
