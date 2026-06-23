export const APP_NAME = "BotFlow";

/** Official brand mark (same file as team upload, URL-safe path for browsers). */
export const OFFICIAL_LOGO_PATH = "/logo.png";

export { CHANNELS, CHANNEL_MAP, getChannel } from "@/lib/channels";
export type { ChannelId, ChannelMeta } from "@/lib/channels";

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    description: "Perfect for one local business getting started.",
    features: [
      "1 channel",
      "500 conversations / month",
      "AI Brain included",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 99,
    description: "For growing businesses with more customers.",
    features: [
      "All 3 channels",
      "2,000 conversations / month",
      "Team members",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    price: 199,
    description: "For teams that need more volume and control.",
    features: [
      "All 3 channels",
      "Unlimited conversations",
      "Unlimited team members",
      "API access",
    ],
  },
] as const;

export const NAV_ITEMS = [
  { href: "/dashboard/channels", label: "Channels", icon: "Radio" },
  { href: "/dashboard/brain", label: "AI Brain", icon: "Brain" },
  { href: "/dashboard/inbox", label: "Inbox", icon: "Inbox" },
  { href: "/dashboard/team", label: "Team", icon: "Users" },
  { href: "/dashboard/billing", label: "Billing", icon: "CreditCard" },
  { href: "/dashboard/settings", label: "Settings", icon: "Settings" },
  { href: "/dashboard/settings/support", label: "Support", icon: "HelpCircle" },
] as const;

export const DEFAULT_AI_INSTRUCTIONS =
  "You are a helpful assistant for this business. Be friendly, concise, and professional. Answer questions about services, hours, and pricing. If you don't know something, offer to connect the customer with a human.";
