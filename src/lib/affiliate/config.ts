import { PLANS } from "@/lib/constants";

export const AFFILIATE_CONFIG = {
  commissionRate: 0.3,
  commissionLabel: "30%",
  cookieDays: 30,
  minPayout: 50,
  payoutMethods: ["PayPal", "Stripe"] as const,
  payoutSchedule: "Monthly",
  channels: ["WhatsApp", "Instagram", "TikTok"] as const,
  examplePlanPrice: 99,
  exampleReferralCount: 10,
} as const;

export const AFFILIATE_EXAMPLE_MONTHLY =
  Math.round(
    AFFILIATE_CONFIG.examplePlanPrice *
      AFFILIATE_CONFIG.commissionRate *
      AFFILIATE_CONFIG.exampleReferralCount,
  );

export const AFFILIATE_PLAN_COMMISSIONS = PLANS.map((plan) => ({
  planId: plan.id,
  planName: plan.name,
  price: plan.price,
  commission: Math.round(plan.price * AFFILIATE_CONFIG.commissionRate),
  yearlyCommission: Math.round(plan.price * AFFILIATE_CONFIG.commissionRate * 12),
}));

export function buildReferralUrl(code: string, baseUrl?: string) {
  const origin =
    baseUrl ?? process.env.NEXT_PUBLIC_APP_URL ?? "https://www.botflow.ink";
  return `${origin.replace(/\/$/, "")}/sign-up?ref=${code}`;
}
