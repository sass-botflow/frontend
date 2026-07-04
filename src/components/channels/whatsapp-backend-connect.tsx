"use client";

import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { WhatsAppConnectionProgress } from "@/components/channels/whatsapp-connection-progress";
import { Button } from "@/components/ui/button";
import type { WhatsAppConnectPhase } from "@/lib/meta/whatsapp-types";
import { cn } from "@/lib/utils";

interface WhatsAppBackendConnectProps {
  phase: WhatsAppConnectPhase;
  loading: boolean;
  errorMessage: string | null;
  onConnect: () => void;
  onReset: () => void;
  className?: string;
}

export function WhatsAppBackendConnect({
  phase,
  loading,
  errorMessage,
  onConnect,
  onReset,
  className,
}: WhatsAppBackendConnectProps) {
  const isSuccess = phase === "connected";
  const isError = phase === "error";

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-[#25D366]/30 bg-background/40 p-4 sm:p-5",
        className,
      )}
    >
      <div className="mb-5 flex items-start gap-2">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            Connect WhatsApp Business
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Official Meta Embedded Signup — create your Business Manager, WABA,
            and phone number in one guided flow. Tokens are encrypted on our
            servers.
          </p>
        </div>
      </div>

      {isSuccess ? (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          WhatsApp connected successfully.
        </div>
      ) : null}

      {isError && errorMessage ? (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">
          {errorMessage}
        </div>
      ) : null}

      <WhatsAppConnectionProgress phase={phase} className="mb-4" />

      <Button
        type="button"
        disabled={loading || isSuccess}
        onClick={() => {
          if (isError) onReset();
          onConnect();
        }}
        className="h-11 w-full rounded-xl bg-[#25D366] font-semibold text-white hover:bg-[#1fb855] sm:w-auto sm:min-w-[260px]"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : isSuccess ? (
          "Connected"
        ) : isError ? (
          "Try again"
        ) : (
          "Connect WhatsApp Business"
        )}
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Each workspace only sees its own connected numbers. You can connect
        multiple WhatsApp Business lines.
      </p>
    </div>
  );
}
