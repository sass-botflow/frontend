"use client";

import { useCallback, useEffect, useState } from "react";
import type { BackendBot } from "@/lib/backend/types";

interface BotsResponse {
  bots: BackendBot[];
}

export function useBots() {
  const [bots, setBots] = useState<BackendBot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("/api/bots", { cache: "no-store" });
      const body = (await response.json()) as BotsResponse & { error?: string };
      if (!response.ok) {
        throw new Error(body.error ?? "Failed to load workflows.");
      }
      setBots(body.bots ?? []);
    } catch (err) {
      setBots([]);
      setError(err instanceof Error ? err.message : "Failed to load workflows.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const updateBot = useCallback(
    async (botId: string, payload: { channelId?: string | null; name?: string }) => {
      setSaving(true);
      setError(null);
      try {
        const response = await fetch("/api/bots", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ botId, ...payload }),
        });
        const body = (await response.json()) as { bot?: BackendBot; error?: string };
        if (!response.ok) {
          throw new Error(body.error ?? "Failed to update workflow.");
        }
        if (body.bot) {
          setBots((prev) =>
            prev.map((bot) => (bot.id === body.bot!.id ? body.bot! : bot)),
          );
        } else {
          await load();
        }
        return body.bot;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update workflow.");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [load],
  );

  return {
    bots,
    primaryBot: bots[0] ?? null,
    loading,
    saving,
    error,
    refresh: load,
    updateBot,
  };
}
