"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsAppBackendConnectProps {
  onConnect: () => void;
  loading?: boolean;
  className?: string;
}

export function WhatsAppBackendConnect({
  onConnect,
  loading,
  className,
}: WhatsAppBackendConnectProps) {
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
          Sign in with Facebook, choose your Business Manager, WhatsApp account,
          and phone number. Tokens are encrypted on our servers — never entered
          manually.
        </p>
      </div>

      <Button
        type="button"
        disabled={loading}
        onClick={onConnect}
        className="h-11 w-full rounded-xl bg-[#25D366] font-semibold text-white hover:bg-[#1fb855] sm:w-auto sm:min-w-[260px]"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Redirecting to Meta...
          </>
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
