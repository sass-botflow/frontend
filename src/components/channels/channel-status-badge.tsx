"use client";

import {
  formatChannelStatusLabel,
  mapChannelUiStatus,
  type ChannelUiStatus,
} from "@/lib/backend/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<
  ChannelUiStatus,
  { dot: string; badge: string; emoji: string }
> = {
  connected: {
    dot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    badge: "bg-emerald-500/15 text-emerald-500 ring-emerald-500/25",
    emoji: "🟢",
  },
  refresh_required: {
    dot: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
    badge: "bg-amber-500/15 text-amber-500 ring-amber-500/25",
    emoji: "🟡",
  },
  disconnected: {
    dot: "bg-red-400 shadow-[0_0_8px_#f87171]",
    badge: "bg-red-500/15 text-red-500 ring-red-500/25",
    emoji: "🔴",
  },
};

interface ChannelStatusBadgeProps {
  status: string;
  showEmoji?: boolean;
  className?: string;
}

export function ChannelStatusBadge({
  status,
  showEmoji = true,
  className,
}: ChannelStatusBadgeProps) {
  const uiStatus = mapChannelUiStatus(status);
  const styles = STATUS_STYLES[uiStatus];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1",
        styles.badge,
        className,
      )}
    >
      {showEmoji ? (
        <span aria-hidden>{styles.emoji}</span>
      ) : (
        <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
      )}
      {formatChannelStatusLabel(uiStatus)}
    </span>
  );
}
