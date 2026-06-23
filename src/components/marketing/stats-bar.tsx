"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/providers/locale-provider";

const statValues = [
  { value: "2M+", key: "messages" as const },
  { value: "500+", key: "businesses" as const },
  { value: "15+ hrs", key: "saved" as const },
  { value: "98%", key: "satisfaction" as const },
];

const liveValues = [
  { value: "1,247", key: "repliesToday" as const },
  { value: "89", key: "activeNow" as const },
  { value: "3", key: "channelsConnected" as const },
];

export function StatsBar() {
  const { t } = useLocale();

  return (
    <section className="border-y border-border/60 bg-muted/20 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {statValues.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.stats[stat.key]}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-border/60 bg-card/50 px-6 py-4 backdrop-blur">
          {liveValues.map((stat, i) => (
            <div key={stat.key} className="flex items-center gap-6">
              {i > 0 && <div className="hidden h-8 w-px bg-border/60 sm:block" />}
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{t.stats[stat.key]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
