import { DashboardHeader } from "@/components/dashboard/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send } from "lucide-react";

export const metadata = { title: "Inbox" };

const conversations = [
  {
    id: "1",
    name: "Sarah Mitchell",
    preview: "Can I book a consultation for next week?",
    channel: "WhatsApp",
    unread: 2,
    time: "2m",
  },
  {
    id: "2",
    name: "Alex Rivera",
    preview: "What are your pricing plans?",
    channel: "Instagram",
    unread: 0,
    time: "15m",
  },
  {
    id: "3",
    name: "Emma Chen",
    preview: "Thanks! That helps a lot.",
    channel: "TikTok",
    unread: 0,
    time: "1h",
  },
];

const messages = [
  { from: "customer", text: "Hi, I'd like to book an appointment.", time: "10:32 AM" },
  { from: "bot", text: "Hello Sarah! I'd be happy to help. What day works best for you?", time: "10:32 AM" },
  { from: "customer", text: "Can I book a consultation for next week?", time: "10:33 AM" },
];

export default function InboxPage() {
  return (
    <>
      <DashboardHeader title="Inbox" />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 shrink-0 border-r border-border">
          <div className="border-b border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                type="button"
                className="flex w-full items-start gap-3 border-b border-border p-4 text-left transition-colors hover:bg-muted/50"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {convo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate font-medium">{convo.name}</p>
                    <span className="text-xs text-muted-foreground">{convo.time}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {convo.preview}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {convo.channel}
                    </Badge>
                    {convo.unread > 0 && (
                      <Badge className="h-5 min-w-5 px-1.5">{convo.unread}</Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <p className="font-semibold">Sarah Mitchell</p>
              <p className="text-sm text-muted-foreground">WhatsApp · Lead</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Assign</Button>
              <Button variant="outline" size="sm">Add tag</Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="mx-auto max-w-2xl space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.from === "customer" ? "justify-start" : "justify-end"}`}
                >
                  <Card
                    className={`max-w-[80%] px-4 py-2 ${
                      msg.from === "bot"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="mt-1 text-xs opacity-70">{msg.time}</p>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-border p-4">
            <div className="mx-auto flex max-w-2xl gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
