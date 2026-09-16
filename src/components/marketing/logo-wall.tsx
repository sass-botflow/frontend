"use client";

import { useLocale } from "@/components/providers/locale-provider";

export function LogoWall() {
  const { t } = useLocale();
  const items = [...t.logoWall.industries, ...t.logoWall.industries];

  return (
    <section className="border-y border-border/40 bg-muted/10 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-sm text-muted-foreground">{t.logoWall.label}</p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-12">
            {items.map((industry, i) => (
              <span
                key={`${industry}-${i}`}
                className="whitespace-nowrap text-lg font-medium tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
