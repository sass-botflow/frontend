"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "2M+", label: "Messages handled" },
  { value: "500+", label: "Active businesses" },
  { value: "15+ hrs", label: "Saved per week" },
  { value: "98%", label: "Customer satisfaction" },
];

const liveStats = [
  { value: "1,247", label: "AI replies today" },
  { value: "89", label: "Active users now" },
  { value: "3", label: "Channels connected" },
];

export function StatsBar() {
  return (
    <section className="border-y border-border/60 bg-muted/20 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-border/60 bg-card/50 px-6 py-4 backdrop-blur">
          {liveStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              {i > 0 && <div className="hidden h-8 w-px bg-border/60 sm:block" />}
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold tabular-nums">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
