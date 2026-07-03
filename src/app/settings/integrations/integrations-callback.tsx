"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AppBanner } from "@/components/ui/app-banner";
import { BotFlowLogo } from "@/components/brand/botflow-logo";

export function IntegrationsOAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Completing WhatsApp connection...");

  useEffect(() => {
    const success = searchParams.get("success");
    const error = searchParams.get("error");
    const connected = searchParams.get("connected");

    if (error) {
      setStatus("error");
      setMessage(decodeURIComponent(error));
      const timer = window.setTimeout(() => {
        router.replace(`/dashboard/channels?error=${encodeURIComponent(error)}`);
      }, 2500);
      return () => window.clearTimeout(timer);
    }

    if (success || connected) {
      setStatus("success");
      setMessage("WhatsApp Business connected successfully.");
      const timer = window.setTimeout(() => {
        router.replace("/dashboard/channels?connected=whatsapp");
      }, 1800);
      return () => window.clearTimeout(timer);
    }

    const fallback = window.setTimeout(() => {
      router.replace("/dashboard/channels");
    }, 3000);
    return () => window.clearTimeout(fallback);
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <BotFlowLogo className="mx-auto h-8" />

        <div className="space-y-4">
          {status === "loading" && (
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
          )}
          <h1 className="text-xl font-semibold tracking-tight">
            {status === "loading"
              ? "Connecting WhatsApp"
              : status === "success"
                ? "Connected!"
                : "Connection failed"}
          </h1>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>

        <AppBanner
          message={
            status === "success"
              ? "Redirecting to your channels..."
              : status === "error"
                ? "Redirecting back to channels..."
                : null
          }
          variant={status === "error" ? "error" : "success"}
          autoDismissMs={0}
        />
      </div>
    </div>
  );
}
