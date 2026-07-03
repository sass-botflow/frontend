"use client";

import { useCallback, useEffect, useState } from "react";
import type { BackendChannel } from "@/lib/backend/types";

interface ChannelsResponse {
  channels: BackendChannel[];
}

export function useChannels() {
  const [channels, setChannels] = useState<BackendChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionChannelId, setActionChannelId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("/api/channels", { cache: "no-store" });
      const body = (await response.json()) as ChannelsResponse & { error?: string };
      if (!response.ok) {
        throw new Error(body.error ?? "Failed to load channels.");
      }
      setChannels(body.channels ?? []);
    } catch (err) {
      setChannels([]);
      setError(err instanceof Error ? err.message : "Failed to load channels.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const refreshChannel = useCallback(
    async (channelId: string) => {
      setActionChannelId(channelId);
      setError(null);
      try {
        const response = await fetch("/api/channels/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channelId }),
        });
        const body = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(body.error ?? "Failed to refresh channel.");
        }
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to refresh channel.");
        throw err;
      } finally {
        setActionChannelId(null);
      }
    },
    [load],
  );

  const disconnectChannel = useCallback(
    async (channelId: string) => {
      setActionChannelId(channelId);
      setError(null);
      try {
        const response = await fetch("/api/channels/disconnect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channelId }),
        });
        const body = (await response.json()) as { error?: string };
        if (!response.ok) {
          throw new Error(body.error ?? "Failed to disconnect channel.");
        }
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to disconnect channel.");
        throw err;
      } finally {
        setActionChannelId(null);
      }
    },
    [load],
  );

  function startWhatsAppConnect() {
    window.location.href = "/api/channels/whatsapp/connect";
  }

  return {
    channels,
    whatsappChannels: channels.filter((c) => c.provider === "whatsapp"),
    loading,
    actionChannelId,
    error,
    refresh: load,
    refreshChannel,
    disconnectChannel,
    startWhatsAppConnect,
  };
}
