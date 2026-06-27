"use client";

import { motion } from "framer-motion";
import { Gift, Loader2, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { AffiliateStatsGrid } from "@/components/affiliate/affiliate-stats-grid";
import { CommissionTable } from "@/components/affiliate/commission-table";
import { HowItWorks } from "@/components/affiliate/how-it-works";
import { PayoutSettingsCard } from "@/components/affiliate/payout-settings-card";
import { ReferralLinkCard } from "@/components/affiliate/referral-link-card";
import { ReferralsTable } from "@/components/affiliate/referrals-table";
import { Button } from "@/components/ui/button";
import { useAffiliate } from "@/hooks/use-affiliate";
import { AFFILIATE_CONFIG } from "@/lib/affiliate/config";
import { formatCurrency } from "@/lib/utils";

export function AffiliateDashboard() {
  const { data, loading, joining, saving, error, join, savePayoutEmail } = useAffiliate();

  return (
    <>
      <DashboardHeader title="Affiliate Program" />

      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_60%)]" />
        <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-8 space-y-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <Gift className="h-3.5 w-3.5" />
              Partner program
            </div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Earn {AFFILIATE_CONFIG.commissionLabel} recurring commission
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Refer businesses to BotFlow and earn {AFFILIATE_CONFIG.commissionLabel} of every
              subscription payment — forever. No cap. {AFFILIATE_CONFIG.cookieDays}-day cookie.
            </p>
          </motion.div>

          {error && (
            <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !data?.isEnrolled ? (
            <JoinAffiliateCta joining={joining} onJoin={join} />
          ) : data.affiliate ? (
            <div className="space-y-6">
              <AffiliateStatsGrid stats={data.stats} />

              <ReferralLinkCard
                referralUrl={data.affiliate.referralUrl}
                code={data.affiliate.code}
              />

              <div className="grid gap-6 lg:grid-cols-2">
                <HowItWorks />
                <PayoutSettingsCard
                  payoutEmail={data.affiliate.payoutEmail}
                  pendingPayout={data.stats.pendingPayout}
                  saving={saving}
                  onSave={savePayoutEmail}
                />
              </div>

              <CommissionTable />
              <ReferralsTable referrals={data.referrals} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

function JoinAffiliateCta({
  joining,
  onJoin,
}: {
  joining: boolean;
  onJoin: () => Promise<void>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/60 to-emerald-500/5 p-8 text-center sm:p-12">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/25">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-xl font-semibold sm:text-2xl">
          Become a BotFlow partner
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          Get your unique referral link instantly. Earn{" "}
          {formatCurrency(
            Math.round(99 * AFFILIATE_CONFIG.commissionRate),
          )}
          /month for every Professional plan referral — and more as they scale.
        </p>
        <Button
          size="lg"
          className="mt-6 h-12 rounded-xl px-8 text-base font-semibold"
          disabled={joining}
          onClick={() => void onJoin()}
        >
          {joining ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join affiliate program — free"
          )}
        </Button>
      </div>

      <HowItWorks />
      <CommissionTable />
    </motion.div>
  );
}
