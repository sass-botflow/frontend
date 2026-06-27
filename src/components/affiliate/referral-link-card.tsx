"use client";

import { useState } from "react";
import { Check, Copy, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ReferralLinkCardProps {
  referralUrl: string;
  code: string;
  className?: string;
}

export function ReferralLinkCard({ referralUrl, code, className }: ReferralLinkCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/60 to-violet-500/5 p-5 sm:p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
          <Link2 className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Your referral link</h3>
          <p className="text-xs text-muted-foreground">Code: {code}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          readOnly
          value={referralUrl}
          className="h-11 bg-background/80 font-mono text-sm"
        />
        <Button
          type="button"
          onClick={handleCopy}
          className="h-11 shrink-0 rounded-xl px-6"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
