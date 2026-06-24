"use client";

import { HandleSSOCallback } from "@clerk/react";
import { finishAuthAndRedirect } from "@/lib/auth-navigate";

export function OAuthCallback() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 py-8">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">Connecting your Google account...</p>
      <HandleSSOCallback
        navigateToApp={async () => {
          await finishAuthAndRedirect("/dashboard");
        }}
        navigateToSignIn={() => {
          window.location.href = "/sign-in";
        }}
        navigateToSignUp={() => {
          window.location.href = "/sign-up";
        }}
      />
      <div id="clerk-captcha" />
    </div>
  );
}
