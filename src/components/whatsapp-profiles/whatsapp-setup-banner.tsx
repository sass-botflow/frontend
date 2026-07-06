"use client";

import { AlertTriangle, CheckCircle2, Copy, Loader2, Wrench } from "lucide-react";
import type { SetupCheck } from "@/lib/setup/status";
import { Button } from "@/components/ui/button";
import { useSetupStatus } from "@/hooks/use-setup-status";
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

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    // ignore
  }
}

export function WhatsAppSetupBanner() {
  const { report, loading, ready, blockers, refresh } = useSetupStatus();

  if (loading) {
    return (
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-border/60 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Kanchouf infrastructure dial WhatsApp…
      </div>
    );
  }

  if (!report || ready) {
    return null;
  }

  const evolutionKeyHint = "openssl rand -hex 32";
  const evolutionEnv = `SERVER_URL=https://evolution.api.botflow.ink
AUTHENTICATION_API_KEY=<paste-key-here>
DATABASE_CONNECTION_URI=postgresql://botflow:botflow@sass-botflow_postgres:5432/evolution?schema=evolution_api`;

  const backendEnv = `EVOLUTION_API_URL=http://evolution-api:8080
EVOLUTION_API_KEY=<same-as-evolution-AUTHENTICATION_API_KEY>`;

  return (
    <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-4 text-sm">
      <div className="flex items-start gap-3">
        <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
        <div className="flex-1 space-y-3">
          <div>
            <p className="font-semibold text-amber-100">
              WhatsApp ma ghadi ykhdem hta t deployi 3 services
            </p>
            <p className="mt-1 text-amber-200/80">
              L&apos;app kheddama, walakin khass admin idir deploy f EasyPanel (
              <a
                href="http://187.124.12.89:3000"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                187.124.12.89:3000
              </a>
              ). Men ba3d deploy, QR linking ghadi ykhdem b7al Qunvert.
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

          <details className="rounded-lg border border-amber-500/20 bg-amber-950/20 p-3 text-xs text-amber-100/90">
            <summary className="cursor-pointer font-medium text-amber-100">
              Copy-paste env vars (admin)
            </summary>
            <div className="mt-3 space-y-3">
              <p>1. Generate key: <code className="rounded bg-black/30 px-1">{evolutionKeyHint}</code></p>
              <div>
                <p className="mb-1 font-medium">Evolution Compose env:</p>
                <pre className="overflow-x-auto rounded bg-black/30 p-2 text-[11px] leading-relaxed">
                  {evolutionEnv}
                </pre>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-1 h-7 text-amber-100"
                  onClick={() => void copyText(evolutionEnv)}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy
                </Button>
              </div>
              <div>
                <p className="mb-1 font-medium">Backend env (after Evolution deploy):</p>
                <pre className="overflow-x-auto rounded bg-black/30 p-2 text-[11px] leading-relaxed">
                  {backendEnv}
                </pre>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-1 h-7 text-amber-100"
                  onClick={() => void copyText(backendEnv)}
                >
                  <Copy className="mr-1 h-3 w-3" />
                  Copy
                </Button>
              </div>
            </div>
          </details>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void refresh()}
            className="border-amber-500/30 bg-transparent text-amber-100 hover:bg-amber-500/10"
          >
            Re-check status
          </Button>
        </div>
      </div>
    </div>
  );
}
