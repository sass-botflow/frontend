"use client";

import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";
import { useId } from "react";

const sizeMap = {
  sm: 28,
  md: 36,
  lg: 44,
  xl: 52,
  "2xl": 64,
} as const;

type LogoSize = keyof typeof sizeMap;

function LogoMark({ size }: { size: number }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `bf-grad-${uid}`;
  const shineId = `bf-shine-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <defs>
        <linearGradient id={gradId} x1="18" y1="102" x2="102" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4C1D95" />
          <stop offset="0.4" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#DDD6FE" />
        </linearGradient>
        <linearGradient id={shineId} x1="30" y1="24" x2="90" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M60 10 22 32v56l38 22 38-22V32L60 10Z" fill={`url(#${gradId})`} />
      <path d="M60 10 22 32v56l38 22 38-22V32L60 10Z" fill={`url(#${shineId})`} />
      <path
        d="M68 36c10 0 16 5.5 16 14 0 6-3 10.5-8 13 6 2.5 10 8 10 15 0 9.5-7.5 15.5-18 15.5H44V36h24Zm-1 25h11c5 0 7.5-2.5 7.5-6.5S83 48 78 48H67v13Zm0-33h10.5c4 0 6.5-2 6.5-5.5S81.5 36 77.5 36H67v12Z"
        className="fill-background"
      />
      <path
        d="M58 38 46 68h11l-9 20 24-32H61l8-18H58Z"
        fill="white"
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
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={px} />
      {showWordmark && (
        <span
          className={cn(
            "font-semibold tracking-tight text-foreground",
            size === "sm" && "text-sm",
            size === "md" && "text-base",
            size === "lg" && "text-lg",
            (size === "xl" || size === "2xl") && "text-xl",
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
