"use client";

import { useMemo, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { ChannelBadge } from "@/components/channels/channel-badge";
import { AppBanner } from "@/components/ui/app-banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useInbox } from "@/hooks/use-inbox";
import { formatRelativeTime } from "@/lib/utils";
import { MessageSquare, RefreshCw } from "lucide-react";
import Link from "next/link";

export function InboxDashboard() {
  const {
    conversations,
    messages,
    selectedId,
    setSelectedId,
    loading,
    messagesLoading,
    error,
    refresh,
  } = useInbox();

  const [search, setSearch] = useState("");
  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return conversations;
    return conversations.filter((c) => {
      const name = (c.contactName ?? "").toLowerCase();
      const phone = (c.contactPhone ?? "").toLowerCase();
      const preview = (c.lastMessage ?? "").toLowerCase();
      return name.includes(query) || phone.includes(query) || preview.includes(query);
    });
  }, [conversations, search]);

  return (
    <>
      <DashboardHeader title="Inbox" />
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <div className="w-full shrink-0 border-b border-border/60 md:w-80 md:border-b-0 md:border-r">
          <div className="flex items-center gap-2 border-b border-border/60 p-3">
            <Input
              placeholder="Search conversations..."
              className="h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 shrink-0"
              onClick={() => void refresh()}
              aria-label="Refresh inbox"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          {error && (
            <div className="p-3">
              <AppBanner message={error} variant="error" autoDismissMs={0} />
            </div>
          )}

          <ScrollArea className="h-48 md:h-[calc(100vh-7rem)]">
            {loading ? (
              <div className="space-y-2 p-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-xl" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground/50" />
                <p className="text-sm font-medium">No conversations yet</p>
                <p className="text-xs text-muted-foreground">
                  Messages appear here when customers write to your connected
                  WhatsApp number.
                </p>
                <Button asChild size="sm" variant="outline">
                  <Link href="/dashboard/channels">Connect WhatsApp</Link>
                </Button>
              </div>
            ) : (
              filtered.map((convo) => (
                <button
                  key={convo.id}
                  type="button"
                  onClick={() => setSelectedId(convo.id)}
                  className={`flex w-full items-start gap-3 border-b border-border/40 p-4 text-left transition-colors hover:bg-muted/40 ${
                    selectedId === convo.id ? "bg-muted/60" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-xs">
                        {(convo.contactName ?? convo.contactPhone ?? "?")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 rounded-full ring-2 ring-background">
                      <ChannelLogo
                        channel="whatsapp"
                        size="sm"
                        className="!h-5 !w-5 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">
                        {convo.contactName ?? convo.contactPhone ?? "Unknown"}
                      </p>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {convo.lastMessageAt
                          ? formatRelativeTime(convo.lastMessageAt)
                          : ""}
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {convo.lastMessage ?? "No messages yet"}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <ChannelBadge channel="whatsapp" />
                      {(convo.unreadCount ?? 0) > 0 && (
                        <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                          {convo.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </ScrollArea>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {selected ? (
            <>
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <ChannelLogo
                    channel="whatsapp"
                    size="md"
                    className="!h-10 !w-10 rounded-xl"
                  />
                  <div>
                    <p className="font-medium">
                      {selected.contactName ?? selected.contactPhone ?? "Conversation"}
                    </p>
                    {selected.contactPhone && (
                      <p className="text-xs text-muted-foreground">
                        {selected.contactPhone}
                      </p>
                    )}
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  AI handled
                </Badge>
              </div>

              <ScrollArea className="flex-1 p-4 sm:p-5">
                {messagesLoading ? (
                  <div className="mx-auto max-w-xl space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-14 w-3/4 rounded-2xl" />
                    ))}
                  </div>
                ) : messages.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground">
                    No messages in this conversation yet.
                  </p>
                ) : (
                  <div className="mx-auto max-w-xl space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.direction === "inbound" ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            msg.direction === "outbound"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          {msg.direction === "outbound" && (
                            <p className="mb-1 text-[10px] font-medium opacity-70">
                              AI · {formatMessageTime(msg.createdAt)}
                            </p>
                          )}
                          {msg.body}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                Select a conversation to view message history.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function formatMessageTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}
