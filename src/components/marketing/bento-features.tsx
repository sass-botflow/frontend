"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Globe,
  Inbox,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

const icons = [Inbox, Bot, Users, Globe, Shield, Sparkles];

const sizeClasses: Record<"small" | "medium" | "large", string> = {
  small: "sm:col-span-1",
  medium: "sm:col-span-2",
  large: "sm:col-span-2 sm:row-span-2",
};

export function BentoFeatures() {
  const { t } = useLocale();

  return (
    <section className="section-glow py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {t.bentoFeatures.label}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.bentoFeatures.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.bentoFeatures.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.bentoFeatures.items.map((item, i) => {
            const Icon = icons[i];
            const isLarge = item.size === "large";

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={cn(
                  "group premium-card p-6 transition-all hover:border-primary/30 hover:shadow-lg",
                  sizeClasses[item.size],
                  isLarge && "flex flex-col justify-between",
                )}
              >
                <div>
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-xl bg-primary/10",
                      isLarge ? "h-12 w-12" : "h-10 w-10",
                    )}
                  >
                    <Icon className={cn("text-primary", isLarge ? "h-6 w-6" : "h-5 w-5")} />
                  </div>
                  <h3
                    className={cn(
                      "mt-4 font-semibold tracking-tight",
                      isLarge ? "text-xl" : "text-base",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                {isLarge && (
                  <div className="mt-6 rounded-xl border border-border/40 bg-muted/30 p-4">
                    <div className="space-y-2">
                      {["WhatsApp", "Instagram", "TikTok"].map((ch) => (
                        <div
                          key={ch}
                          className="flex items-center justify-between rounded-lg bg-card/60 px-3 py-2 text-xs"
                        >
                          <span className="font-medium">{ch}</span>
                          <span className="flex items-center gap-1 text-emerald-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Live
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
