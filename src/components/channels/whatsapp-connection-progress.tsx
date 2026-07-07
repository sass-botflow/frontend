"use client";

import { Check, Loader2 } from "lucide-react";
import {
  WHATSAPP_CONNECT_PHASE_LABELS,
  type WhatsAppConnectPhase,
} from "@/lib/meta/whatsapp-types";
import { cn } from "@/lib/utils";

const PROGRESS_STEPS: Array<{
  phase: Exclude<WhatsAppConnectPhase, "idle" | "error" | "connected">;
  label: string;
}> = [
  { phase: "connecting", label: WHATSAPP_CONNECT_PHASE_LABELS.connecting },
  {
    phase: "retrieving_business",
    label: WHATSAPP_CONNECT_PHASE_LABELS.retrieving_business,
  },
  {
    phase: "retrieving_phone",
    label: WHATSAPP_CONNECT_PHASE_LABELS.retrieving_phone,
  },
  { phase: "saving", label: WHATSAPP_CONNECT_PHASE_LABELS.saving },
];

const PHASE_ORDER: WhatsAppConnectPhase[] = [
  "connecting",
  "retrieving_business",
  "retrieving_phone",
  "saving",
  "connected",
];

function phaseIndex(phase: WhatsAppConnectPhase) {
  return PHASE_ORDER.indexOf(phase);
}

interface WhatsAppConnectionProgressProps {
  phase: WhatsAppConnectPhase;
  className?: string;
}

export function WhatsAppConnectionProgress({
  phase,
  className,
}: WhatsAppConnectionProgressProps) {
  if (phase === "idle" || phase === "error") return null;

  const currentIndex = phaseIndex(phase);

  return (
    <div
      className={cn(
        "border border-[#25D366]/15 bg-[#25D366]/[0.03] p-5",
        className,
      )}
    >
      <ul className="space-y-0">
        {PROGRESS_STEPS.map((step, index) => {
          const stepIndex = phaseIndex(step.phase);
          const isComplete =
            phase === "connected" ? true : stepIndex < currentIndex;
          const isActive = phase === step.phase;
          const isPending = !isComplete && !isActive;
          const isLast = index === PROGRESS_STEPS.length - 1;

          return (
            <li key={step.phase} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-[11px] top-6 h-[calc(100%-12px)] w-px",
                    isComplete ? "bg-emerald-500/40" : "bg-border/60",
                  )}
                />
              ) : null}

              <span
                className={cn(
                  "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isComplete && "border-emerald-500/40 bg-emerald-500/15",
                  isActive && "border-[#25D366]/50 bg-[#25D366]/10",
                  isPending && "border-border/60 bg-background/60",
                )}
              >
                {isComplete ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : isActive ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[#25D366]" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                )}
              </span>

              <div className="min-w-0 pt-0.5">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isComplete && "text-emerald-400",
                    isActive && "text-foreground",
                    isPending && "text-muted-foreground/70",
                  )}
                >
                  {step.label}
                </p>
                {isActive ? (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    This usually takes a few seconds
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}

        {phase === "connected" ? (
          <li className="relative flex gap-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15">
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            </span>
            <p className="pt-0.5 text-sm font-medium text-emerald-400">
              {WHATSAPP_CONNECT_PHASE_LABELS.connected}
            </p>
          </li>
        ) : null}
      </ul>
    </div>
  );
}
