"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { BotFlowLogo } from "@/components/brand/botflow-logo";
import { INSTAGRAM_OAUTH_MESSAGE } from "@/lib/integrations/instagram-types";

export function InstagramOAuthCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");
    const username = searchParams.get("username");
    const displayName = searchParams.get("displayName");
    const profilePictureUrl = searchParams.get("profilePictureUrl");
    const origin = window.location.origin;

    if (window.opener && !window.opener.closed) {
      if (error) {
        window.opener.postMessage(
          {
            type: INSTAGRAM_OAUTH_MESSAGE,
            status: "error",
            message: error,
          },
          origin,
        );
      } else {
        window.opener.postMessage(
          {
            type: INSTAGRAM_OAUTH_MESSAGE,
            status: "success",
            username: username ?? "",
            displayName: displayName ?? username ?? "Instagram",
            profilePictureUrl: profilePictureUrl || null,
          },
          origin,
        );
      }

      window.setTimeout(() => window.close(), 300);
      return;
    }

    if (error) {
      router.replace(`/dashboard/channels?error=${encodeURIComponent(error)}`);
      return;
    }

    router.replace("/dashboard/channels?connected=instagram&success=1");
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <BotFlowLogo className="mx-auto h-8" />
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#DD2A7B]" />
        <div className="space-y-2">
          <h1 className="text-xl font-semibold tracking-tight">Connecting Instagram</h1>
          <p className="text-sm text-muted-foreground">Returning to BotFlow…</p>
        </div>
      </div>
    </div>
  );
}
