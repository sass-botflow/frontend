export const APP_NAME = "BotFlow";

export const CHANNELS = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    color: "#25D366",
    description: "Reply to customers automatically on WhatsApp Business.",
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "#E4405F",
    description: "Handle Instagram DMs and story replies.",
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#010101",
    description: "Respond to TikTok messages and comments.",
  },
] as const;

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
] as const;

export const DEFAULT_AI_INSTRUCTIONS =
  "You are a helpful assistant for this business. Be friendly, concise, and professional. Answer questions about services, hours, and pricing. If you don't know something, offer to connect the customer with a human.";
