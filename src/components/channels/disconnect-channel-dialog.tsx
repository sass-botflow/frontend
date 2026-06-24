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
import type { IntegrationPlatform, IntegrationRecord } from "@/lib/integrations/types";

const PLATFORM_TITLES: Record<IntegrationPlatform, string> = {
  whatsapp: "WhatsApp Business",
  instagram: "Instagram Business",
  tiktok: "TikTok Business",
};

interface DisconnectChannelDialogProps {
  integration: IntegrationRecord | null;
  open: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (platform: IntegrationPlatform) => Promise<void>;
}

export function DisconnectChannelDialog({
  integration,
  open,
  loading,
  onOpenChange,
  onConfirm,
}: DisconnectChannelDialogProps) {
  if (!integration) return null;

  const platform = integration.platform;
  const account = integration.displayName ?? "this account";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <ChannelLogo channel={platform} size="md" />
            <div>
              <DialogTitle>Disconnect {PLATFORM_TITLES[platform]}?</DialogTitle>
              <DialogDescription className="mt-1 text-left">
                BotFlow will stop replying on <strong>{account}</strong>. Your
                credentials will be removed from this workspace.
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
            onClick={() => onConfirm(platform)}
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
