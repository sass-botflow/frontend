"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { IntegrationCardSkeleton } from "@/components/channels/channels-skeleton";
import { AppBanner } from "@/components/ui/app-banner";
import { Button } from "@/components/ui/button";
import { WhatsAppProfileCard } from "@/components/whatsapp-profiles/whatsapp-profile-card";
import { WhatsAppQrConnectModal } from "@/components/whatsapp-profiles/whatsapp-qr-connect-modal";
import { useWhatsAppSessions } from "@/hooks/use-whatsapp-sessions";

export function WhatsAppProfilesDashboard() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    sessions,
    loading,
    creating,
    error,
    clearError,
    createSession,
    qrOpen,
    activeSession,
    qrDataUrl,
    qrLoading,
    connecting,
    connectionStatus,
    qrError,
    closeQrModal,
    retryQr,
  } = useWhatsAppSessions({
    onConnected: ({ phoneNumber }) => {
      setSuccessMessage(
        phoneNumber
          ? `WhatsApp connected successfully (${phoneNumber}).`
          : "WhatsApp connected successfully.",
      );
    },
  });

  async function handleAddWhatsApp() {
    try {
      await createSession();
    } catch {
      // Error state handled by hook
    }
  }

  return (
    <>
      <DashboardHeader title="WhatsApp Profiles" />

      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(37,211,102,0.12),transparent_60%)]" />

        <div className="relative mx-auto max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                WhatsApp Profiles
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Link WhatsApp numbers by scanning a QR code — same flow as Qunvert.
                Each profile runs as its own session in your workspace.
              </p>
            </div>

            <Button
              onClick={() => void handleAddWhatsApp()}
              disabled={creating || qrOpen}
              className="h-11 shrink-0 rounded-xl bg-[#25D366] px-5 font-semibold text-white hover:bg-[#1fb855]"
            >
              {creating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Add WhatsApp
            </Button>
          </div>

          {successMessage ? (
            <AppBanner
              message={successMessage}
              variant="success"
              onDismiss={() => setSuccessMessage(null)}
            />
          ) : null}

          {error ? (
            <AppBanner message={error} variant="error" onDismiss={clearError} />
          ) : null}

          {loading ? (
            <div className="space-y-4">
              <IntegrationCardSkeleton />
              <IntegrationCardSkeleton />
            </div>
          ) : sessions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#25D366]/30 bg-background/40 px-6 py-12 text-center">
              <p className="text-sm font-medium text-foreground">
                No WhatsApp profiles yet
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Click <strong>Add WhatsApp</strong> to create a session and scan
                the QR code.
              </p>
              <Button
                onClick={() => void handleAddWhatsApp()}
                disabled={creating || qrOpen}
                className="mt-6 h-11 rounded-xl bg-[#25D366] font-semibold text-white hover:bg-[#1fb855]"
              >
                {creating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Add WhatsApp
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session, index) => (
                <WhatsAppProfileCard key={session.id} session={session} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      <WhatsAppQrConnectModal
        open={qrOpen}
        session={activeSession}
        qrDataUrl={qrDataUrl}
        qrLoading={qrLoading}
        connecting={connecting}
        connectionStatus={connectionStatus}
        error={qrError}
        onClose={closeQrModal}
        onRetry={() => void retryQr()}
      />
    </>
  );
}
