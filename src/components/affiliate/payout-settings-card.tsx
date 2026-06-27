"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AFFILIATE_CONFIG } from "@/lib/affiliate/config";
import { formatCurrency } from "@/lib/utils";

interface PayoutSettingsCardProps {
  payoutEmail: string | null;
  pendingPayout: number;
  saving: boolean;
  onSave: (email: string) => Promise<void>;
}

export function PayoutSettingsCard({
  payoutEmail,
  pendingPayout,
  saving,
  onSave,
}: PayoutSettingsCardProps) {
  const [email, setEmail] = useState(payoutEmail ?? "");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    try {
      await onSave(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    }
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Mail className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Payout settings</h3>
          <p className="text-xs text-muted-foreground">
            {AFFILIATE_CONFIG.payoutSchedule} via {AFFILIATE_CONFIG.payoutMethods.join(" or ")} ·{" "}
            {formatCurrency(AFFILIATE_CONFIG.minPayout)} minimum
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="payout-email">Payout email (PayPal or Stripe)</Label>
          <Input
            id="payout-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
        </div>

        {pendingPayout > 0 && (
          <p className="text-sm text-muted-foreground">
            Pending balance:{" "}
            <span className="font-medium text-foreground">
              {formatCurrency(pendingPayout)}
            </span>
            {pendingPayout < AFFILIATE_CONFIG.minPayout && (
              <span>
                {" "}
                — {formatCurrency(AFFILIATE_CONFIG.minPayout - pendingPayout)} more to reach
                minimum payout
              </span>
            )}
          </p>
        )}

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button type="submit" disabled={saving} className="h-11 rounded-xl">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save payout email"
          )}
        </Button>
      </form>
    </div>
  );
}
