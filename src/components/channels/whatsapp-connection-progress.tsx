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
        "rounded-lg border border-[#25D366]/20 bg-[#25D366]/[0.04] p-4",
        className,
      )}
    >
      <ul className="space-y-2.5">
        {PROGRESS_STEPS.map((step) => {
          const stepIndex = phaseIndex(step.phase);
          const isComplete =
            phase === "connected" ? true : stepIndex < currentIndex;
          const isActive = phase === step.phase;
          const isPending = !isComplete && !isActive;

          return (
            <li
              key={step.phase}
              className={cn(
                "flex items-center gap-2.5 text-sm transition-colors",
                isComplete && "text-emerald-400",
                isActive && "font-medium text-foreground",
                isPending && "text-muted-foreground/70",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                  isComplete && "border-emerald-500/40 bg-emerald-500/15",
                  isActive && "border-[#25D366]/50 bg-[#25D366]/10",
                  isPending && "border-border/60 bg-background/40",
                )}
              >
                {isComplete ? (
                  <Check className="h-3 w-3" />
                ) : isActive ? (
                  <Loader2 className="h-3 w-3 animate-spin text-[#25D366]" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                )}
              </span>
              {step.label}
            </li>
          );
        })}
        {phase === "connected" && (
          <li className="flex items-center gap-2.5 text-sm font-medium text-emerald-400">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/15">
              <Check className="h-3 w-3" />
            </span>
            {WHATSAPP_CONNECT_PHASE_LABELS.connected}
          </li>
        )}
      </ul>
    </div>
  );
}
