"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchAffiliateDashboard,
  joinAffiliateProgram,
  updateAffiliate,
} from "@/lib/affiliate/client";
import type { AffiliateDashboardResponse } from "@/lib/affiliate/types";

export function useAffiliate() {
  const [data, setData] = useState<AffiliateDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const response = await fetchAffiliateDashboard();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load affiliate program");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const join = useCallback(async () => {
    setJoining(true);
    setError(null);
    try {
      await joinAffiliateProgram();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join program");
      throw err;
    } finally {
      setJoining(false);
    }
  }, [load]);

  const savePayoutEmail = useCallback(
    async (payoutEmail: string) => {
      setSaving(true);
      setError(null);
      try {
        await updateAffiliate({ payoutEmail });
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save payout email");
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [load],
  );

  return {
    data,
    loading,
    joining,
    saving,
    error,
    join,
    savePayoutEmail,
    refresh: load,
  };
}
