"use client";

import { useState } from "react";
import {
  Building2,
  Check,
  Hash,
  Loader2,
  Phone,
  RefreshCw,
  ShieldCheck,
  Unlink,
} from "lucide-react";
import { WhatsAppConnectionProgress } from "@/components/channels/whatsapp-connection-progress";
import { Button } from "@/components/ui/button";
import { useWhatsAppEmbeddedSignup } from "@/hooks/use-whatsapp-embedded-signup";
import { formatPhoneVerificationStatus } from "@/lib/meta/whatsapp-types";
import type { WhatsAppConnectionDetails } from "@/lib/integrations/types";
import { cn } from "@/lib/utils";

interface WhatsAppConnectedViewProps {
  details: WhatsAppConnectionDetails;
  loading?: boolean;
  onDisconnect: () => void;
  onReconnected?: () => void | Promise<void>;
  onRefreshed?: () => void | Promise<void>;
  onError?: (message: string) => void;
}

export function WhatsAppConnectedView({
  details,
  loading: externalLoading,
  onDisconnect,
  onReconnected,
  onRefreshed,
  onError,
}: WhatsAppConnectedViewProps) {
  const [refreshing, setRefreshing] = useState(false);
  const { launchSignup, loading: signupLoading, phase, ready } = useWhatsAppEmbeddedSignup({
    onSuccess: onReconnected,
    onError,
  });

  const loading = externalLoading || signupLoading || refreshing;
  const showProgress = phase !== "idle" && phase !== "error";
  const statusLabel = formatPhoneVerificationStatus(details.phoneStatus);
  const isVerified = statusLabel === "Verified";

  async function handleRefresh() {
    setRefreshing(true);
    try {
      const response = await fetch("/api/integrations/whatsapp/refresh", {
        method: "POST",
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(body.error ?? "Failed to refresh WhatsApp connection.");
      }
      await onRefreshed?.();
    } catch (err) {
      onError?.(
        err instanceof Error ? err.message : "Failed to refresh WhatsApp connection.",
      );
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-emerald-400">
        <Check className="h-4 w-4" />
        Connected
      </div>

      {showProgress ? (
        <WhatsAppConnectionProgress phase={phase} className="mb-4" />
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        <DetailTile
          icon={Building2}
          label="Business Name"
          value={details.businessName ?? "—"}
        />
        <DetailTile
          icon={Phone}
          label="Phone Number"
          value={details.phoneNumber ?? "—"}
        />
        <DetailTile
          icon={Hash}
          label="Phone Number ID"
          value={details.phoneNumberId ?? "—"}
          mono
        />
        <DetailTile
          icon={ShieldCheck}
          label="Status"
          value={statusLabel}
          valueClassName={isVerified ? "text-emerald-400" : "text-amber-300"}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button
          type="button"
          variant="outline"
          disabled={loading || !ready}
          onClick={launchSignup}
          className="h-10 rounded-xl"
        >
          {signupLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Reconnect
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => void handleRefresh()}
          className="h-10 rounded-xl"
        >
          {refreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={onDisconnect}
          className="h-10 rounded-xl border-border/70 hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
        >
          <Unlink className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    </div>
  );
}

function DetailTile({
  icon: Icon,
  label,
  value,
  mono,
  valueClassName,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
  mono?: boolean;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/40 p-3">
      <Icon className="mt-0.5 h-4 w-4 text-primary" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className={cn("truncate font-medium", mono && "font-mono text-sm", valueClassName)}>
          {value}
        </p>
      </div>
    </div>
  );
}
