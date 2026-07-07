"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { WhatsAppConnectionProgress } from "@/components/channels/whatsapp-connection-progress";
import { Button } from "@/components/ui/button";
import type { WhatsAppConnectPhase } from "@/lib/meta/whatsapp-types";
import { cn } from "@/lib/utils";

type WizardStep = "welcome" | "connecting" | "complete";

const WIZARD_STEPS: Array<{ id: WizardStep; label: string; description: string }> =
  [
    {
      id: "welcome",
      label: "Welcome",
      description: "Get started",
    },
    {
      id: "connecting",
      label: "Connect",
      description: "Meta signup",
    },
    {
      id: "complete",
      label: "Complete",
      description: "Ready to go",
    },
  ];

function resolveWizardStep(
  phase: WhatsAppConnectPhase,
  loading: boolean,
): WizardStep {
  if (phase === "connected") return "complete";
  if (loading || (phase !== "idle" && phase !== "error")) return "connecting";
  return "welcome";
}

interface WhatsAppOnboardingWizardProps {
  phase: WhatsAppConnectPhase;
  loading: boolean;
  errorMessage: string | null;
  onConnect: () => void;
  onReset: () => void;
  className?: string;
}

export function WhatsAppOnboardingWizard({
  phase,
  loading,
  errorMessage,
  onConnect,
  onReset,
  className,
}: WhatsAppOnboardingWizardProps) {
  const currentStep = resolveWizardStep(phase, loading);
  const isError = phase === "error";

  function handlePrimaryAction() {
    if (isError) onReset();
    onConnect();
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 shadow-2xl shadow-black/5 backdrop-blur-xl",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(37,211,102,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative grid lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-border/50 bg-muted/20 px-6 py-8 lg:border-b-0 lg:border-r">
          <div className="mb-8 flex items-center gap-3">
            <ChannelLogo channel="whatsapp" size="md" />
            <div>
              <p className="text-sm font-semibold tracking-tight">
                WhatsApp Business
              </p>
              <p className="text-xs text-muted-foreground">Official Meta API</p>
            </div>
          </div>

          <nav aria-label="Onboarding progress" className="space-y-1">
            {WIZARD_STEPS.map((step, index) => {
              const stepIndex = WIZARD_STEPS.findIndex((s) => s.id === currentStep);
              const thisIndex = index;
              const isActive = step.id === currentStep;
              const isDone = thisIndex < stepIndex;

              return (
                <div key={step.id} className="flex items-start gap-3 py-2">
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                      isDone &&
                        "border-emerald-500/40 bg-emerald-500/15 text-emerald-400",
                      isActive &&
                        "border-[#25D366]/50 bg-[#25D366]/10 text-[#25D366]",
                      !isDone &&
                        !isActive &&
                        "border-border/60 bg-background/40 text-muted-foreground",
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isActive && "text-foreground",
                        isDone && "text-emerald-400",
                        !isActive && !isDone && "text-muted-foreground",
                      )}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="mt-8 hidden space-y-3 lg:block">
            <TrustItem icon={Shield} text="Tokens encrypted on our servers" />
            <TrustItem icon={Zap} text="One-click Meta Embedded Signup" />
            <TrustItem icon={MessageCircle} text="No manual IDs or tokens" />
          </div>
        </aside>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <AnimatePresence mode="wait">
            {currentStep === "welcome" && (
              <WelcomeStep
                key="welcome"
                loading={loading}
                isError={isError}
                errorMessage={errorMessage}
                onConnect={handlePrimaryAction}
              />
            )}

            {currentStep === "connecting" && (
              <ConnectingStep
                key="connecting"
                phase={phase}
                isError={isError}
                errorMessage={errorMessage}
                onRetry={handlePrimaryAction}
                onReset={onReset}
              />
            )}

            {currentStep === "complete" && (
              <CompleteStep key="complete" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function WelcomeStep({
  loading,
  isError,
  errorMessage,
  onConnect,
}: {
  loading: boolean;
  isError: boolean;
  errorMessage: string | null;
  onConnect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-xl space-y-8"
    >
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" />
          Step 1 · Welcome
        </div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Connect WhatsApp Business
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          We&apos;ll connect your WhatsApp Business account.
          <br />
          If you don&apos;t have one yet, Meta will help you create it.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <AudienceCard
          icon={Building2}
          title="Already have WhatsApp Business?"
          description="Sign in with Meta and select your existing Business Manager, account, and phone number."
        />
        <AudienceCard
          icon={Sparkles}
          title="Starting from scratch?"
          description="Meta will walk you through creating a Business Manager, WhatsApp account, and phone number."
        />
      </div>

      {isError && errorMessage ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </div>
      ) : null}

      <div className="space-y-4">
        <Button
          type="button"
          disabled={loading}
          onClick={onConnect}
          className="h-14 w-full rounded-xl bg-[#25D366] text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-[#1fb855] hover:shadow-emerald-500/30 sm:h-16 sm:text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Opening Meta...
            </>
          ) : (
            <>
              Connect WhatsApp Business
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          No WhatsApp Business yet? No problem. Meta will guide you.
        </p>
      </div>
    </motion.div>
  );
}

function ConnectingStep({
  phase,
  isError,
  errorMessage,
  onRetry,
  onReset,
}: {
  phase: WhatsAppConnectPhase;
  isError: boolean;
  errorMessage: string | null;
  onRetry: () => void;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-xl space-y-8"
    >
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Step 2 · Connect
        </div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {isError ? "Connection interrupted" : "Setting up your channel"}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {isError
            ? "Something went wrong during Meta signup. You can try again — no manual IDs required."
            : "Complete the Meta popup to authorize BotFlow. We retrieve your business details automatically."}
        </p>
      </div>

      {!isError ? (
        <WhatsAppConnectionProgress phase={phase} className="rounded-xl" />
      ) : null}

      {isError && errorMessage ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </div>
      ) : null}

      {isError ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={onRetry}
            className="h-12 flex-1 rounded-xl bg-[#25D366] font-semibold text-white hover:bg-[#1fb855]"
          >
            Try again
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            className="h-12 rounded-xl"
          >
            Back to welcome
          </Button>
        </div>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Keep this tab open while Meta finishes setup.
        </p>
      )}
    </motion.div>
  );
}

function CompleteStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-xl space-y-8 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-500/30">
        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
      </div>

      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          Step 3 · Complete
        </div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          WhatsApp Business connected
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Your channel is live. Inbound messages will route through BotFlow and
          your AI automations.
        </p>
      </div>
    </motion.div>
  );
}

function AudienceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Building2;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-4 transition-colors hover:border-emerald-500/20 hover:bg-emerald-500/[0.03]">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
        <Icon className="h-5 w-5 text-emerald-400" />
      </div>
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function TrustItem({
  icon: Icon,
  text,
}: {
  icon: typeof Shield;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
      <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-400/80" />
      <span>{text}</span>
    </div>
  );
}
