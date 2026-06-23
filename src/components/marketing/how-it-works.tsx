"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Inbox, Radio, TrendingUp } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Radio,
    title: "Connect",
    description: "Link WhatsApp, Instagram, or TikTok in under 30 seconds.",
    link: "Connect channels",
    href: "/register",
  },
  {
    num: "02",
    icon: Brain,
    title: "Teach",
    description: "Tell the AI about your business — name, services, hours, and FAQs.",
    link: "Set up AI Brain",
    href: "/register",
  },
  {
    num: "03",
    icon: Inbox,
    title: "Automate",
    description: "AI replies to every message instantly, in any language.",
    link: "Open inbox",
    href: "/register",
  },
  {
    num: "04",
    icon: TrendingUp,
    title: "Scale",
    description: "Hand off to humans when needed. Track everything in one place.",
    link: "See dashboard",
    href: "/register",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            How BotFlow Works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Connect. Teach. Automate. Scale.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One workflow from channel connection to 24/7 customer automation
            across WhatsApp, Instagram, and TikTok.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-lg"
            >
              <span className="text-xs font-semibold tracking-wider text-muted-foreground">
                {step.num}
              </span>
              <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
              <Link
                href={step.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
              >
                {step.link}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
