"use client";

import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { useId } from "react";

const sizeMap = {
  sm: 22,
  md: 28,
  lg: 32,
  xl: 40,
  "2xl": 52,
} as const;

type LogoSize = keyof typeof sizeMap;

function LogoMark({ size }: { size: number }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `bf-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <defs>
        <linearGradient id={gradId} x1="5" y1="21" x2="19" y2="3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6D28D9" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path
        d="M13.2 2.75 8.25 12.1h3.45l-1.65 5.9 7.2-10.85h-3.35L13.2 2.75Z"
        fill={`url(#${gradId})`}
      />
    </svg>
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
    <div className={cn("flex items-center gap-2.5", className)}>
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
