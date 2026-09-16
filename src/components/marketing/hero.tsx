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
    <section className="aurora-bg noise-overlay relative overflow-hidden pt-32 pb-20 lg:pb-28">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-20 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl text-center"
        >
          <Badge
            variant="secondary"
            className="mb-8 gap-2 border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs backdrop-blur"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            {t.hero.badge}
          </Badge>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            {t.hero.title}
            <br />
            <span className="gradient-text">{t.hero.titleHighlight}</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {t.hero.subtitle}
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 px-10 text-base shadow-lg shadow-primary/25"
              asChild
            >
              <Link href="/sign-up">
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 gap-2 border-border/60 bg-card/40 px-10 text-base backdrop-blur"
              asChild
            >
              <Link href="#how-it-works">
                <Play className="h-4 w-4" />
                {t.hero.ctaSecondary}
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {trustPoints.map((point) => (
              <span key={point} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {point}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-b from-primary/25 via-primary/5 to-transparent blur-3xl" />
          <div className="shimmer-border rounded-2xl">
            <DashboardPreview />
          </div>

          <div className="absolute -left-6 top-1/4 hidden rounded-xl premium-card p-4 lg:block">
            <div className="flex items-center gap-3">
              <ChannelLogo channel="whatsapp" size="sm" />
              <div>
                <p className="text-xs font-medium">{t.hero.floatNewMessage}</p>
                <p className="text-[10px] text-emerald-500">{t.hero.floatAiReplied}</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-6 bottom-1/4 hidden rounded-xl premium-card px-5 py-4 lg:block">
            <div className="flex items-center gap-3">
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
