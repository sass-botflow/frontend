"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What channels does BotFlow support?",
    a: "BotFlow supports WhatsApp Business, Instagram DMs, and TikTok messages. All channels connect to a single unified inbox with one AI assistant.",
  },
  {
    q: "How long does setup take?",
    a: "Most businesses are live in under 5 minutes. Connect a channel, complete the AI Brain wizard, and your AI starts replying immediately.",
  },
  {
    q: "Do I need to write AI prompts?",
    a: "No. BotFlow's 5-step AI Brain wizard asks about your business type, goals, and knowledge sources — then generates optimized instructions automatically.",
  },
  {
    q: "Can my team jump in when needed?",
    a: "Yes. BotFlow supports human handoff — the AI transfers conversations to your team when it detects complex requests or specific keywords.",
  },
  {
    q: "What languages does the AI support?",
    a: "BotFlow AI auto-detects and replies in English, French, Arabic, Spanish, and more. You choose which languages to enable in settings.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Start with a 14-day free trial — no credit card required. Cancel anytime from your billing settings.",
  },
  {
    q: "Is BotFlow safe with my WhatsApp account?",
    a: "Yes. We use the official WhatsApp Business API with OAuth authentication. You can disconnect at any time from your settings.",
  },
  {
    q: "How much does BotFlow cost?",
    a: "Plans start at $49/month for Starter (1 channel, 500 conversations). Professional is $99/month with all 3 channels. See our pricing page for details.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-border/60 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about BotFlow.
          </p>
        </div>

        <div className="mt-12 space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="overflow-hidden rounded-xl border border-border/60 bg-card"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
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
                    <p className="border-t border-border/40 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
