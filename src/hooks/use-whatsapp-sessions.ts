"use client";

import { useCallback, useEffect, useState } from "react";
import type { WhatsAppSession } from "@/lib/whatsapp/types";

interface CreateSessionResponse {
  session: WhatsAppSession;
  error?: string;
}

interface ListSessionsResponse {
  sessions: WhatsAppSession[];
  error?: string;
}

export function useWhatsAppSessions() {
  const [sessions, setSessions] = useState<WhatsAppSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("/api/whatsapp/sessions", { cache: "no-store" });
      const body = (await response.json()) as ListSessionsResponse;
      if (!response.ok) {
        throw new Error(body.error ?? "Failed to load WhatsApp profiles.");
      }
      setSessions(body.sessions ?? []);
    } catch (err) {
      setSessions([]);
      setError(err instanceof Error ? err.message : "Failed to load WhatsApp profiles.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const createSession = useCallback(async () => {
    setCreating(true);
    setError(null);

    try {
      const profileName = `WhatsApp Profile ${sessions.length + 1}`;
      const response = await fetch("/api/whatsapp/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileName }),
      });
      const body = (await response.json()) as CreateSessionResponse;
      if (!response.ok) {
        throw new Error(body.error ?? "Failed to create WhatsApp profile.");
      }

      setSessions((current) => {
        const exists = current.some((session) => session.id === body.session.id);
        if (exists) {
          return current.map((session) =>
            session.id === body.session.id ? body.session : session,
          );
        }
        return [body.session, ...current];
      });

      return body.session;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create WhatsApp profile.";
      setError(message);
      throw err;
    } finally {
      setCreating(false);
    }
  }, [sessions.length]);

  return {
    sessions,
    loading,
    creating,
    error,
    clearError: () => setError(null),
    refresh: load,
    createSession,
  };
}
