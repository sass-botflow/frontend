"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gift, Loader2, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { AffiliateEarningsTable } from "@/components/affiliate/affiliate-earnings-table";
import { AffiliateFaq } from "@/components/affiliate/affiliate-faq";
import { AffiliateProgramHighlights } from "@/components/affiliate/affiliate-program-highlights";
import { AffiliateStatsGrid } from "@/components/affiliate/affiliate-stats-grid";
import { AffiliateWhoIsThisFor } from "@/components/affiliate/affiliate-who-is-this-for";
import { AffiliateWhyPromote } from "@/components/affiliate/affiliate-why-promote";
import { CommissionTable } from "@/components/affiliate/commission-table";
import { HowItWorks } from "@/components/affiliate/how-it-works";
import { PayoutSettingsCard } from "@/components/affiliate/payout-settings-card";
import { ReferralLinkCard } from "@/components/affiliate/referral-link-card";
import { ReferralsTable } from "@/components/affiliate/referrals-table";
import { Button } from "@/components/ui/button";
import { useAffiliate } from "@/hooks/use-affiliate";
import {
  AFFILIATE_CONFIG,
  AFFILIATE_EXAMPLE_MONTHLY,
} from "@/lib/affiliate/config";
import { formatCurrency } from "@/lib/utils";

export function AffiliateDashboard() {
  const { data, loading, joining, saving, error, join, savePayoutEmail } = useAffiliate();

  return (
    <>
      <DashboardHeader title="Affiliate Program" />

      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.2),transparent_65%)]" />
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mb-8 space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <Gift className="h-3.5 w-3.5" />
              {AFFILIATE_CONFIG.commissionLabel} Lifetime Recurring · {AFFILIATE_CONFIG.cookieDays}-Day Cookie
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Earn {AFFILIATE_CONFIG.commissionLabel} Recurring
              <span className="gradient-text"> Promoting BotFlow</span>
            </h2>

            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Refer customers to BotFlow — the AI automation platform for WhatsApp, Instagram,
              and TikTok. Earn {AFFILIATE_CONFIG.commissionLabel} of every payment they make,
              forever. No cap. No expiry.
            </p>
          </motion.div>

          {error && (
            <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="mb-8">
            <AffiliateProgramHighlights />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : !data?.isEnrolled ? (
            <JoinAffiliateCta joining={joining} onJoin={join} />
          ) : data.affiliate ? (
            <EnrolledAffiliateView
              data={data}
              saving={saving}
              onSavePayoutEmail={savePayoutEmail}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

function EnrolledAffiliateView({
  data,
  saving,
  onSavePayoutEmail,
}: {
  data: NonNullable<ReturnType<typeof useAffiliate>["data"]>;
  saving: boolean;
  onSavePayoutEmail: (email: string) => Promise<void>;
}) {
  if (!data.affiliate) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <ReferralLinkCard
        referralUrl={data.affiliate.referralUrl}
        code={data.affiliate.code}
      />

      <AffiliateStatsGrid stats={data.stats} />

      <HowItWorks />

      <div className="grid gap-6 lg:grid-cols-2">
        <CommissionTable />
        <PayoutSettingsCard
          payoutEmail={data.affiliate.payoutEmail}
          pendingPayout={data.stats.pendingPayout}
          saving={saving}
          onSave={onSavePayoutEmail}
        />
      </div>

      <AffiliateEarningsTable earnings={data.earnings} />
      <ReferralsTable referrals={data.referrals} />

      <div className="grid gap-6 lg:grid-cols-2">
        <AffiliateWhyPromote />
        <AffiliateWhoIsThisFor />
      </div>

      <AffiliateFaq />
    </motion.div>
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
        <h3 className="text-2xl font-bold sm:text-3xl">Start Earning Passive Revenue</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Join the BotFlow Affiliate Program today. Free to join · No minimum traffic
          requirements. Example: {AFFILIATE_CONFIG.exampleReferralCount} referrals on
          Professional →{" "}
          <span className="font-semibold text-emerald-400">
            {formatCurrency(AFFILIATE_EXAMPLE_MONTHLY)}/month
          </span>{" "}
          recurring.
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
            <>
              Apply Now — It&apos;s Free
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">
          Get your unique referral link instantly after joining
        </p>
      </div>

      <HowItWorks />
      <CommissionTable />

      <div className="grid gap-6 lg:grid-cols-2">
        <AffiliateWhyPromote />
        <AffiliateWhoIsThisFor />
      </div>

      <AffiliateFaq />
    </motion.div>
  );
}
