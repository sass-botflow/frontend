import { AFFILIATE_CONFIG } from "@/lib/affiliate/config";
import { formatCurrency } from "@/lib/utils";

const HIGHLIGHTS = [
  {
    value: AFFILIATE_CONFIG.commissionLabel,
    label: "Commission",
    detail: "Recurring lifetime",
  },
  {
    value: `${AFFILIATE_CONFIG.cookieDays} days`,
    label: "Cookie",
    detail: "Standard SaaS attribution",
  },
  {
    value: AFFILIATE_CONFIG.payoutSchedule,
    label: "Payout",
    detail: `${formatCurrency(AFFILIATE_CONFIG.minPayout)} minimum`,
  },
  {
    value: String(AFFILIATE_CONFIG.channels.length),
    label: "Messaging apps",
    detail: AFFILIATE_CONFIG.channels.join(", "),
  },
] as const;

export function AffiliateProgramHighlights() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {HIGHLIGHTS.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-border/60 bg-card/60 p-5 text-center backdrop-blur-sm"
        >
          <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {item.value}
          </p>
          <p className="mt-1 text-sm font-semibold">{item.label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}
