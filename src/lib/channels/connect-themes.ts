import type { LucideIcon } from "lucide-react";
import { QrCode, ShieldCheck, Zap } from "lucide-react";
import type { ReactNode } from "react";

export interface ChannelConnectFeature {
  emoji?: string;
  icon?: LucideIcon;
  title: string;
  text: string;
}

export interface ChannelConnectAccent {
  radialGradient: string;
  blurOrb: string;
  headerIconBg: string;
  headerIconRing: string;
  headerIconColor?: string;
  featureIconBg: string;
  featureIconColor: string;
  buttonClassName: string;
}

export interface ChannelConnectCardConfig {
  title: string;
  subtitle: string;
  features: ChannelConnectFeature[];
  buttonLabel: string;
  buttonLoadingLabel?: string;
  footerText: string;
  accent: ChannelConnectAccent;
  headerIcon: ReactNode;
  buttonIcon?: ReactNode;
  connectHref?: string;
}

export const WHATSAPP_CONNECT_CONFIG: ChannelConnectCardConfig = {
  title: "Connect WhatsApp",
  subtitle:
    "Link your WhatsApp Business number in seconds. Scan a QR code with your phone — no passwords, no manual setup.",
  features: [
    {
      icon: QrCode,
      title: "QR pairing",
      text: "Scan once with WhatsApp Linked Devices",
    },
    {
      icon: ShieldCheck,
      title: "Secure session",
      text: "Encrypted and isolated per workspace",
    },
    {
      icon: Zap,
      title: "Instant routing",
      text: "Messages flow to your AI automations",
    },
  ],
  buttonLabel: "Connect WhatsApp Business",
  buttonLoadingLabel: "Starting...",
  footerText: "Open WhatsApp on your phone when the QR code appears.",
  accent: {
    radialGradient:
      "bg-[radial-gradient(ellipse_at_top,rgba(37,211,102,0.08),transparent_60%)]",
    blurOrb: "bg-emerald-500/10",
    headerIconBg: "bg-[#25D366]/15",
    headerIconRing: "ring-[#25D366]/25",
    headerIconColor: "text-[#25D366]",
    featureIconBg: "bg-emerald-500/10",
    featureIconColor: "text-emerald-400",
    buttonClassName:
      "bg-[#25D366] text-white shadow-lg shadow-emerald-500/20 hover:bg-[#1fb855]",
  },
  headerIcon: null,
};

export const INSTAGRAM_CONNECT_CONFIG: ChannelConnectCardConfig = {
  title: "Connect Instagram",
  subtitle:
    "Securely connect your Instagram Professional account using Meta OAuth. No passwords are stored. Setup takes less than 10 seconds.",
  features: [
    {
      emoji: "📸",
      title: "Official Meta Login",
      text: "Authenticate securely with Meta.",
    },
    {
      emoji: "🔒",
      title: "Secure OAuth",
      text: "Your credentials are never stored.",
    },
    {
      emoji: "⚡",
      title: "Instant Automation",
      text: "Messages will immediately flow into your automation workflows.",
    },
  ],
  buttonLabel: "Continue with Instagram",
  buttonLoadingLabel: "Redirecting...",
  footerText: "You'll be redirected to Meta to authorize your Instagram account.",
  connectHref: "/api/auth/instagram",
  accent: {
    radialGradient:
      "bg-[radial-gradient(ellipse_at_top,rgba(221,42,123,0.1),transparent_60%)]",
    blurOrb: "bg-[#DD2A7B]/10",
    headerIconBg: "bg-gradient-to-br from-[#F58529]/20 via-[#DD2A7B]/20 to-[#8134AF]/20",
    headerIconRing: "ring-[#DD2A7B]/25",
    headerIconColor: "text-[#DD2A7B]",
    featureIconBg: "bg-gradient-to-br from-[#F58529]/10 via-[#DD2A7B]/10 to-[#8134AF]/10",
    featureIconColor: "text-[#DD2A7B]",
    buttonClassName:
      "border-0 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-lg shadow-[#DD2A7B]/25 hover:opacity-90",
  },
  headerIcon: null,
};
