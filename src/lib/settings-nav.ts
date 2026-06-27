import {
  BookOpen,
  Bot,
  Building2,
  CreditCard,
  PlugZap,
  User,
  Users,
} from "lucide-react";

export const SETTINGS_SECTIONS = [
  {
    label: "Account",
    items: [
      { href: "/dashboard/settings/profile", label: "Profile", icon: User, description: "Personal account & security" },
    ],
  },
  {
    label: "Workspace",
    items: [
      { href: "/dashboard/settings/business", label: "Business", icon: Building2, description: "Company details & branding" },
      { href: "/dashboard/channels", label: "Connect", icon: PlugZap, description: "WhatsApp, Instagram, TikTok" },
      { href: "/dashboard/settings/ai", label: "Bot behavior", icon: Bot, description: "Personality & handoff rules" },
      { href: "/dashboard/settings/knowledge", label: "Train bot", icon: BookOpen, description: "PDFs, websites & docs" },
    ],
  },
  {
    label: "Organization",
    items: [
      { href: "/dashboard/settings/team", label: "Team", icon: Users, description: "Members, roles & activity" },
      { href: "/dashboard/settings/billing", label: "Billing", icon: CreditCard, description: "Plan, usage & invoices" },
    ],
  },
] as const;

export const ALL_SETTINGS_PATHS = SETTINGS_SECTIONS.flatMap((g) =>
  g.items.map((i) => i.href),
);
