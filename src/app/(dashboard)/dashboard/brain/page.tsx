"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Globe,
  Loader2,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { WizardProgress } from "@/components/brain/wizard-progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AI_GOALS,
  BUSINESS_TYPES,
  COUNTRIES,
  DEFAULT_GOALS,
  KNOWLEDGE_SOURCES,
  LANGUAGES,
  generateAiPrompt,
  type AiGoalId,
  type KnowledgeSourceId,
  type WizardData,
} from "@/lib/ai-brain";
import {
  WorkflowChannelPicker,
  WorkflowChannelSummary,
} from "@/components/brain/workflow-channel-picker";
import { useBots } from "@/hooks/use-bots";
import { AppBanner } from "@/components/ui/app-banner";
import { cn } from "@/lib/utils";

const initialData: WizardData & { channelId: string | null } = {
  businessType: null,
  businessName: "",
  websiteUrl: "",
  whatsappNumber: "",
  language: "English",
  country: "Morocco",
  goals: [...DEFAULT_GOALS],
  knowledgeSource: null,
  channelId: null,
};

const knowledgeIcons: Record<KnowledgeSourceId, typeof Globe> = {
  "scan-website": Globe,
  "upload-pdf": FileText,
  "upload-documents": Upload,
  manual: FileText,
};

