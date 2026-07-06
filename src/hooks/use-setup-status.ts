"use client";

import { useCallback, useEffect, useState } from "react";
import type { SetupStatusReport } from "@/lib/setup/status";

export function useSetupStatus() {
  const [report, setReport] = useState<SetupStatusReport | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/setup-status", { cache: "no-store" });
      const body = (await response.json()) as SetupStatusReport;
      setReport(body);
      return body;
    } catch {
      setReport(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    report,
    loading,
    ready: report?.ready ?? false,
    blockers: report?.checks.filter((check) => check.status !== "ok") ?? [],
    refresh,
  };
}
