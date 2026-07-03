"use client";

import { Loader2, Phone } from "lucide-react";
import { ChannelStatusBadge } from "@/components/channels/channel-status-badge";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { Button } from "@/components/ui/button";
import { useChannels } from "@/hooks/use-channels";
import type { BackendChannel } from "@/lib/backend/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface WorkflowChannelPickerProps {
  value: string | null;
  onChange: (channelId: string) => void;
  className?: string;
}

export function WorkflowChannelPicker({
  value,
  onChange,
  className,
}: WorkflowChannelPickerProps) {
  const { whatsappChannels, loading, error } = useChannels();

  if (loading) {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading connected channels...
      </div>
    );
  }

  if (whatsappChannels.length === 0) {
    return (
      <div
        className={cn(
          "rounded-xl border border-dashed border-border/60 bg-muted/20 p-4",
          className,
        )}
      >
        <p className="text-sm text-muted-foreground">
          No WhatsApp channel connected yet. Connect one to route inbound
          messages to this workflow.
        </p>
        <Button asChild size="sm" className="mt-3">
          <Link href="/dashboard/channels">Connect WhatsApp</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {error ? (
        <p className="text-sm text-amber-400">{error}</p>
      ) : null}
      <p className="text-sm text-muted-foreground">
        Choose which WhatsApp number handles conversations for this workflow.
      </p>
      <div className="space-y-2">
        {whatsappChannels.map((channel) => (
          <ChannelOption
            key={channel.id}
            channel={channel}
            selected={value === channel.id}
            onSelect={() => onChange(channel.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ChannelOption({
  channel,
  selected,
  onSelect,
}: {
  channel: BackendChannel;
  selected: boolean;
  onSelect: () => void;
}) {
  const label = channel.businessName ?? "WhatsApp Business";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all",
        selected
          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
          : "border-border/60 hover:border-primary/40 hover:bg-muted/30",
      )}
    >
      <ChannelLogo channel="whatsapp" size="md" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium">{label}</p>
          <ChannelStatusBadge status={channel.status} showEmoji={false} />
        </div>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Phone className="h-3.5 w-3.5" />
          {channel.displayPhoneNumber}
        </p>
      </div>
    </button>
  );
}

interface WorkflowChannelSummaryProps {
  channelId: string | null;
  className?: string;
}

export function WorkflowChannelSummary({
  channelId,
  className,
}: WorkflowChannelSummaryProps) {
  const { whatsappChannels, loading } = useChannels();
  const channel = whatsappChannels.find((c) => c.id === channelId);

  if (loading) {
    return <p className={cn("text-sm text-muted-foreground", className)}>Loading channel...</p>;
  }

  if (!channel) {
    return (
      <p className={cn("text-sm text-muted-foreground", className)}>
        No WhatsApp channel selected.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-4",
        className,
      )}
    >
      <ChannelLogo channel="whatsapp" size="sm" />
      <div>
        <p className="text-sm font-medium">
          {channel.businessName ?? "WhatsApp Business"}
        </p>
        <p className="text-xs text-muted-foreground">{channel.displayPhoneNumber}</p>
      </div>
      <ChannelStatusBadge status={channel.status} className="ml-auto" />
    </div>
  );
}
