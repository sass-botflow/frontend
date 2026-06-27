import Link from "next/link";
import { CreditCard, MessageSquare, Sparkles, User } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { ChannelBadge } from "@/components/channels/channel-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHANNELS, type ChannelId } from "@/lib/channels";
import { cn } from "@/lib/utils";

export const metadata = { title: "Overview" };

const stats = [
  { label: "Total conversations", value: "1,284", icon: MessageSquare },
  { label: "AI handled", value: "78%", icon: Sparkles, accent: "text-violet-500" },
  { label: "Human handled", value: "22%", icon: User, accent: "text-blue-500" },
  { label: "Connected apps", value: "2 / 3", icon: null },
];

const channelStatus: Record<ChannelId, boolean> = {
  whatsapp: true,
  instagram: true,
  tiktok: false,
};

const recentConversations = [
  {
    name: "Fatima B.",
    preview: "What are your prices?",
    channel: "whatsapp" as ChannelId,
    time: "2m",
  },
  {
    name: "Youssef K.",
    preview: "What are your opening hours?",
    channel: "instagram" as ChannelId,
    time: "18m",
  },
  {
    name: "Lina M.",
    preview: "How much is a cleaning?",
    channel: "tiktok" as ChannelId,
    time: "1h",
  },
];

const channelStats = [
  { channel: "whatsapp" as ChannelId, count: 842, pct: 66 },
  { channel: "instagram" as ChannelId, count: 312, pct: 24 },
  { channel: "tiktok" as ChannelId, count: 130, pct: 10 },
];

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Overview" />
      <div className="mx-auto max-w-4xl flex-1 p-4 sm:p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Good morning 👋
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s how your bot is performing today.
          </p>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/60 shadow-none">
              <CardContent className="flex items-center gap-4 p-4 sm:p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  {stat.icon ? (
                    <stat.icon className={cn("h-5 w-5", stat.accent ?? "text-muted-foreground")} />
                  ) : (
                    <div className="flex -space-x-1">
                      {CHANNELS.slice(0, 2).map((ch) => (
                        <ChannelLogo key={ch.id} channel={ch.id} size="sm" className="!h-6 !w-6 rounded-lg ring-2 ring-background" />
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-2">
          <Card className="border-border/60 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Connected apps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {CHANNELS.map((ch) => (
                <Link
                  key={ch.id}
                  href="/dashboard/channels"
                  className="flex items-center justify-between rounded-xl border border-border/60 p-3 transition-colors hover:bg-muted/40"
                >
                  <div className="flex items-center gap-3">
                    <ChannelLogo channel={ch.id} size="sm" />
                    <div>
                      <p className="text-sm font-medium">{ch.name}</p>
                      <ChannelBadge channel={ch.id} className="mt-1" />
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      channelStatus[ch.id]
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground",
                    )}
                  >
                    {channelStatus[ch.id] ? "Connected" : "Not connected"}
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Messages by app</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {channelStats.map((item) => (
                <div key={item.channel} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <ChannelLogo channel={item.channel} size="sm" className="!h-6 !w-6 rounded-lg" />
                      <span className="font-medium">{CHANNELS.find((c) => c.id === item.channel)?.name}</span>
                    </div>
                    <span className="text-muted-foreground">{item.count} · {item.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        item.channel === "whatsapp" && "bg-[#25D366]",
                        item.channel === "instagram" && "bg-gradient-to-r from-[#F58529] to-[#DD2A7B]",
                        item.channel === "tiktok" && "bg-black dark:bg-white",
                      )}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/60 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Recent conversations</CardTitle>
            <Link href="/dashboard/inbox" className="text-xs text-primary hover:underline">
              View inbox →
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentConversations.map((convo) => (
              <Link
                key={convo.name}
                href="/dashboard/inbox"
                className="flex items-center justify-between rounded-xl border border-border/60 p-3 transition-colors hover:bg-muted/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <ChannelLogo channel={convo.channel} size="sm" className="!h-9 !w-9 rounded-xl" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{convo.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{convo.preview}</p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <ChannelBadge channel={convo.channel} showDot showLogo={false} />
                  <span className="text-[10px] text-muted-foreground">{convo.time}</span>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
