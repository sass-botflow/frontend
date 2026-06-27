"use client";

import { DollarSign, TrendingUp, Users, Wallet } from "lucide-react";
import type { AffiliateStats } from "@/lib/affiliate/types";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface AffiliateStatsGridProps {
  stats: AffiliateStats;
}

export function AffiliateStatsGrid({ stats }: AffiliateStatsGridProps) {
  const items = [
    {
      label: "Total earnings",
      value: formatCurrency(stats.totalEarnings),
      icon: DollarSign,
      accent: "text-emerald-400",
    },
    {
      label: "Pending payout",
      value: formatCurrency(stats.pendingPayout),
      icon: Wallet,
      accent: "text-amber-400",
    },
    {
      label: "Active referrals",
      value: String(stats.activeReferrals),
      icon: Users,
      accent: "text-primary",
    },
    {
      label: "Monthly recurring",
      value: formatCurrency(stats.monthlyRecurring),
      icon: TrendingUp,
      accent: "text-violet-400",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="glass rounded-2xl border border-border/50 p-4 transition-all hover:border-primary/20"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className={cn("mt-1 text-2xl font-semibold tracking-tight", item.accent)}>
                {item.value}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
