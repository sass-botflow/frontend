"use client";

import { Loader2 } from "lucide-react";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { WhatsAppChannel } from "@/lib/whatsapp/evolution-types";

interface DisconnectWhatsAppDialogProps {
  channel: WhatsAppChannel | null;
  open: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (instanceId: string) => Promise<void>;
}

export function DisconnectWhatsAppDialog({
  channel,
  open,
  loading,
  onOpenChange,
  onConfirm,
}: DisconnectWhatsAppDialogProps) {
  if (!channel) return null;

  const label = channel.profileName ?? channel.phoneNumber ?? "this WhatsApp number";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <ChannelLogo channel="whatsapp" size="md" />
            <div className="text-left">
              <DialogTitle>Disconnect WhatsApp?</DialogTitle>
              <DialogDescription className="mt-1">
                BotFlow will stop replying on <strong>{label}</strong>.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="rounded-2xl border border-border/50 bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
          Delete Session? This removes the Evolution session and unlinks the
          device from your workspace.
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            className="rounded-xl"
            onClick={() => onConfirm(channel.instanceId)}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Disconnecting...
              </>
            ) : (
              "Disconnect"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
