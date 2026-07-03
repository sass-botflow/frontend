"use client";

import { Building2, Loader2, Phone, RefreshCw, Unlink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WhatsAppConnectionDetails } from "@/lib/integrations/types";

interface WhatsAppConnectedViewProps {
  details: WhatsAppConnectionDetails;
  loading?: boolean;
  onDisconnect: () => void;
}

export function WhatsAppConnectedView({
  details,
  loading,
  onDisconnect,
}: WhatsAppConnectedViewProps) {
  function handleReconnect() {
    window.location.href = "/auth/meta?reconnect=1";
  }

  return (
    <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-emerald-400">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        Connected
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/40 p-3">
          <Building2 className="mt-0.5 h-4 w-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Business</p>
            <p className="font-medium">{details.businessName ?? "—"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/40 p-3">
          <Phone className="mt-0.5 h-4 w-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="font-medium">{details.phoneNumber ?? "—"}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={handleReconnect}
          className="h-10 rounded-xl"
        >
          {loading ? (
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
