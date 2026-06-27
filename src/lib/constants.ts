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
      "1 messaging app",
      "500 conversations / month",
      "AI bot included",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 99,
    description: "For growing businesses with more customers.",
    features: [
      "All 3 apps",
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
      "All 3 apps",
      "Unlimited conversations",
      "Unlimited team members",
      "API access",
    ],
  },
] as const;

/** Simple dashboard navigation */
export const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "LayoutDashboard" },
  { href: "/dashboard/inbox", label: "Inbox", icon: "Inbox" },
  { href: "/dashboard/brain", label: "My Bot", icon: "Bot" },
  { href: "/dashboard/channels", label: "Connect", icon: "PlugZap" },
  { href: "/dashboard/affiliate", label: "Affiliate", icon: "Gift" },
  { href: "/dashboard/settings", label: "Settings", icon: "Settings" },
] as const;

export const DEFAULT_AI_INSTRUCTIONS =
  "You are a helpful assistant for this business. Be friendly, concise, and professional. Answer questions about services, hours, and pricing. If you don't know something, offer to connect the customer with a human.";
