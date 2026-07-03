import type { AffiliateDashboardResponse } from "@/lib/affiliate/types";

export async function getAffiliateDashboard(
  _userId: string,
): Promise<AffiliateDashboardResponse> {
  return {
    affiliate: null,
    isEnrolled: false,
    stats: {
      totalEarnings: 0,
      pendingPayout: 0,
      paidOut: 0,
      activeReferrals: 0,
      totalReferrals: 0,
      monthlyRecurring: 0,
    },
    referrals: [],
    earnings: [],
  };
}

export async function joinAffiliateProgram(_userId: string) {
  throw new Error("Affiliate program is not available on this deployment yet.");
}

export async function updateAffiliatePayoutEmail(_userId: string, _payoutEmail: string) {
  throw new Error("Affiliate program is not available on this deployment yet.");
}
