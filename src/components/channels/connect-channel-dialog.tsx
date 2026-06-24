"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CHANNEL_MAP } from "@/lib/channels";
import {
  CONNECT_FIELDS,
  validateConnectCredentials,
  type ConnectCredentialsInput,
} from "@/lib/integrations/connect-credentials";
import type { IntegrationPlatform } from "@/lib/integrations/types";

const PLATFORM_TITLES: Record<IntegrationPlatform, string> = {
  whatsapp: "WhatsApp Business",
  instagram: "Instagram Business",
  tiktok: "TikTok Business",
};

interface ConnectChannelDialogProps {
  platform: IntegrationPlatform | null;
  open: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (credentials: ConnectCredentialsInput) => Promise<void>;
}

export function ConnectChannelDialog({
  platform,
  open,
  loading,
  onOpenChange,
  onSubmit,
}: ConnectChannelDialogProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  if (!platform) return null;

  const fields = CONNECT_FIELDS[platform];
  const channel = CHANNEL_MAP[platform];

  function handleClose(nextOpen: boolean) {
    if (!nextOpen) {
      setValues({});
      setError(null);
    }
    onOpenChange(nextOpen);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!platform) return;
    setError(null);

    try {
      const credentials = validateConnectCredentials({ platform, ...values });
      await onSubmit(credentials);
      setValues({});
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <ChannelLogo channel={platform} size="md" />
            <div>
              <DialogTitle>Connect {PLATFORM_TITLES[platform]}</DialogTitle>
              <DialogDescription className="mt-1 text-left">
                {channel.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type={field.type ?? "text"}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                }
                required
                className="h-11"
                autoComplete="off"
              />
              {field.hint && (
                <p className="text-xs text-muted-foreground">{field.hint}</p>
              )}
            </div>
          ))}

          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="min-w-[140px]">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Save & connect"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
