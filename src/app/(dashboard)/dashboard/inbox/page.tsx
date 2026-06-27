import { DashboardHeader } from "@/components/dashboard/header";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { ChannelBadge, ChannelDotLabel } from "@/components/channels/channel-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import type { ChannelId } from "@/lib/channels";

const conversations: {
  id: string;
  name: string;
  preview: string;
  channel: ChannelId;
  time: string;
  active: boolean;
}[] = [
  {
    id: "1",
    name: "Fatima B.",
    preview: "Do you ship to Casablanca?",
    channel: "whatsapp",
    time: "2m",
    active: true,
  },
  {
    id: "2",
    name: "Youssef K.",
    preview: "What are your opening hours?",
    channel: "instagram",
    time: "18m",
    active: false,
  },
  {
    id: "3",
    name: "Lina M.",
    preview: "How much is a cleaning?",
    channel: "tiktok",
    time: "1h",
    active: false,
  },
];

const messages = [
  { from: "customer", text: "Hi! Do you ship to Casablanca?", time: "10:32" },
  { from: "ai", text: "Hello Fatima! Yes, we deliver to Casablanca. Standard shipping is 2–3 business days. Would you like to place an order?", time: "10:32" },
  { from: "customer", text: "Yes, how much is delivery?", time: "10:33" },
  { from: "ai", text: "Delivery to Casablanca is 29 MAD — free on orders over 299 MAD. Want me to help you find a product?", time: "10:33" },
];

export const metadata = { title: "Inbox" };

export default function InboxPage() {
  return (
    <>
      <DashboardHeader title="Inbox" />
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <div className="w-full shrink-0 border-b border-border/60 md:w-80 md:border-b-0 md:border-r">
          <div className="border-b border-border/60 p-3">
            <Input placeholder="Search conversations..." className="h-9" />
          </div>
          <ScrollArea className="h-48 md:h-[calc(100vh-7rem)]">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                type="button"
                className={`flex w-full items-start gap-3 border-b border-border/40 p-4 text-left transition-colors hover:bg-muted/40 ${
                  convo.active ? "bg-muted/60" : ""
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-xs">
                      {convo.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 rounded-full ring-2 ring-background">
                    <ChannelLogo channel={convo.channel} size="sm" className="!h-5 !w-5 rounded-md" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{convo.name}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{convo.preview}</p>
                  <div className="mt-1.5">
                    <ChannelBadge channel={convo.channel} />
                  </div>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <ChannelLogo channel="whatsapp" size="md" className="!h-10 !w-10 rounded-xl" />
              <div>
                <p className="font-medium">Fatima B.</p>
                <ChannelDotLabel channel="whatsapp" />
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">AI handled</Badge>
          </div>

          <ScrollArea className="flex-1 p-4 sm:p-5">
            <div className="mx-auto max-w-xl space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "customer" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.from === "ai"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.from === "ai" && (
                      <p className="mb-1 text-[10px] font-medium opacity-70">AI · {msg.time}</p>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-border/60 p-3 sm:p-4">
            <div className="mx-auto flex max-w-xl gap-2">
              <Input placeholder="Take over this conversation..." className="flex-1" />
              <Button size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
