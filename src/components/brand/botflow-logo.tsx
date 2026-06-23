"use client";

import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { useId } from "react";

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 36,
  xl: 44,
  "2xl": 56,
} as const;

type LogoSize = keyof typeof sizeMap;

function LogoMark({ size }: { size: number }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `bf-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <defs>
        <linearGradient id={gradId} x1="12" y1="88" x2="88" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4338CA" />
          <stop offset="0.45" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>
      <path d="M50 6 10 28v44l40 22 40-22V28L50 6Z" fill={`url(#${gradId})`} />
      <path
        d="M58 30c9.5 0 15 5.2 15 12.8 0 5.5-3.2 9.8-8.5 11.8 6.2 2 10 7.2 10 14.2 0 9-7.5 14.2-18 14.2H36V30h22Zm-2 0H40v16h7.5c5.2 0 8-2.8 8-6.8s-2.8-6.8-8-6.8Zm0 23H40v16h8.5c5.8 0 9.5-2.8 9.5-7.5s-3.7-7.5-9.5-7.5Z"
        className="fill-background"
      />
      <path d="M54 30 43 52h7.5L46 70l20-30h-7.5L54 30Z" fill="white" />
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
