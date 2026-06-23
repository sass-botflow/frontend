"use client";

import { Brain, Inbox, Radio, Settings } from "lucide-react";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Radio, label: "Channels", active: false },
  { icon: Brain, label: "AI Brain", active: false },
  { icon: Inbox, label: "Inbox", active: true },
  { icon: Settings, label: "Settings", active: false },
];

const messages = [
  {
    channel: "whatsapp" as const,
    name: "Fatima B.",
    preview: "Salam, bghit n3ref les prix dyal...",
    time: "2m",
    unread: true,
  },
  {
    channel: "instagram" as const,
    name: "Youssef M.",
    preview: "Do you ship to Casablanca?",
    time: "8m",
    unread: true,
  },
  {
    channel: "tiktok" as const,
    name: "Lina K.",
    preview: "Thanks! The AI answered perfectly.",
    time: "1h",
    unread: false,
  },
];

export function DashboardPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl shadow-black/20 ring-1 ring-white/5">
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/30 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="mx-auto flex h-6 w-48 items-center justify-center rounded-md bg-background/60 text-[10px] text-muted-foreground">
          botflow.ink/dashboard/inbox
        </div>
      </div>

      <div className="flex min-h-[320px] sm:min-h-[380px]">
        <aside className="hidden w-44 shrink-0 border-r border-border/60 bg-sidebar/50 p-3 sm:block">
          <div className="mb-4 flex items-center gap-2 px-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
              BF
            </span>
            <span className="text-xs font-semibold">BotFlow</span>
          </div>
          <nav className="space-y-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px]",
                  item.active
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground",
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </div>
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-border/60 px-4 py-3">
            <p className="text-sm font-semibold">Inbox</p>
            <p className="text-[11px] text-muted-foreground">3 conversations · 2 need attention</p>
          </div>

          <div className="flex-1 divide-y divide-border/40">
            {messages.map((msg) => (
              <div
                key={msg.name}
                className={cn(
                  "flex items-center gap-3 px-4 py-3",
                  msg.unread && "bg-primary/[0.03]",
                )}
              >
                <ChannelLogo channel={msg.channel} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-medium">{msg.name}</p>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="truncate text-[11px] text-muted-foreground">{msg.preview}</p>
                </div>
                {msg.unread && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-border/60 bg-muted/20 px-4 py-2.5">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              AI handling 94% of conversations automatically
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
