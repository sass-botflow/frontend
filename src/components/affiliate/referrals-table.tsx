import type { ReferralRecord } from "@/lib/affiliate/types";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

interface ReferralsTableProps {
  referrals: ReferralRecord[];
}

const STATUS_STYLES: Record<ReferralRecord["status"], string> = {
  pending: "bg-amber-500/15 text-amber-400 ring-amber-500/25",
  active: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/25",
  churned: "bg-muted/80 text-muted-foreground ring-border/60",
};

export function ReferralsTable({ referrals }: ReferralsTableProps) {
  if (referrals.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold">No referrals yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Share your link — when someone signs up and subscribes, they appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">Your referrals</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 pr-4 font-medium">Plan</th>
              <th className="pb-3 pr-4 font-medium">Commission</th>
              <th className="pb-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral) => (
              <tr key={referral.id} className="border-b border-border/40 last:border-0">
                <td className="py-3 pr-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1",
                      STATUS_STYLES[referral.status],
                    )}
                  >
                    {referral.status}
                  </span>
                </td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {referral.planName ?? "—"}
                </td>
                <td className="py-3 pr-4">
                  {referral.monthlyValue > 0
                    ? `${formatCurrency(referral.monthlyCommission)}/mo`
                    : "—"}
                </td>
                <td className="py-3 text-muted-foreground">
                  {formatRelativeTime(referral.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
