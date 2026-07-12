"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type {
  ChannelConnectAccent,
  ChannelConnectCardConfig,
  ChannelConnectFeature,
} from "@/lib/channels/connect-themes";
import { cn } from "@/lib/utils";

function resolveAppOrigin(): string {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "https://www.botflow.ink";
  }

  const { hostname, origin } = window.location;
  if (hostname === "botflow.ink") {
    return "https://www.botflow.ink";
  }

  return origin;
}

interface ChannelConnectCardProps {
  config: ChannelConnectCardConfig;
  onConnect?: () => void;
  loading?: boolean;
  className?: string;
}

export function ChannelConnectCard({
  config,
  onConnect,
  loading = false,
  className,
}: ChannelConnectCardProps) {
  const {
    title,
    subtitle,
    features,
    buttonLabel,
    buttonLoadingLabel = "Connecting...",
    footerText,
    accent,
    headerIcon,
    buttonIcon,
    connectHref,
  } = config;

  const handleConnect = () => {
    if (connectHref) {
      const target = connectHref.startsWith("http")
        ? connectHref
        : `${resolveAppOrigin()}${connectHref}`;
      window.location.href = target;
      return;
    }
    onConnect?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-8 shadow-xl shadow-black/5 backdrop-blur-xl sm:p-10",
        className,
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0", accent.radialGradient)} />
      <div
        className={cn(
          "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl",
          accent.blurOrb,
        )}
      />

      <div className="relative mx-auto max-w-2xl space-y-8 text-center">
        <div
          className={cn(
            "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ring-1",
            accent.headerIconBg,
            accent.headerIconRing,
            accent.headerIconColor,
          )}
        >
          {headerIcon}
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-3 text-left sm:grid-cols-3">
          {features.map((feature) => (
            <FeaturePill key={feature.title} feature={feature} accent={accent} />
          ))}
        </div>

        <div className="space-y-4">
          <Button
            type="button"
            disabled={loading}
            onClick={handleConnect}
            className={cn(
              "h-14 w-full max-w-md rounded-2xl px-8 text-lg font-semibold",
              accent.buttonClassName,
            )}
          >
            {buttonIcon ? <span className="mr-2 inline-flex">{buttonIcon}</span> : null}
            {loading ? buttonLoadingLabel : buttonLabel}
          </Button>
          <p className="text-sm text-muted-foreground">{footerText}</p>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturePill({
  feature,
  accent,
}: {
  feature: ChannelConnectFeature;
  accent: ChannelConnectAccent;
}) {
  const Icon = feature.icon;

  return (
    <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
      <div
        className={cn(
          "mb-3 flex h-10 w-10 items-center justify-center rounded-xl",
          accent.featureIconBg,
        )}
      >
        {feature.emoji ? (
          <span className="text-lg leading-none" aria-hidden>
            {feature.emoji}
          </span>
        ) : Icon ? (
          <Icon className={cn("h-5 w-5", accent.featureIconColor)} />
        ) : null}
      </div>
      <p className="text-sm font-semibold">{feature.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.text}</p>
    </div>
  );
}
