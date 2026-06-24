"use client";

import { useCallback, useEffect, useState } from "react";
import {
  connectIntegration,
  disconnectIntegration,
  fetchIntegrations,
} from "@/lib/integrations/client";
import type {
  IntegrationPlatform,
  IntegrationRecord,
} from "@/lib/integrations/types";

export function useIntegrations() {
  const [integrations, setIntegrations] = useState<IntegrationRecord[]>([]);
  const [connectedCount, setConnectedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionPlatform, setActionPlatform] =
    useState<IntegrationPlatform | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchIntegrations();
      setIntegrations(data.integrations);
      setConnectedCount(data.connectedCount);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load channels");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const connect = useCallback(
    async (platform: IntegrationPlatform) => {
      setActionPlatform(platform);
      setError(null);
      try {
        await connectIntegration(platform);
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Connect failed");
      } finally {
        setActionPlatform(null);
      }
    },
    [load],
  );

  const disconnect = useCallback(
    async (platform: IntegrationPlatform) => {
      setActionPlatform(platform);
      setError(null);
      try {
        await disconnectIntegration(platform);
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Disconnect failed");
      } finally {
        setActionPlatform(null);
      }
    },
    [load],
  );

  return {
    integrations,
    connectedCount,
    loading,
    actionPlatform,
    error,
    connect,
    disconnect,
    refresh: load,
  };
}
