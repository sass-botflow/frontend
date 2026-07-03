"use client";

import { Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsAppOAuthConnectProps {
  loading?: boolean;
  className?: string;
}

export function WhatsAppOAuthConnect({ loading, className }: WhatsAppOAuthConnectProps) {
  function handleConnect() {
    window.location.href = "/auth/meta";
  }

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
            Connect in a few clicks with Meta
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Login with Facebook, select your business, and choose your WhatsApp
            number. No manual tokens.
          </p>
        </div>
      </div>

      <Button
        type="button"
        disabled={loading}
        onClick={handleConnect}
        className="h-11 w-full rounded-xl bg-[#25D366] font-semibold text-white hover:bg-[#1fb855] sm:w-auto sm:min-w-[240px]"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          "Connect WhatsApp Business"
        )}
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Secure connection via Meta. We never ask users to paste access tokens
        manually.
      </p>
    </div>
  );
}
