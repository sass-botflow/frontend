import type { EarningRecord } from "@/lib/affiliate/types";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Receipt } from "lucide-react";

interface AffiliateEarningsTableProps {
  earnings: EarningRecord[];
}

const STATUS_STYLES: Record<EarningRecord["status"], string> = {
  pending: "bg-amber-500/15 text-amber-400 ring-amber-500/25",
  paid: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/25",
};

export function AffiliateEarningsTable({ earnings }: AffiliateEarningsTableProps) {
  if (earnings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Receipt className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-semibold">No earnings yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          When referrals subscribe, commissions appear here in real time.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">Earnings history</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Track every commission — pending and paid
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 pr-4 font-medium">Amount</th>
              <th className="pb-3 pr-4 font-medium">Period</th>
              <th className="pb-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((earning) => (
              <tr key={earning.id} className="border-b border-border/40 last:border-0">
                <td className="py-3 pr-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1",
                      STATUS_STYLES[earning.status],
                    )}
                  >
                    {earning.status}
                  </span>
                </td>
                <td className="py-3 pr-4 font-medium text-emerald-400">
                  {formatCurrency(earning.amount)}
                </td>
                <td className="py-3 pr-4 text-muted-foreground">
                  {earning.period ?? earning.description ?? "—"}
                </td>
                <td className="py-3 text-muted-foreground">
                  {formatRelativeTime(earning.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
