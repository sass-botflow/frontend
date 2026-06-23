export const APP_NAME = "BotFlow";

export const CHANNELS = [
  { id: "whatsapp", name: "WhatsApp", color: "#25D366" },
  { id: "instagram", name: "Instagram", color: "#E4405F" },
  { id: "tiktok", name: "TikTok", color: "#000000" },
  { id: "messenger", name: "Messenger", color: "#0084FF" },
] as const;

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    description: "For solo businesses getting started with automation.",
    features: [
      "1 channel connection",
      "2 AI agents",
      "500 conversations / mo",
      "Basic CRM",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 149,
    description: "For growing teams that need multi-channel power.",
    features: [
      "All 4 channels",
      "Unlimited AI agents",
      "5,000 conversations / mo",
      "CRM + pipelines",
      "Appointment booking",
      "Knowledge base",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "agency",
    name: "Agency",
    price: 399,
    description: "For agencies managing multiple client accounts.",
    features: [
      "Everything in Professional",
      "Unlimited client accounts",
      "White-label branding",
      "Team roles & permissions",
      "Advanced analytics",
      "API access",
      "Dedicated success manager",
    ],
  },
] as const;

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: "LayoutDashboard" },
  { href: "/dashboard/inbox", label: "Inbox", icon: "Inbox" },
  { href: "/dashboard/bots", label: "AI Agents", icon: "Bot" },
  { href: "/dashboard/crm", label: "CRM", icon: "Users" },
  { href: "/dashboard/appointments", label: "Appointments", icon: "Calendar" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "BarChart3" },
  { href: "/dashboard/knowledge", label: "Knowledge", icon: "BookOpen" },
  { href: "/dashboard/team", label: "Team", icon: "UserCog" },
  { href: "/dashboard/billing", label: "Billing", icon: "CreditCard" },
  { href: "/dashboard/settings", label: "Settings", icon: "Settings" },
] as const;

export const WORKFLOW_NODES = [
  { type: "SEND_MESSAGE", label: "Send Message", color: "#6366f1" },
  { type: "ASK_QUESTION", label: "Ask Question", color: "#8b5cf6" },
  { type: "AI_RESPONSE", label: "AI Response", color: "#a855f7" },
  { type: "CONDITION", label: "Condition", color: "#f59e0b" },
  { type: "WAIT", label: "Wait", color: "#64748b" },
  { type: "API_REQUEST", label: "API Request", color: "#0ea5e9" },
  { type: "LEAD_CAPTURE", label: "Lead Capture", color: "#10b981" },
  { type: "HUMAN_HANDOFF", label: "Human Handoff", color: "#ef4444" },
] as const;
