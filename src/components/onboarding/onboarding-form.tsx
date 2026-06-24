"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Globe, MessageCircle, Phone } from "lucide-react";
import { BUSINESS_TYPES } from "@/lib/ai-brain";
import type { BusinessTypeId } from "@/lib/ai-brain";
import { completeOnboarding } from "@/app/onboarding/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function OnboardingForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [businessType, setBusinessType] = useState<BusinessTypeId | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!businessType) {
      setError("Please select a business type.");
      return;
    }

    startTransition(async () => {
      try {
        await completeOnboarding({
          businessType,
          businessName,
          website,
          whatsapp,
        });
        router.push("/dashboard");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-8 rounded-2xl border border-border/60 bg-card/80 p-6 shadow-xl backdrop-blur-sm sm:p-8"
    >
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-primary">Welcome to BotFlow</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Set up your business
        </h1>
        <p className="text-sm text-muted-foreground">
          Tell us about your business so we can personalize your AI assistant.
        </p>
      </div>

      <div className="space-y-3">
        <Label className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          Business type
        </Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {BUSINESS_TYPES.map((type) => {
            const Icon = type.icon;
            const selected = businessType === type.id;

            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setBusinessType(type.id)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm transition-colors",
                  selected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/60 bg-background/50 text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="line-clamp-2">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessName" className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          Business name
        </Label>
        <Input
          id="businessName"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          placeholder="Acme Dental Clinic"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website" className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          Website
          <span className="text-xs font-normal text-muted-foreground">
            (optional)
          </span>
        </Label>
        <Input
          id="website"
          type="url"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          placeholder="https://yourbusiness.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp" className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          WhatsApp number
        </Label>
        <Input
          id="whatsapp"
          type="tel"
          value={whatsapp}
          onChange={(event) => setWhatsapp(event.target.value)}
          placeholder="+212 6XX XXX XXX"
          required
        />
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MessageCircle className="h-3.5 w-3.5" />
          We&apos;ll use this to connect your WhatsApp bot later.
        </p>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" className="w-full gap-2" disabled={isPending}>
        {isPending ? "Saving..." : "Continue to dashboard"}
        {!isPending && <ArrowRight className="h-4 w-4" />}
      </Button>
    </motion.form>
  );
}
