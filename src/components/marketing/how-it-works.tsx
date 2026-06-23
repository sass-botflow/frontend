"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Inbox, Radio, TrendingUp } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";

const stepIcons = [Radio, Brain, Inbox, TrendingUp];

export function HowItWorks() {
  const { t } = useLocale();

  return (
    <section id="how-it-works" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {t.howItWorks.label}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.howItWorks.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.howItWorks.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.howItWorks.steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all hover:border-border hover:shadow-lg"
              >
                <span className="text-xs font-semibold tracking-wider text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <Link
                  href="/register"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {step.link}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
