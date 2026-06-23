import { cn } from "@/lib/utils";
import { CHANNEL_MAP, type ChannelId } from "@/lib/channels";
import { ChannelLogo } from "./channel-logo";

interface ChannelBadgeProps {
  channel: ChannelId;
  showDot?: boolean;
  showLogo?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function ChannelBadge({
  channel,
  showDot = true,
  showLogo = false,
  size = "sm",
  className,
}: ChannelBadgeProps) {
  const meta = CHANNEL_MAP[channel];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 font-medium",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        className,
      )}
    >
      {showLogo && <ChannelLogo channel={channel} size="sm" className="!h-5 !w-5 rounded-md" />}
      {showDot && !showLogo && (
        <span
          className={cn("h-2 w-2 shrink-0 rounded-full", meta.dotColor)}
          aria-hidden
        />
      )}
      {meta.name}
    </span>
  );
}

export function ChannelDotLabel({ channel }: { channel: ChannelId }) {
  return (
    <span className="text-xs font-medium text-muted-foreground">
      {CHANNEL_MAP[channel].dotLabel}
    </span>
  );
}
