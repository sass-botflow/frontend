import {
  AFFILIATE_CONFIG,
  AFFILIATE_EXAMPLE_MONTHLY,
  AFFILIATE_PLAN_COMMISSIONS,
} from "@/lib/affiliate/config";
import { formatCurrency } from "@/lib/utils";
import { Check } from "lucide-react";

export function CommissionTable() {
  const proPlan = AFFILIATE_PLAN_COMMISSIONS.find((p) => p.planId === "professional");

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">
        {AFFILIATE_CONFIG.commissionLabel} Recurring Commission on Plans
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Earn {AFFILIATE_CONFIG.commissionLabel} of every subscription payment — with no cap on
        referrals.
      </p>

      {proPlan && (
        <p className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Example:</span> Refer{" "}
          {AFFILIATE_CONFIG.exampleReferralCount} users on our{" "}
          {formatCurrency(proPlan.price)} plan → you earn{" "}
          <span className="font-semibold text-emerald-400">
            {formatCurrency(AFFILIATE_EXAMPLE_MONTHLY)}/month
          </span>{" "}
          in recurring revenue. (And more as they scale.) The bigger they grow, the more you earn.
        </p>
      )}

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
                <td className="py-3 pr-4 font-semibold text-emerald-400">
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
          `${AFFILIATE_CONFIG.cookieDays}-day cookie window for attribution`,
          `${formatCurrency(AFFILIATE_CONFIG.minPayout)} minimum payout via ${AFFILIATE_CONFIG.payoutMethods.join(" or ")}`,
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
