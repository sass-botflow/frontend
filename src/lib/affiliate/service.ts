import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { checkDatabase } from "@/lib/integrations/db";
import {
  AFFILIATE_CONFIG,
  buildReferralUrl,
} from "@/lib/affiliate/config";
import type {
  AffiliateDashboardResponse,
  AffiliateRecord,
  AffiliateStats,
  ReferralRecord,
} from "@/lib/affiliate/types";

async function ensureDb() {
  const db = await checkDatabase();
  if (!db.ok) {
    throw new Error(
      "Database not ready. Set DATABASE_URL=file:/app/data/botflow.db on the server.",
    );
  }
}

function generateAffiliateCode(userId: string) {
  const hash = createHash("sha256").update(userId).digest("hex").slice(0, 8).toUpperCase();
  return `BF-${hash}`;
}

function toAffiliateRecord(row: {
  id: string;
  userId: string;
  code: string;
  status: string;
  payoutEmail: string | null;
  createdAt: Date;
  updatedAt: Date;
}): AffiliateRecord {
  return {
    id: row.id,
    userId: row.userId,
    code: row.code,
    status: row.status as AffiliateRecord["status"],
    payoutEmail: row.payoutEmail,
    referralUrl: buildReferralUrl(row.code),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function emptyStats(): AffiliateStats {
  return {
    totalEarnings: 0,
    pendingPayout: 0,
    paidOut: 0,
    activeReferrals: 0,
    totalReferrals: 0,
    monthlyRecurring: 0,
  };
}

function toReferralRecord(row: {
  id: string;
  status: string;
  planId: string | null;
  planName: string | null;
  monthlyValue: number;
  createdAt: Date;
}): ReferralRecord {
  const monthlyCommission = row.monthlyValue * AFFILIATE_CONFIG.commissionRate;
  return {
    id: row.id,
    status: row.status as ReferralRecord["status"],
    planId: row.planId,
    planName: row.planName,
    monthlyValue: row.monthlyValue,
    monthlyCommission,
    createdAt: row.createdAt.toISOString(),
  };
}

async function computeStats(affiliateId: string): Promise<AffiliateStats> {
  const [referrals, earnings] = await Promise.all([
    prisma.referral.findMany({ where: { affiliateId } }),
    prisma.affiliateEarning.findMany({ where: { affiliateId } }),
  ]);

  const activeReferrals = referrals.filter((r) => r.status === "active");
  const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
  const paidOut = earnings
    .filter((e) => e.status === "paid")
    .reduce((sum, e) => sum + e.amount, 0);
  const pendingPayout = earnings
    .filter((e) => e.status === "pending")
    .reduce((sum, e) => sum + e.amount, 0);
  const monthlyRecurring = activeReferrals.reduce(
    (sum, r) => sum + r.monthlyValue * AFFILIATE_CONFIG.commissionRate,
    0,
  );

  return {
    totalEarnings,
    pendingPayout,
    paidOut,
    activeReferrals: activeReferrals.length,
    totalReferrals: referrals.length,
    monthlyRecurring,
  };
}

export async function getAffiliateDashboard(
  userId: string,
): Promise<AffiliateDashboardResponse> {
  await ensureDb();

  const affiliate = await prisma.affiliate.findUnique({
    where: { userId },
    include: {
      referrals: { orderBy: { createdAt: "desc" }, take: 50 },
    },
  });

  if (!affiliate) {
    return {
      affiliate: null,
      isEnrolled: false,
      stats: emptyStats(),
      referrals: [],
    };
  }

  const stats = await computeStats(affiliate.id);

  return {
    affiliate: toAffiliateRecord(affiliate),
    isEnrolled: true,
    stats,
    referrals: affiliate.referrals.map(toReferralRecord),
  };
}

export async function joinAffiliateProgram(userId: string): Promise<AffiliateRecord> {
  await ensureDb();

  const existing = await prisma.affiliate.findUnique({ where: { userId } });
  if (existing) {
    return toAffiliateRecord(existing);
  }

  const code = generateAffiliateCode(userId);
  const row = await prisma.affiliate.create({
    data: { userId, code, status: "active" },
  });

  return toAffiliateRecord(row);
}

export async function updateAffiliatePayoutEmail(
  userId: string,
  payoutEmail: string,
): Promise<AffiliateRecord> {
  await ensureDb();

  const trimmed = payoutEmail.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    throw new Error("Enter a valid payout email address.");
  }

  const row = await prisma.affiliate.update({
    where: { userId },
    data: { payoutEmail: trimmed },
  });

  return toAffiliateRecord(row);
}
