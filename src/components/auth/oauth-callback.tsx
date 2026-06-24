"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export function OAuthCallback() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 py-8">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">Connecting your Google account...</p>
      <AuthenticateWithRedirectCallback
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInForceRedirectUrl="/dashboard"
        signUpForceRedirectUrl="/onboarding"
        continueSignUpUrl="/sign-up"
      />
      <div id="clerk-captcha" />
    </div>
  );
}
