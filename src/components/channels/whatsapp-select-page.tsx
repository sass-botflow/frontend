"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { useIntegrations } from "@/hooks/use-integrations";

interface PendingOption {
  id: string;
  businessName: string;
  wabaName: string;
  phoneNumber: string;
  verifiedName: string;
}

export function WhatsAppSelectPage() {
  const { refresh } = useIntegrations();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [options, setOptions] = useState<PendingOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/integrations/whatsapp/pending", {
          cache: "no-store",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error ?? "Failed to load selection.");
        }
        if (!data.pending) {
          setError("No pending WhatsApp connection. Please start again.");
          return;
        }
        setPendingId(data.pending.pendingId);
        setOptions(data.pending.options);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load selection.");
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  async function handleSelect(optionIndex: number) {
    if (!pendingId) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/integrations/whatsapp/select", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pendingId, optionIndex }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to connect WhatsApp.");
      }
      await refresh();
      window.location.href = "/dashboard/channels?connected=whatsapp";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect WhatsApp.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <DashboardHeader title="Select WhatsApp number" />
      <div className="mx-auto max-w-2xl flex-1 px-4 py-8 sm:px-6">
        <h2 className="text-xl font-semibold">Choose your WhatsApp Business number</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Meta returned multiple numbers. Select the one BotFlow should use for
          customer messaging.
        </p>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
            <div className="mt-4">
              <Button asChild variant="outline">
                <Link href="/auth/meta">Connect again</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                disabled={submitting}
                onClick={() => void handleSelect(Number(option.id))}
                className="w-full rounded-xl border border-border/60 bg-card/50 p-4 text-left transition-colors hover:border-primary/30 hover:bg-card/80"
              >
                <p className="font-medium">{option.verifiedName || option.businessName}</p>
                <p className="mt-1 text-sm text-muted-foreground">{option.phoneNumber}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {option.businessName} · {option.wabaName}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
