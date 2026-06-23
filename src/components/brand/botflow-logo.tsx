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
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <defs>
        <linearGradient id={gradId} x1="6" y1="28" x2="26" y2="4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B21B6" />
          <stop offset="0.5" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#C4B5FD" />
        </linearGradient>
      </defs>
      <path
        d="M16 3.5 25.5 9v14L16 28.5 6.5 23V9L16 3.5Z"
        stroke={`url(#${gradId})`}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M17.2 9.5 12.5 17.5H16l-2.2 6.5L21 13.5h-3.3L17.2 9.5Z"
        fill={`url(#${gradId})`}
      />
    </svg>
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
    <div className={cn("flex items-center gap-3", className)}>
      <LogoMark size={px} />
      {showWordmark && (
        <span
          className={cn(
            "font-medium tracking-[-0.03em] text-foreground",
            size === "sm" && "text-[13px]",
            size === "md" && "text-[15px]",
            size === "lg" && "text-base",
            size === "xl" && "text-lg",
            size === "2xl" && "text-xl",
            wordmarkClassName,
          )}
        >
          {APP_NAME}
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
