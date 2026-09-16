"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export function BetterAuthRedirectIfSignedIn({
  children,
  redirectTo = "/dashboard",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const { data: session, isPending } = useSession();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session?.session) return;

    setRedirecting(true);
    window.location.href = redirectTo;
  }, [isPending, session, redirectTo]);

  if (isPending || redirecting || session?.session) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
