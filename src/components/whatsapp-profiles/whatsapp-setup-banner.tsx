"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Wrench } from "lucide-react";
import type { SetupCheck, SetupStatusReport } from "@/lib/setup/status";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function statusIcon(status: SetupCheck["status"]) {
  if (status === "ok") {
    return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />;
  }
  if (status === "warning") {
    return <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />;
  }
  return <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />;
}

export function WhatsAppSetupBanner() {
  const [report, setReport] = useState<SetupStatusReport | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/setup-status", { cache: "no-store" });
      const body = (await response.json()) as SetupStatusReport;
      setReport(body);
    } catch {
      setReport(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  if (loading) {
    return (
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Checking WhatsApp infrastructure…
      </div>
    );
  }

  if (!report || report.ready) {
    return null;
  }

  const blockers = report.checks.filter((check) => check.status !== "ok");

  return (
    <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-4 text-sm">
      <div className="flex items-start gap-3">
        <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
        <div className="flex-1 space-y-3">
          <div>
            <p className="font-semibold text-amber-100">
              WhatsApp linking needs server setup
            </p>
            <p className="mt-1 text-amber-200/80">
              The app is running, but one or more backend services are not ready yet.
              An admin must complete these steps in EasyPanel before QR linking works.
            </p>
          </div>

          <ul className="space-y-3">
            {blockers.map((check) => (
              <li
                key={check.id}
                className={cn(
                  "rounded-lg border px-3 py-2",
                  check.status === "error"
                    ? "border-red-500/20 bg-red-950/20"
                    : "border-amber-500/20 bg-amber-950/20",
                )}
              >
                <div className="flex items-start gap-2">
                  {statusIcon(check.status)}
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{check.title}</p>
                    <p className="text-muted-foreground">{check.detail}</p>
                    {check.fix ? (
                      <p className="text-xs leading-relaxed text-amber-200/90">
                        <span className="font-medium">Fix:</span> {check.fix}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void load()}
            className="border-amber-500/30 bg-transparent text-amber-100 hover:bg-amber-500/10"
          >
            Re-check status
          </Button>
        </div>
      </div>
    </div>
  );
}
