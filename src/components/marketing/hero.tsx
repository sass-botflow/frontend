"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";

export function Hero() {
  const { t } = useLocale();

  const trustPoints = [t.hero.trust1, t.hero.trust2, t.hero.trust3];

  return (
    <section className="relative overflow-hidden pt-28 pb-16 lg:pb-24">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-32 h-64 w-64 rounded-full bg-[var(--gradient-end)]/10 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <Badge
            variant="secondary"
            className="mb-6 gap-2 border border-border/60 bg-card/60 px-3 py-1 backdrop-blur"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {t.hero.badge}
          </Badge>

          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            {t.hero.title}{" "}
            <span className="gradient-text">{t.hero.titleHighlight}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <Link href="/sign-up">
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 gap-2 px-8 text-base" asChild>
              <Link href="#how-it-works">
                <Play className="h-4 w-4" />
                {t.hero.ctaSecondary}
              </Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {trustPoints.map((point) => (
              <span key={point} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {point}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-2xl" />
          <DashboardPreview />

          <div className="absolute -left-4 top-1/4 hidden rounded-xl border border-border/60 bg-card/90 p-3 shadow-xl backdrop-blur-xl lg:block">
            <div className="flex items-center gap-2">
              <ChannelLogo channel="whatsapp" size="sm" />
              <div>
                <p className="text-xs font-medium">{t.hero.floatNewMessage}</p>
                <p className="text-[10px] text-muted-foreground">{t.hero.floatAiReplied}</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 bottom-1/4 hidden rounded-xl border border-border/60 bg-card/90 px-4 py-3 shadow-xl backdrop-blur-xl lg:block">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-medium">{t.hero.floatBrainActive}</p>
                <p className="text-[10px] text-emerald-500">{t.hero.floatAccuracy}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
