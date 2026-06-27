export type IntegrationCategory =
  | "channels"
  | "payments"
  | "productivity"
  | "ecommerce"
  | "crm"
  | "automation";

export type IntegrationStatus = "connected" | "available" | "coming-soon";

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  color: string;
  status: IntegrationStatus;
  initials: string;
}

export const INTEGRATION_CATEGORIES: { id: IntegrationCategory; label: string }[] = [
  { id: "channels", label: "Connect" },
  { id: "payments", label: "Payments" },
  { id: "productivity", label: "Productivity" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "crm", label: "CRM" },
  { id: "automation", label: "Automation" },
];

export const INTEGRATIONS: Integration[] = [
  { id: "whatsapp", name: "WhatsApp", description: "Connect WhatsApp Business and automate customer conversations.", category: "channels", color: "#25D366", status: "connected", initials: "WA" },
  { id: "instagram", name: "Instagram", description: "Manage Instagram DMs, story replies and comment triggers.", category: "channels", color: "#E4405F", status: "connected", initials: "IG" },
  { id: "tiktok", name: "TikTok", description: "Automate TikTok DMs and comment responses.", category: "channels", color: "#010101", status: "available", initials: "TT" },
  { id: "messenger", name: "Facebook Messenger", description: "Connect Facebook pages and automate Messenger chats.", category: "channels", color: "#0084FF", status: "available", initials: "FB" },
  { id: "telegram", name: "Telegram", description: "Build Telegram bots for customer support and notifications.", category: "channels", color: "#26A5E4", status: "coming-soon", initials: "TG" },
  { id: "stripe", name: "Stripe", description: "Accept payments and sync subscription billing.", category: "payments", color: "#635BFF", status: "connected", initials: "ST" },
  { id: "google-calendar", name: "Google Calendar", description: "Sync appointments and availability with Google Calendar.", category: "productivity", color: "#4285F4", status: "available", initials: "GC" },
  { id: "gmail", name: "Gmail", description: "Send and receive email notifications from your inbox.", category: "productivity", color: "#EA4335", status: "available", initials: "GM" },
  { id: "shopify", name: "Shopify", description: "Sync products, orders and customer data from your store.", category: "ecommerce", color: "#96BF48", status: "available", initials: "SH" },
  { id: "woocommerce", name: "WooCommerce", description: "Connect your WooCommerce store for product recommendations.", category: "ecommerce", color: "#96588A", status: "available", initials: "WC" },
  { id: "hubspot", name: "HubSpot", description: "Sync contacts, deals and pipeline data with HubSpot CRM.", category: "crm", color: "#FF7A59", status: "available", initials: "HS" },
  { id: "zapier", name: "Zapier", description: "Connect BotFlow to 5,000+ apps with automated workflows.", category: "automation", color: "#FF4A00", status: "available", initials: "ZP" },
  { id: "slack", name: "Slack", description: "Get notifications and hand off conversations to Slack channels.", category: "automation", color: "#4A154B", status: "available", initials: "SL" },
];
