import { DashboardHeader } from "@/components/dashboard/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";

const conversations = [
  {
    id: "1",
    name: "Fatima B.",
    preview: "Do you have appointments available tomorrow?",
    channel: "WhatsApp",
    time: "2m",
    active: true,
  },
  {
    id: "2",
    name: "Youssef K.",
    preview: "What are your opening hours?",
    channel: "Instagram",
    time: "18m",
    active: false,
  },
  {
    id: "3",
    name: "Lina M.",
    preview: "How much is a cleaning?",
    channel: "TikTok",
    time: "1h",
    active: false,
  },
];

const messages = [
  {
    from: "customer",
    text: "Hi! Do you have appointments available tomorrow?",
    time: "10:32",
  },
  {
    from: "ai",
    text: "Hello Fatima! Yes, we have openings tomorrow at 10am, 2pm, and 4pm. Which time works best for you?",
    time: "10:32",
  },
  {
    from: "customer",
    text: "2pm please!",
    time: "10:33",
  },
  {
    from: "ai",
    text: "Perfect! I've noted your appointment for tomorrow at 2pm. We'll send you a reminder. See you then! 😊",
    time: "10:33",
  },
];

export const metadata = { title: "Inbox" };

export default function InboxPage() {
  return (
    <>
      <DashboardHeader title="Inbox" />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-72 shrink-0 border-r border-border/60">
          <div className="border-b border-border/60 p-3">
            <Input placeholder="Search conversations..." className="h-9" />
          </div>
          <ScrollArea className="h-[calc(100vh-7rem)]">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                type="button"
                className={`flex w-full items-start gap-3 border-b border-border/40 p-4 text-left transition-colors hover:bg-muted/40 ${
                  convo.active ? "bg-muted/60" : ""
                }`}
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs">
                    {convo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium">{convo.name}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {convo.time}
                    </span>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {convo.preview}
                  </p>
                  <Badge variant="outline" className="mt-1.5 h-5 text-[10px]">
                    {convo.channel}
                  </Badge>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
            <div>
              <p className="font-medium">Fatima B.</p>
              <p className="text-xs text-muted-foreground">WhatsApp</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              AI handled
            </Badge>
          </div>

          <ScrollArea className="flex-1 p-5">
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
                      <p className="mb-1 text-[10px] font-medium opacity-70">
                        AI · {msg.time}
                      </p>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-border/60 p-4">
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
