"use client";

import { Loader2, ShieldCheck } from "lucide-react";
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
  const { launchSignup, loading: signupLoading, ready, configError } =
    useWhatsAppEmbeddedSignup({
      onSuccess: onConnected,
      onError,
    });

  const loading = externalLoading || signupLoading;
  const disabled = loading || !ready || Boolean(configError);

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
            Set up WhatsApp with Meta Embedded Signup
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Create your business portfolio, WhatsApp Business account, and phone
            number in one guided flow. No manual tokens or pre-existing Meta
            Business account required.
          </p>
        </div>
      </div>

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
      ) : (
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Secure connection via Meta. BotFlow stores your access token encrypted
          and never exposes it in the browser.
        </p>
      )}
    </div>
  );
}
