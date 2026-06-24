"use client";

import { useEffect, useRef } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { hardRedirect } from "@/lib/auth-navigate";
import { Button } from "@/components/ui/button";

const DASHBOARD_PATH = "/dashboard";

export function AuthRedirectIfSignedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, userId, sessionId } = useAuth();
  const { signOut } = useClerk();
  const redirected = useRef(false);

  const hasSession = Boolean(isSignedIn || userId || sessionId);

  useEffect(() => {
    if (!isLoaded || redirected.current || !hasSession) return;

    redirected.current = true;
    hardRedirect(DASHBOARD_PATH);
  }, [isLoaded, hasSession]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (hasSession) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          You&apos;re already signed in. Opening your dashboard...
        </p>
        <Button
          type="button"
          className="auth-clerk-primary h-11 px-6 font-semibold"
          onClick={() => hardRedirect(DASHBOARD_PATH)}
        >
          Continue to Dashboard
        </Button>
        <button
          type="button"
          className="text-xs text-muted-foreground underline-offset-4 hover:underline"
          onClick={() => signOut({ redirectUrl: "/sign-in" })}
        >
          Sign out and use another account
        </button>
      </div>
    );
  }

  return children;
}
