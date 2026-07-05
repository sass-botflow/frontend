"use client";

import { Loader2, QrCode, Smartphone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { WhatsAppSession } from "@/lib/whatsapp/types";
import { isWhatsAppSessionConnected } from "@/lib/whatsapp/types";

interface WhatsAppQrConnectModalProps {
  open: boolean;
  session: WhatsAppSession | null;
  qrDataUrl: string | null;
  qrLoading: boolean;
  connecting: boolean;
  connectionStatus: string;
  error: string | null;
  onClose: () => void;
  onRetry: () => void;
}

export function WhatsAppQrConnectModal({
  open,
  session,
  qrDataUrl,
  qrLoading,
  connecting,
  connectionStatus,
  error,
  onClose,
  onRetry,
}: WhatsAppQrConnectModalProps) {
  const connected = isWhatsAppSessionConnected(connectionStatus);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !connecting) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-md border-emerald-500/20 bg-card/95">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-[#25D366]" />
            Link WhatsApp
          </DialogTitle>
          <DialogDescription>
            Open WhatsApp on your phone →{" "}
            <strong>Settings → Linked devices → Link a device</strong>, then scan
            this QR code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {session ? (
            <div className="rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm">
              <p className="font-medium text-foreground">{session.profileName}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Instance: {session.instanceName}
              </p>
            </div>
          ) : null}

          <div className="flex min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-[#25D366]/30 bg-[#25D366]/5 p-4">
            {qrLoading ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-[#25D366]" />
                <p className="text-sm text-muted-foreground">Generating QR code…</p>
              </div>
            ) : qrDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrDataUrl}
                alt="WhatsApp QR code"
                className="h-64 w-64 rounded-xl bg-white p-3 shadow-lg"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-center">
                <QrCode className="h-10 w-10 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">
                  QR code is not available yet.
                </p>
              </div>
            )}
          </div>

          {connecting && !connected ? (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/20 bg-[#25D366]/10 px-4 py-3 text-sm text-[#25D366]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Waiting for scan… ({connectionStatus.toLowerCase()})
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void onRetry()}
                className="mt-3 w-full"
              >
                Try again
              </Button>
            </div>
          ) : null}

          <div className="flex items-start gap-3 rounded-xl border border-border/50 bg-background/40 px-4 py-3">
            <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              Keep this window open while scanning. The QR code refreshes
              automatically if it expires.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={connecting && !error}
            className={cn("w-full", connecting && !error && "opacity-60")}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
