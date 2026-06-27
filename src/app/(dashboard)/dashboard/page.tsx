import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Inbox,
  MessageSquare,
  PlugZap,
  Sparkles,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { Button } from "@/components/ui/button";
import { CHANNELS, type ChannelId } from "@/lib/channels";
import { cn } from "@/lib/utils";

export const metadata = { title: "Home" };

const metrics = [
  { label: "Messages today", value: "47", trend: "+12%" },
  { label: "AI reply rate", value: "98%", trend: "Live" },
  { label: "Avg. response", value: "2s", trend: "Fast" },
  { label: "Apps connected", value: "2/3", trend: "1 left" },
];

const quickActions = [
  {
    href: "/dashboard/channels",
    label: "Connect apps",
    description: "WhatsApp, Instagram, TikTok",
    icon: PlugZap,
    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
  },
  {
    href: "/dashboard/brain",
    label: "Train your bot",
    description: "5-minute setup wizard",
    icon: Bot,
    accent: "from-violet-500/15 to-violet-500/5 text-primary",
  },
  {
    href: "/dashboard/inbox",
    label: "Open inbox",
    description: "3 unread conversations",
    icon: Inbox,
    accent: "from-blue-500/15 to-blue-500/5 text-blue-500",
  },
];

const recentMessages: {
  name: string;
  preview: string;
  channel: ChannelId;
  time: string;
  ai: boolean;
}[] = [
  {
    name: "Fatima B.",
    preview: "What are your prices?",
    channel: "whatsapp",
    time: "2m",
    ai: true,
  },
  {
    name: "Youssef K.",
    preview: "What are your opening hours?",
    channel: "instagram",
    time: "18m",
    ai: true,
  },
  {
    name: "Lina M.",
    preview: "Do you ship to Rabat?",
    channel: "tiktok",
    time: "1h",
    ai: false,
  },
];

const appStatus: Record<ChannelId, boolean> = {
  whatsapp: true,
  instagram: true,
  tiktok: false,
};

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Home" />
      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_70%)]" />

        <div className="relative mx-auto max-w-4xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          <div className="mb-8">
            <p className="text-sm font-medium text-primary">Dashboard</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground sm:text-base">
              Your bot is live on 2 apps. Everything you need is one click away.
            </p>
          </div>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm transition-all hover:border-primary/25 hover:shadow-sm"
              >
                <div
                  className={cn(
                    "mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br",
                    action.accent,
                  )}
                >
                  <action.icon className="h-5 w-5" />
                </div>
                <p className="font-medium">{action.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{action.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-border/50 bg-card/40 px-4 py-3.5"
              >
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">{m.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-emerald-500">{m.trend}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-2xl border border-border/60 bg-card/50 lg:col-span-3">
              <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">Recent messages</h3>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
                  <Link href="/dashboard/inbox">View all</Link>
                </Button>
              </div>
              <div className="divide-y divide-border/40">
                {recentMessages.map((msg) => (
                  <Link
                    key={msg.name}
                    href="/dashboard/inbox"
                    className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/30"
                  >
                    <ChannelLogo channel={msg.channel} size="sm" className="!h-9 !w-9 rounded-xl" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">{msg.name}</p>
                        {msg.ai && (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-medium text-violet-500">
                            <Sparkles className="h-2.5 w-2.5" />
                            AI
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{msg.preview}</p>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{msg.time}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/50 lg:col-span-2">
              <div className="border-b border-border/50 px-5 py-4">
                <h3 className="font-semibold">Your apps</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">Connection status</p>
              </div>
              <div className="space-y-1 p-3">
                {CHANNELS.map((ch) => (
                  <Link
                    key={ch.id}
                    href="/dashboard/channels"
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <ChannelLogo channel={ch.id} size="sm" />
                      <span className="text-sm font-medium">{ch.name}</span>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        appStatus[ch.id]
                          ? "text-emerald-500"
                          : "text-muted-foreground",
                      )}
                    >
                      {appStatus[ch.id] ? "Live" : "Setup"}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="border-t border-border/50 p-3">
                <Button variant="outline" size="sm" className="w-full rounded-xl" asChild>
                  <Link href="/dashboard/channels">Manage connections</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
