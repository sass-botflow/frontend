export type AffiliateStatus = "active" | "pending" | "suspended";
export type ReferralStatus = "pending" | "active" | "churned";
export type EarningStatus = "pending" | "paid";

export interface AffiliateRecord {
  id: string;
  userId: string;
  code: string;
  status: AffiliateStatus;
  payoutEmail: string | null;
  referralUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReferralRecord {
  id: string;
  status: ReferralStatus;
  planId: string | null;
  planName: string | null;
  monthlyValue: number;
  monthlyCommission: number;
  createdAt: string;
}

export interface AffiliateStats {
  totalEarnings: number;
  pendingPayout: number;
  paidOut: number;
  activeReferrals: number;
  totalReferrals: number;
  monthlyRecurring: number;
}

export interface AffiliateDashboardResponse {
  affiliate: AffiliateRecord | null;
  isEnrolled: boolean;
  stats: AffiliateStats;
  referrals: ReferralRecord[];
}

export interface JoinAffiliateResponse {
  affiliate: AffiliateRecord;
  message: string;
}

export interface UpdateAffiliateBody {
  payoutEmail?: string;
}
