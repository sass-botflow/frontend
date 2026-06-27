import { AFFILIATE_PLAN_COMMISSIONS } from "@/lib/affiliate/config";
import { formatCurrency } from "@/lib/utils";
import { Check } from "lucide-react";

export function CommissionTable() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">30% recurring commission on every plan</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Earn every month your referrals stay subscribed — no cap, no expiry.
      </p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Plan</th>
              <th className="pb-3 pr-4 font-medium">Price</th>
              <th className="pb-3 pr-4 font-medium">You earn / month</th>
              <th className="pb-3 font-medium">You earn / year</th>
            </tr>
          </thead>
          <tbody>
            {AFFILIATE_PLAN_COMMISSIONS.map((plan) => (
              <tr key={plan.planId} className="border-b border-border/40 last:border-0">
                <td className="py-3 pr-4 font-medium">{plan.planName}</td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {formatCurrency(plan.price)}/mo
                </td>
                <td className="py-3 pr-4 text-emerald-400">
                  {formatCurrency(plan.commission)}/mo
                </td>
                <td className="py-3 text-muted-foreground">
                  {formatCurrency(plan.yearlyCommission)}/yr
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-5 space-y-2">
        {[
          "Lifetime recurring — no 12-month cap",
          "30-day cookie window for attribution",
          `$50 minimum payout via PayPal or Stripe`,
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
