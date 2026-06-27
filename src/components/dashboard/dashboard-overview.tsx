"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Circle,
  Inbox,
  MessageSquare,
  PlugZap,
  Sparkles,
  Zap,
} from "lucide-react";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { Button } from "@/components/ui/button";
import { CHANNELS, type ChannelId } from "@/lib/channels";
import { cn } from "@/lib/utils";

const metrics = [
  {
    label: "Messages today",
    value: "47",
    hint: "+12% vs yesterday",
    icon: MessageSquare,
  },
  {
    label: "AI reply rate",
    value: "98%",
    hint: "Bot is live",
    icon: Sparkles,
  },
  {
    label: "Avg. response",
    value: "2s",
    hint: "Instant replies",
    icon: Zap,
  },
  {
    label: "Apps live",
    value: "2/3",
    hint: "Connect TikTok",
    icon: PlugZap,
  },
] as const;

const quickActions = [
  {
    href: "/dashboard/inbox",
    label: "Inbox",
    description: "3 new messages",
    icon: Inbox,
    primary: true,
  },
  {
    href: "/dashboard/channels",
    label: "Connect",
    description: "WhatsApp · Instagram · TikTok",
    icon: PlugZap,
    primary: false,
  },
  {
    href: "/dashboard/brain",
    label: "My Bot",
    description: "Train & customize",
    icon: Bot,
    primary: false,
  },
] as const;

const recentMessages: {
  name: string;
  preview: string;
  channel: ChannelId;
  time: string;
  ai: boolean;
}[] = [
  { name: "Fatima B.", preview: "What are your prices?", channel: "whatsapp", time: "2m", ai: true },
  { name: "Youssef K.", preview: "What are your opening hours?", channel: "instagram", time: "18m", ai: true },
  { name: "Lina M.", preview: "Do you ship to Rabat?", channel: "tiktok", time: "1h", ai: false },
];

const appStatus: Record<ChannelId, boolean> = {
  whatsapp: true,
  instagram: true,
  tiktok: false,
};

const setupSteps = [
  { label: "Connect an app", done: true, href: "/dashboard/channels" },
  { label: "Train your bot", done: true, href: "/dashboard/brain" },
  { label: "Connect TikTok", done: false, href: "/dashboard/channels" },
];

export function DashboardOverview() {
  const connectedCount = Object.values(appStatus).filter(Boolean).length;
  const setupComplete = connectedCount === CHANNELS.length;

  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.14),transparent_65%)]" />
      <div className="pointer-events-none absolute -right-20 top-32 h-56 w-56 rounded-full bg-emerald-500/8 blur-3xl" />

      <div className="relative mx-auto max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Bot online · {connectedCount} apps live
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Your dashboard
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
              Everything in one place — messages, bot, and connections.
            </p>
          </div>

          <Button className="h-11 shrink-0 rounded-xl px-6" asChild>
            <Link href="/dashboard/inbox">
              Open inbox
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {!setupComplete && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-8 rounded-2xl border border-border/60 bg-card/50 p-4 sm:p-5"
          >
            <p className="mb-3 text-sm font-medium">Finish setup</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              {setupSteps.map((step) => (
                <Link
                  key={step.label}
                  href={step.href}
                  className="flex flex-1 items-center gap-2 rounded-xl border border-border/50 bg-background/50 px-3 py-2.5 text-sm transition-colors hover:border-primary/30"
                >
                  {step.done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className={cn(!step.done && "text-muted-foreground")}>{step.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {quickActions.map((action, i) => (
            <motion.div
              key={action.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.05 }}
            >
              <Link
                href={action.href}
                className={cn(
                  "group flex h-full flex-col rounded-2xl border p-5 transition-all hover:shadow-md",
                  action.primary
                    ? "border-primary/30 bg-gradient-to-br from-primary/15 via-card/80 to-violet-500/5 hover:border-primary/50"
                    : "border-border/60 bg-card/50 hover:border-primary/25",
                )}
              >
                <div
                  className={cn(
                    "mb-4 flex h-11 w-11 items-center justify-center rounded-xl",
                    action.primary ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <action.icon className="h-5 w-5" />
                </div>
                <p className="text-base font-semibold">{action.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{action.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className="rounded-2xl border border-border/50 bg-card/40 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <m.icon className="h-3.5 w-3.5 text-muted-foreground/70" />
              </div>
              <p className="mt-2 text-2xl font-bold tracking-tight">{m.value}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{m.hint}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/50 lg:col-span-3">
            <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
              <h3 className="font-semibold">Recent messages</h3>
              <Link href="/dashboard/inbox" className="text-xs font-medium text-primary hover:underline">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-border/40">
              {recentMessages.map((msg) => (
                <Link
                  key={msg.name}
                  href="/dashboard/inbox"
                  className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-muted/30"
                >
                  <ChannelLogo channel={msg.channel} size="sm" className="!h-10 !w-10 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{msg.name}</p>
                      {msg.ai && (
                        <span className="rounded-full bg-violet-500/10 px-1.5 py-0.5 text-[10px] font-medium text-violet-500">
                          AI replied
                        </span>
                      )}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{msg.preview}</p>
                  </div>
                  <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">{msg.time}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/50 lg:col-span-2">
            <div className="border-b border-border/50 px-5 py-4">
              <h3 className="font-semibold">Apps</h3>
              <p className="text-xs text-muted-foreground">{connectedCount} of {CHANNELS.length} connected</p>
            </div>
            <div className="divide-y divide-border/40">
              {CHANNELS.map((ch) => (
                <Link
                  key={ch.id}
                  href="/dashboard/channels"
                  className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <ChannelLogo channel={ch.id} size="sm" />
                    <span className="text-sm font-medium">{ch.name}</span>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-medium",
                      appStatus[ch.id]
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {appStatus[ch.id] ? "Live" : "Setup"}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
