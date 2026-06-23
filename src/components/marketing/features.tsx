"use client";

import { motion } from "framer-motion";
import { Brain, Inbox, Radio } from "lucide-react";

const steps = [
  {
    icon: Radio,
    step: "1",
    title: "Connect a channel",
    description: "WhatsApp, Instagram, or TikTok — one click.",
  },
  {
    icon: Brain,
    step: "2",
    title: "Teach your AI",
    description: "Add your business name, description, and a PDF. Done.",
  },
  {
    icon: Inbox,
    step: "3",
    title: "Let AI handle messages",
    description: "Every reply is automatic. Jump in anytime from your inbox.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border/60 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Three steps. That&apos;s it.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built for dentists, restaurants, shops, and coaches — not developers.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Step {item.step}
              </p>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
