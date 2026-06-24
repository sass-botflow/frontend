"use client";

import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/nextjs/legacy";
import { useLocale } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { getOAuthCallbackUrl, SSO_CALLBACK } from "@/lib/auth-oauth";

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

interface GoogleAuthButtonProps {
  mode: "sign-in" | "sign-up";
}

export function GoogleAuthButton({ mode }: GoogleAuthButtonProps) {
  const { t } = useLocale();
  const { isLoaded, signIn } = useSignIn();
  const { isLoaded: signUpLoaded, signUp } = useSignUp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogle() {
    setError(null);
    setLoading(true);

    const callbackUrl = getOAuthCallbackUrl(SSO_CALLBACK);

    try {
      if (mode === "sign-in") {
        if (!isLoaded || !signIn) {
          setLoading(false);
          return;
        }

        await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: callbackUrl,
          redirectUrlComplete: "/dashboard",
          oidcPrompt: "select_account",
        });
        return;
      }

      if (!signUpLoaded || !signUp) {
        setLoading(false);
        return;
      }

      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: callbackUrl,
        redirectUrlComplete: "/onboarding",
        oidcPrompt: "select_account",
      });
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "errors" in err
          ? (err as { errors: { longMessage?: string; message: string }[] }).errors[0]
              ?.longMessage ||
            (err as { errors: { message: string }[] }).errors[0]?.message
          : t.auth.googleError;
      setError(message ?? t.auth.googleError);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="outline"
        className="h-11 w-full gap-3 border-border/60 bg-background font-medium hover:bg-muted/40"
        onClick={handleGoogle}
        disabled={loading}
      >
        <GoogleIcon />
        {loading ? t.auth.connectingGoogle : t.auth.continueGoogle}
      </Button>
      {error && <p className="text-center text-sm text-destructive">{error}</p>}
    </div>
  );
}
