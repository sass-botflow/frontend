"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";

const DASHBOARD_PATH = "/dashboard";

export function AuthRedirectIfSignedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const redirected = useRef(false);

  useEffect(() => {
    if (!isLoaded || redirected.current) return;

    if (isSignedIn || userId) {
      redirected.current = true;
      window.location.replace(DASHBOARD_PATH);
    }
  }, [isLoaded, isSignedIn, userId]);

  if (!isLoaded || isSignedIn || userId) {
    return (
      <div className="flex min-h-[240px] flex-col items-center justify-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    );
  }

  return children;
}
