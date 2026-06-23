"use client";

import { cn } from "@/lib/utils";
import { APP_NAME, OFFICIAL_LOGO_PATH } from "@/lib/constants";

const sizeMap = {
  sm: 28,
  md: 36,
  lg: 44,
  xl: 52,
  "2xl": 64,
} as const;

type LogoSize = keyof typeof sizeMap;

const LOGO_WIDTH = 1536;
const LOGO_HEIGHT = 1024;

function LogoMark({ size }: { size: number }) {
  const width = Math.round(size * (LOGO_WIDTH / LOGO_HEIGHT));

  return (
    // Native img so the exact uploaded PNG is served without Next image optimization.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={OFFICIAL_LOGO_PATH}
      alt=""
      width={width}
      height={size}
      className="shrink-0 object-contain"
      style={{ width, height: size }}
      decoding="async"
    />
  );
}

function Wordmark({ size }: { size: LogoSize }) {
  return (
    <span
      className={cn(
        "select-none font-semibold leading-none tracking-[-0.045em]",
        size === "sm" && "text-[13px]",
        size === "md" && "text-[15px]",
        size === "lg" && "text-base",
        size === "xl" && "text-lg",
        size === "2xl" && "text-xl",
      )}
    >
      <span className="text-foreground">Bot</span>
      <span className="text-foreground/50">Flow</span>
    </span>
  );
}

interface BotFlowLogoProps {
  size?: LogoSize;
  showWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
}

export function BotFlowLogo({
  size = "md",
  showWordmark = true,
  className,
  wordmarkClassName,
}: BotFlowLogoProps) {
  const px = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)} aria-label={APP_NAME}>
      <LogoMark size={px} />
      {showWordmark && (
        <span className={wordmarkClassName}>
          <Wordmark size={size} />
        </span>
      )}
    </div>
  );
}

export function BotFlowLogoMark({
  size = "md",
  className,
}: {
  size?: LogoSize;
  className?: string;
}) {
  return <BotFlowLogo size={size} showWordmark={false} className={className} />;
}
