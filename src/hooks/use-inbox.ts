"use client";

import { useCallback, useEffect, useState } from "react";
import type { BackendConversation, BackendMessage } from "@/lib/backend/types";

interface ConversationsResponse {
  conversations: BackendConversation[];
}

interface MessagesResponse {
  messages: BackendMessage[];
}

export function useInbox(channelId?: string) {
  const [conversations, setConversations] = useState<BackendConversation[]>([]);
  const [messages, setMessages] = useState<BackendMessage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadConversations = useCallback(async () => {
    setError(null);
    try {
      const params = channelId ? `?channelId=${encodeURIComponent(channelId)}` : "";
      const response = await fetch(`/api/inbox/conversations${params}`, {
        cache: "no-store",
      });
      const body = (await response.json()) as ConversationsResponse & {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(body.error ?? "Failed to load conversations.");
      }
      const list = body.conversations ?? [];
      setConversations(list);
      setSelectedId((current) => current ?? list[0]?.id ?? null);
    } catch (err) {
      setConversations([]);
      setError(err instanceof Error ? err.message : "Failed to load conversations.");
    } finally {
      setLoading(false);
    }
  }, [channelId]);

  const loadMessages = useCallback(async (conversationId: string) => {
    setMessagesLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/inbox/conversations?conversationId=${encodeURIComponent(conversationId)}`,
        { cache: "no-store" },
      );
      const body = (await response.json()) as MessagesResponse & { error?: string };
      if (!response.ok) {
        throw new Error(body.error ?? "Failed to load messages.");
      }
      setMessages(body.messages ?? []);
    } catch (err) {
      setMessages([]);
      setError(err instanceof Error ? err.message : "Failed to load messages.");
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (selectedId) {
      void loadMessages(selectedId);
    } else {
      setMessages([]);
    }
  }, [selectedId, loadMessages]);

  return {
    conversations,
    messages,
    selectedId,
    setSelectedId,
    loading,
    messagesLoading,
    error,
    refresh: loadConversations,
  };
}
