"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type AppBannerVariant = "success" | "error" | "info";

interface AppBannerProps {
  message: string | null;
  variant?: AppBannerVariant;
  onDismiss?: () => void;
  autoDismissMs?: number;
  className?: string;
}

export function AppBanner({
  message,
  variant = "info",
  onDismiss,
  autoDismissMs = 6000,
  className,
}: AppBannerProps) {
  const [visible, setVisible] = useState(Boolean(message));

  useEffect(() => {
    setVisible(Boolean(message));
    if (!message || !autoDismissMs) return;

    const timer = window.setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, autoDismissMs);

    return () => window.clearTimeout(timer);
  }, [message, autoDismissMs, onDismiss]);

  if (!message || !visible) return null;

  const Icon = variant === "success" ? CheckCircle2 : AlertCircle;

  return (
    <div
      role="status"
      className={cn(
        "mb-6 flex items-start gap-3 rounded-xl px-4 py-3 text-sm",
        variant === "success" &&
          "border border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
        variant === "error" &&
          "border border-red-500/30 bg-red-500/10 text-red-200",
        variant === "info" &&
          "border border-amber-500/30 bg-amber-500/10 text-amber-200",
        className,
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="flex-1 leading-relaxed">{message}</p>
      {onDismiss ? (
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            onDismiss();
          }}
          className="shrink-0 rounded-md p-0.5 opacity-70 transition-opacity hover:opacity-100"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
