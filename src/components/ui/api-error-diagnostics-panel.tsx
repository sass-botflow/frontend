"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ApiError,
  isDevEnvironment,
  toApiError,
} from "@/lib/api/api-error";
import type { SetupCheck } from "@/lib/setup/status";
import { cn } from "@/lib/utils";

interface ApiErrorDiagnosticsPanelProps {
  error: unknown;
  onRetry?: () => void;
  className?: string;
}

function getLikelyFixes(category: string, blockers: SetupCheck[]): string[] {
  const fixes = blockers
    .filter((check) => check.status !== "ok" && check.fix)
    .map((check) => check.fix as string);

  if (fixes.length > 0) {
    return [...new Set(fixes)];
  }

  if (category === "cloudflare_gateway" || category === "gateway_error") {
    return [
      "Redeploy the backend from sass-botflow/backend (main) in EasyPanel.",
      "Deploy Evolution API (deploy/evolution-api/docker-compose.yml) in the same project.",
      "Set NEXT_PUBLIC_API_URL=https://api.botflow.ink on the frontend and redeploy.",
    ];
  }

  if (category === "evolution_unreachable") {
    return [
      "Deploy Evolution API and set EVOLUTION_API_URL=http://evolution-api:8080 on the backend.",
    ];
  }

  return [];
}

export function ApiErrorDiagnosticsPanel({
  error,
  onRetry,
  className,
}: ApiErrorDiagnosticsPanelProps) {
  const [blockers, setBlockers] = useState<SetupCheck[]>([]);

  useEffect(() => {
    let cancelled = false;

    void fetch("/api/setup-status", { cache: "no-store" })
      .then((response) => response.json())
      .then((body: { checks?: SetupCheck[] }) => {
        if (cancelled) return;
        setBlockers((body.checks ?? []).filter((check) => check.status !== "ok"));
      })
      .catch(() => {
        if (!cancelled) setBlockers([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!error) return null;

  const apiError = toApiError(error);
  const { userTitle, userMessage, httpStatus, requestUrl, requestId, backendUrl, category } =
    apiError.details;
  const showDevDetails = isDevEnvironment();
  const likelyFixes = getLikelyFixes(category, blockers);

  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="flex-1 space-y-1">
          <p className="font-semibold text-red-100">{userTitle}</p>
          <p className="leading-relaxed text-red-200/90">{userMessage}</p>

          {likelyFixes.length > 0 ? (
            <div className="mt-3 rounded-lg border border-red-500/20 bg-red-950/20 p-3 text-xs text-red-100/90">
              <p className="font-medium text-red-100">What to fix on the server</p>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                {likelyFixes.map((fix) => (
                  <li key={fix}>{fix}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {showDevDetails ? (
            <details className="mt-3 rounded-lg border border-red-500/20 bg-red-950/20 p-3 text-xs text-red-100/80">
              <summary className="cursor-pointer font-medium text-red-100">
                Diagnostics (development)
              </summary>
              <dl className="mt-3 space-y-2">
                <div>
                  <dt className="font-medium text-red-100">Category</dt>
                  <dd className="font-mono">{category}</dd>
                </div>
                <div>
                  <dt className="font-medium text-red-100">HTTP status</dt>
                  <dd className="font-mono">{httpStatus}</dd>
                </div>
                {requestUrl ? (
                  <div>
                    <dt className="font-medium text-red-100">Request URL</dt>
                    <dd className="break-all font-mono">{requestUrl}</dd>
                  </div>
                ) : null}
                {backendUrl ? (
                  <div>
                    <dt className="font-medium text-red-100">Backend URL</dt>
                    <dd className="break-all font-mono">{backendUrl}</dd>
                  </div>
                ) : null}
                {requestId ? (
                  <div>
                    <dt className="font-medium text-red-100">Request ID</dt>
                    <dd className="font-mono">{requestId}</dd>
                  </div>
                ) : null}
              </dl>
            </details>
          ) : null}
        </div>
      </div>

      {onRetry ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => void onRetry()}
          className="mt-3 w-full border-red-500/30 bg-transparent text-red-100 hover:bg-red-500/10"
        >
          Try again
        </Button>
      ) : null}
    </div>
  );
}

export function getApiErrorForDisplay(error: unknown): ApiError {
  return toApiError(error);
}
