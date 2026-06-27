"use client";

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
      accent: "text-emerald-400",
    },
    {
      label: "Pending payout",
      value: formatCurrency(stats.pendingPayout),
      accent: "text-amber-400",
    },
    {
      label: "Paid out",
      value: formatCurrency(stats.paidOut),
      accent: "text-primary",
    },
    {
      label: "Monthly recurring",
      value: formatCurrency(stats.monthlyRecurring),
      accent: "text-violet-400",
    },
    {
      label: "Active referrals",
      value: String(stats.activeReferrals),
      accent: "text-foreground",
    },
    {
      label: "Total referrals",
      value: String(stats.totalReferrals),
      accent: "text-muted-foreground",
    },
  ];

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">Your performance</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Real-time stats from your affiliate dashboard
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border/50 bg-background/50 p-4"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {item.label}
            </p>
            <p className={cn("mt-1 text-2xl font-bold tracking-tight", item.accent)}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
