"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { useLocale, useLocalizedPath } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CompetitorEdge() {
  const { t } = useLocale();
  const lp = useLocalizedPath();

  const columns = [
    { key: "botflow" as const, label: t.competitorEdge.botflow, highlight: true },
    { key: "manychat" as const, label: t.competitorEdge.competitors.manychat, highlight: false },
    { key: "respond" as const, label: t.competitorEdge.competitors.respond, highlight: false },
    { key: "tidio" as const, label: t.competitorEdge.competitors.tidio, highlight: false },
  ];

  return (
    <section className="border-t border-border/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {t.competitorEdge.label}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.competitorEdge.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.competitorEdge.subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden rounded-2xl border border-border/60 premium-card"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                    Feature
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "px-4 py-4 text-center font-semibold",
                        col.highlight && "bg-primary/5 text-primary",
                      )}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.competitorEdge.features.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={cn(
                      "border-b border-border/40 last:border-0",
                      i % 2 === 0 && "bg-muted/10",
                    )}
                  >
                    <td className="px-6 py-3.5 font-medium">{feature.name}</td>
                    {columns.map((col) => {
                      const value = feature[col.key];
                      return (
                        <td
                          key={col.key}
                          className={cn(
                            "px-4 py-3.5 text-center",
                            col.highlight && "bg-primary/5",
                          )}
                        >
                          {value ? (
                            <Check className="mx-auto h-4 w-4 text-emerald-500" />
                          ) : (
                            <X className="mx-auto h-4 w-4 text-muted-foreground/40" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <Button variant="outline" className="gap-2" asChild>
            <Link href={lp("/pricing")}>
              {t.competitorEdge.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
