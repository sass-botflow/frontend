"use client";

import { Loader2 } from "lucide-react";
import { WhatsAppConnectionProgress } from "@/components/channels/whatsapp-connection-progress";
import { Button } from "@/components/ui/button";
import { useWhatsAppEmbeddedSignup } from "@/hooks/use-whatsapp-embedded-signup";
import { cn } from "@/lib/utils";

interface WhatsAppOAuthConnectProps {
  loading?: boolean;
  className?: string;
  onConnected?: () => void | Promise<void>;
  onError?: (message: string) => void;
}

export function WhatsAppOAuthConnect({
  loading: externalLoading,
  className,
  onConnected,
  onError,
}: WhatsAppOAuthConnectProps) {
  const { launchSignup, loading: signupLoading, phase, ready, configError } =
    useWhatsAppEmbeddedSignup({
      onSuccess: onConnected,
      onError,
    });

  const loading = externalLoading || signupLoading;
  const disabled = loading || !ready || Boolean(configError);
  const showProgress = phase !== "idle" && phase !== "error";

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-[#25D366]/30 bg-background/40 p-4 sm:p-5",
        className,
      )}
    >
      <div className="mb-5 space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Connect WhatsApp Business
        </p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Sign in with Facebook, choose your business, WhatsApp account, and
          phone number. Tokens stay encrypted on our servers — never in your
          browser.
        </p>
      </div>

      {showProgress ? (
        <WhatsAppConnectionProgress phase={phase} className="mb-4" />
      ) : null}

      <Button
        type="button"
        disabled={disabled}
        onClick={launchSignup}
        className="h-11 w-full rounded-xl bg-[#25D366] font-semibold text-white hover:bg-[#1fb855] sm:w-auto sm:min-w-[240px]"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : ready ? (
          "Connect WhatsApp Business"
        ) : (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading Meta...
          </>
        )}
      </Button>

      {configError ? (
        <p className="mt-4 text-xs leading-relaxed text-amber-300">{configError}</p>
      ) : !showProgress ? (
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          One workspace supports one WhatsApp Business connection.
        </p>
      ) : null}
    </div>
  );
}
