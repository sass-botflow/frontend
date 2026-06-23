import Image from "next/image";
import { cn } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
  "2xl": 72,
} as const;

type LogoSize = keyof typeof sizeMap;

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
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-[22%] ring-1 ring-white/10 shadow-lg shadow-violet-500/20",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-60",
        )}
        style={{ width: px, height: px }}
      >
        <Image
          src="/logo.svg"
          alt={`${APP_NAME} logo`}
          width={px}
          height={px}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      {showWordmark && (
        <span
          className={cn(
            "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text font-semibold tracking-tight text-transparent",
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
