"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError, toApiError } from "@/lib/api/api-error";
import {
  createWhatsAppSession,
  fetchWhatsAppQr,
  fetchWhatsAppSessions,
  fetchWhatsAppStatus,
} from "@/lib/whatsapp/api";
import type { WhatsAppSession } from "@/lib/whatsapp/types";
import {
  isWhatsAppQrExpired,
  isWhatsAppSessionConnected,
  toQrDataUrl,
} from "@/lib/whatsapp/types";

const STATUS_POLL_MS = 3000;

interface UseWhatsAppSessionsOptions {
  onConnected?: (payload: { sessionId: string; phoneNumber?: string }) => void;
}

export function useWhatsAppSessions(options?: UseWhatsAppSessionsOptions) {
  const [sessions, setSessions] = useState<WhatsAppSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const [qrOpen, setQrOpen] = useState(false);
  const [activeSession, setActiveSession] = useState<WhatsAppSession | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>("pending");
  const [qrError, setQrError] = useState<ApiError | null>(null);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onConnectedRef = useRef(options?.onConnected);

  useEffect(() => {
    onConnectedRef.current = options?.onConnected;
  }, [options?.onConnected]);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const load = useCallback(async () => {
    setError(null);
    try {
      const list = await fetchWhatsAppSessions();
      setSessions(list);
    } catch (err) {
      setSessions([]);
      setError(toApiError(err, "/api/whatsapp/sessions"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const loadQr = useCallback(async (sessionId: string) => {
    setQrLoading(true);
    setQrError(null);

    try {
      let qr = await fetchWhatsAppQr(sessionId);
      if (qr.expired) {
        qr = await fetchWhatsAppQr(sessionId);
      }
      setQrDataUrl(toQrDataUrl(qr.qr));
    } catch (err) {
      setQrError(toApiError(err, `/api/whatsapp/sessions/${sessionId}/qr`));
      throw err;
    } finally {
      setQrLoading(false);
    }
  }, []);

  const closeQrModal = useCallback(() => {
    stopPolling();
    setQrOpen(false);
    setActiveSession(null);
    setQrDataUrl(null);
    setQrLoading(false);
    setConnecting(false);
    setConnectionStatus("pending");
    setQrError(null);
  }, [stopPolling]);

  const checkStatus = useCallback(
    async (sessionId: string) => {
      const statusResponse = await fetchWhatsAppStatus(sessionId);
      setConnectionStatus(statusResponse.status);

      if (isWhatsAppSessionConnected(statusResponse.status)) {
        stopPolling();
        setConnecting(false);
        setQrOpen(false);
        setActiveSession(null);
        setQrDataUrl(null);
        await load();
        onConnectedRef.current?.({
          sessionId,
          phoneNumber: statusResponse.phoneNumber,
        });
        return;
      }

      if (isWhatsAppQrExpired(statusResponse.status)) {
        await loadQr(sessionId);
      }
    },
    [load, loadQr, stopPolling],
  );

  const startStatusPolling = useCallback(
    (sessionId: string) => {
      stopPolling();
      setConnecting(true);

      void checkStatus(sessionId).catch((err) => {
        setQrError(toApiError(err, `/api/whatsapp/sessions/${sessionId}/status`));
        setConnecting(false);
      });

      pollRef.current = setInterval(() => {
        void checkStatus(sessionId).catch((err) => {
          setQrError(toApiError(err, `/api/whatsapp/sessions/${sessionId}/status`));
        });
      }, STATUS_POLL_MS);
    },
    [checkStatus, stopPolling],
  );

  const openQrConnect = useCallback(
    async (session: WhatsAppSession) => {
      setActiveSession(session);
      setQrOpen(true);
      setConnectionStatus(session.status);
      setQrError(null);

      try {
        await loadQr(session.id);
        startStatusPolling(session.id);
      } catch {
        setConnecting(false);
      }
    },
    [loadQr, startStatusPolling],
  );

  const createSession = useCallback(
    async (displayName?: string) => {
      setCreating(true);
      setError(null);

      try {
        const name = displayName ?? `WhatsApp Profile ${sessions.length + 1}`;
        const session = await createWhatsAppSession(name);

        setSessions((current) => {
          const exists = current.some((item) => item.id === session.id);
          if (exists) {
            return current.map((item) => (item.id === session.id ? session : item));
          }
          return [session, ...current];
        });

        await openQrConnect(session);
        return session;
      } catch (err) {
        setError(toApiError(err, "/api/whatsapp/sessions"));
        throw err;
      } finally {
        setCreating(false);
      }
    },
    [openQrConnect, sessions.length],
  );

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  return {
    sessions,
    loading,
    creating,
    error,
    clearError: () => setError(null),
    refresh: load,
    createSession,
    qrOpen,
    activeSession,
    qrDataUrl,
    qrLoading,
    connecting,
    connectionStatus,
    qrError,
    closeQrModal,
    retryQr: async () => {
      if (!activeSession) return;
      try {
        await loadQr(activeSession.id);
        startStatusPolling(activeSession.id);
      } catch {
        // qrError set in loadQr
      }
    },
  };
}
