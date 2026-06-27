import { Check } from "lucide-react";

const BENEFITS = [
  "AI agents reply on WhatsApp, Instagram & TikTok — 24/7 customer automation",
  "Connect channels in minutes — zero complex setup for your referrals",
  "Smart inbox + CRM built for local businesses and e-commerce brands",
  "Fast-growing messaging automation market = high, proven demand",
  "Easy to demo, instant ROI = high referral conversions",
  "Your referrals succeed → your commissions grow",
];

export function AffiliateWhyPromote() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">Why Promote BotFlow?</h3>
      <ul className="mt-5 space-y-3">
        {BENEFITS.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
              <Check className="h-3 w-3 text-emerald-400" />
            </span>
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
