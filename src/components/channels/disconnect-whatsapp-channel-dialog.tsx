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
import type { BackendChannel } from "@/lib/backend/types";

interface DisconnectWhatsAppChannelDialogProps {
  channel: BackendChannel | null;
  open: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (channelId: string) => Promise<void>;
}

export function DisconnectWhatsAppChannelDialog({
  channel,
  open,
  loading,
  onOpenChange,
  onConfirm,
}: DisconnectWhatsAppChannelDialogProps) {
  if (!channel) return null;

  const label =
    channel.businessName ?? channel.displayPhoneNumber ?? "this WhatsApp number";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <ChannelLogo channel="whatsapp" size="md" />
            <div>
              <DialogTitle>Disconnect WhatsApp?</DialogTitle>
              <DialogDescription className="mt-1 text-left">
                BotFlow will stop replying on <strong>{label}</strong>. The
                encrypted token will be removed from this workspace.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            onClick={() => onConfirm(channel.id)}
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