export default function BrainPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);
  const { primaryBot, updateBot, saving } = useBots();

  function toggleGoal(goalId: AiGoalId) {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId],
    }));
  }

  function canContinue(): boolean {
    switch (step) {
      case 1:
        return data.businessType !== null;
      case 2:
        return data.businessName.trim().length > 0;
      case 3:
        return data.goals.length > 0;
      case 4:
        return data.knowledgeSource !== null;
      default:
        return true;
    }
  }

  async function handleGenerate() {
    setGenerating(true);
    setStep(5);
    setSaveError(null);
    const result = generateAiPrompt(data);
    await new Promise((r) => setTimeout(r, 2200));
    setPrompt(result);

    if (primaryBot && data.channelId) {
      try {
        await updateBot(primaryBot.id, {
          channelId: data.channelId,
          name: data.businessName || primaryBot.name,
        });
      } catch {
        setSaveError(
          "Workflow created, but channel assignment failed. Update it in workflow settings.",
        );
      }
    }

    setGenerating(false);
    setGenerated(true);
  }

  return (
    <>
      <DashboardHeader title="My Bot" />
      <div className="mx-auto max-w-3xl flex-1 p-4 sm:p-6">
        <div className="mb-6 text-center sm:mb-8">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Set up your AI assistant
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            No prompts to write — we build everything for you in under 60 seconds.
          </p>
        </div>

        <WizardProgress currentStep={step} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step 1: Business type */}
            {step === 1 && (
              <div>
                <h3 className="mb-1 text-lg font-semibold">
                  What type of business do you have?
                </h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  We&apos;ll tailor your AI assistant to your industry.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {BUSINESS_TYPES.map((type) => {
                    const selected = data.businessType === type.id;
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() =>
                          setData((prev) => ({ ...prev, businessType: type.id }))
                        }
                        className={cn(
                          "flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                          selected
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border/60 hover:border-primary/40 hover:bg-muted/30",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                            selected ? "bg-primary text-primary-foreground" : "bg-muted",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium">{type.label}</span>
                        {selected && (
                          <Check className="ml-auto h-4 w-4 shrink-0 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Business info */}
            {step === 2 && (
              <div>
                <h3 className="mb-1 text-lg font-semibold">Business information</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Tell us about your business so the AI can represent you accurately.
                </p>
                <Card className="border-border/60 shadow-none">
                  <CardContent className="space-y-4 p-5 sm:p-6">
                    <div className="space-y-2">
                      <Label htmlFor="business-name">Business name *</Label>
                      <Input
                        id="business-name"
                        placeholder="e.g. Smile Dental Clinic"
                        value={data.businessName}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, businessName: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website URL</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://yourbusiness.com"
                        value={data.websiteUrl}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, websiteUrl: e.target.value }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp number</Label>
                      <Input
                        id="whatsapp"
                        placeholder="+212 6XX XXX XXX"
                        value={data.whatsappNumber}
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, whatsappNumber: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2 border-t border-border/60 pt-4">
                      <Label>WhatsApp channel for this workflow</Label>
                      <WorkflowChannelPicker
                        value={data.channelId}
                        onChange={(channelId) =>
                          setData((prev) => ({ ...prev, channelId }))
                        }
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="language">Business language</Label>
                        <select
                          id="language"
                          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={data.language}
                          onChange={(e) =>
                            setData((prev) => ({ ...prev, language: e.target.value }))
                          }
                        >
                          {LANGUAGES.map((lang) => (
                            <option key={lang} value={lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <select
                          id="country"
                          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          value={data.country}
                          onChange={(e) =>
                            setData((prev) => ({ ...prev, country: e.target.value }))
                          }
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: AI goals */}
            {step === 3 && (
              <div>
                <h3 className="mb-1 text-lg font-semibold">What should the AI do?</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Select all that apply — we&apos;ll build these into your assistant.
                </p>
                <div className="space-y-2">
                  {AI_GOALS.map((goal) => {
                    const checked = data.goals.includes(goal.id);
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => toggleGoal(goal.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-all",
                          checked
                            ? "border-primary bg-primary/5"
                            : "border-border/60 hover:bg-muted/30",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                            checked
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border",
                          )}
                        >
                          {checked && <Check className="h-3 w-3" />}
                        </div>
                        <span className="text-sm font-medium">{goal.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Train bot */}
            {step === 4 && (
              <div>
                <h3 className="mb-1 text-lg font-semibold">Train your bot</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Choose how your bot learns about your business.
                </p>
                <div className="space-y-3">
                  {KNOWLEDGE_SOURCES.map((source) => {
                    const selected = data.knowledgeSource === source.id;
                    const Icon = knowledgeIcons[source.id];
                    return (
                      <button
                        key={source.id}
                        type="button"
                        onClick={() =>
                          setData((prev) => ({ ...prev, knowledgeSource: source.id }))
                        }
                        className={cn(
                          "flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all",
                          selected
                            ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                            : "border-border/60 hover:border-primary/40",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                            selected ? "bg-primary text-primary-foreground" : "bg-muted",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{source.label}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">
                            {source.description}
                          </p>
                        </div>
                        {selected && (
                          <Check className="ml-auto h-5 w-5 shrink-0 text-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Generate */}
            {step === 5 && (
              <div className="text-center">
                {generating ? (
                  <div className="py-12">
                    <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                    <h3 className="mt-6 text-lg font-semibold">
                      Building your AI assistant...
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Analyzing your business type, goals, and knowledge source
                    </p>
                    <div className="mx-auto mt-6 h-1.5 max-w-xs overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                ) : generated ? (
                  <div>
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                      <Check className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Your AI assistant is ready!</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Generated for{" "}
                      <strong>{data.businessName}</strong> in under 60 seconds.
                    </p>

                    {saveError ? (
                      <div className="mt-4">
                        <AppBanner message={saveError} variant="error" autoDismissMs={0} />
                      </div>
                    ) : null}

                    {data.channelId ? (
                      <div className="mt-6 text-left">
                        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Connected WhatsApp channel
                        </p>
                        <WorkflowChannelSummary channelId={data.channelId} />
                      </div>
                    ) : null}

                    <Card className="mt-8 border-border/60 text-left shadow-none">
                      <CardContent className="p-5">
                        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Generated AI prompt
                        </p>
                        <Textarea
                          readOnly
                          value={prompt}
                          className="min-h-[140px] resize-none bg-muted/30 text-sm leading-relaxed"
                        />
                      </CardContent>
                    </Card>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Button size="lg" asChild disabled={saving}>
                        <Link href="/dashboard/channels">
                          {data.channelId ? "Manage Channels" : "Connect WhatsApp"}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href="/dashboard/inbox">Go to Inbox</Link>
                      </Button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {step < 5 && (
          <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {step < 4 ? (
              <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue()}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleGenerate} disabled={!canContinue()}>
                <Wand2 className="h-4 w-4" />
                Generate My AI Assistant
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
