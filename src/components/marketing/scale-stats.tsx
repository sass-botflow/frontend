"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Clock, Zap } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";

const metricValues = [
  { value: "500+", key: "businesses" as const },
  { value: "2M+", key: "messages" as const },
  { value: "50+", key: "countries" as const },
  { value: "15hrs", key: "saved" as const },
];

const securityIcons = [Shield, Lock, Clock, Zap];

export function ScaleStats() {
  const { t } = useLocale();

  return (
    <section className="border-t border-border/60 bg-muted/20 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.scale.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{t.scale.subtitle}</p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metricValues.map((m, i) => (
            <motion.div
              key={m.key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-4xl font-semibold tracking-tight">{m.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.scale.metrics[m.key]}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {t.scale.securityLabel}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.scale.security.map((item, i) => {
              const Icon = securityIcons[i];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-border/60 bg-card p-5 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-3 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
