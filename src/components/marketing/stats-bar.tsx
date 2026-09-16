"use client";

import { motion } from "framer-motion";
import { Activity, MessageSquare, Users, Zap } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";

const statValues = [
  { value: "2M+", key: "messages" as const, icon: MessageSquare },
  { value: "500+", key: "businesses" as const, icon: Users },
  { value: "15+ hrs", key: "saved" as const, icon: Zap },
  { value: "98%", key: "satisfaction" as const, icon: Activity },
];

const liveValues = [
  { value: "1,247", key: "repliesToday" as const },
  { value: "89", key: "activeNow" as const },
  { value: "3", key: "channelsConnected" as const },
];

export function StatsBar() {
  const { t } = useLocale();

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statValues.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="premium-card p-6 text-center"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.stats[stat.key]}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5 backdrop-blur"
        >
          <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </span>
          {liveValues.map((stat, i) => (
            <div key={stat.key} className="flex items-center gap-6">
              {i > 0 && <div className="hidden h-8 w-px bg-border/60 sm:block" />}
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{t.stats[stat.key]}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
