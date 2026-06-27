"use client";

import { useState } from "react";
import { Check, Copy, Link2, Share2 } from "lucide-react";
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

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: "BotFlow",
        text: "Try BotFlow — AI customer automation for WhatsApp, Instagram & TikTok",
        url: referralUrl,
      });
    } else {
      await handleCopy();
    }
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/60 to-violet-500/5 p-5 sm:p-6",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Link2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Your referral link</h3>
            <p className="text-sm text-muted-foreground">
              Share this link — code <span className="font-mono font-medium text-foreground">{code}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          readOnly
          value={referralUrl}
          className="h-11 bg-background/80 font-mono text-sm"
        />
        <div className="flex shrink-0 gap-2">
          <Button type="button" onClick={handleCopy} className="h-11 rounded-xl px-5">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => void handleShare()}
            className="h-11 rounded-xl px-5"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
