"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AFFILIATE_CONFIG } from "@/lib/affiliate/config";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    q: "How much does the BotFlow affiliate program pay?",
    a: `BotFlow pays ${AFFILIATE_CONFIG.commissionLabel} recurring commission on all paid plan subscriptions referred through your link. There is no cap and no expiry — you earn as long as your referral stays subscribed.`,
  },
  {
    q: "How long does the cookie last?",
    a: `The BotFlow affiliate cookie lasts ${AFFILIATE_CONFIG.cookieDays} days. If someone clicks your link and subscribes within ${AFFILIATE_CONFIG.cookieDays} days, you get credited for the referral.`,
  },
  {
    q: "When and how do I get paid?",
    a: `Payouts are processed ${AFFILIATE_CONFIG.payoutSchedule.toLowerCase()} with a ${formatCurrency(AFFILIATE_CONFIG.minPayout)} minimum threshold. Payments are sent via ${AFFILIATE_CONFIG.payoutMethods.join(" or ")}. You can track earnings in real time via your affiliate dashboard.`,
  },
  {
    q: "Who should promote BotFlow?",
    a: "BotFlow is ideal for creators, bloggers, agencies, consultants, and marketers with audiences that need WhatsApp, Instagram, or TikTok customer automation.",
  },
  {
    q: "Is there a free tier that makes it easier to convert?",
    a: "Yes. BotFlow offers a trial that lets users explore the platform before paying, which reduces friction for your audience.",
  },
];

export function AffiliateFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
      <div className="mt-4 space-y-2">
        {FAQ_ITEMS.map((faq, i) => (
          <div
            key={faq.q}
            className="overflow-hidden rounded-xl border border-border/60 bg-background/50"
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left"
            >
              <span className="text-sm font-medium">{faq.q}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                  open === i && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="border-t border-border/40 px-4 py-3.5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
