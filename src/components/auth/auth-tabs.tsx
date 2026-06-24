"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

export function AuthTabs() {
  const pathname = usePathname();
  const { t } = useLocale();
  const isSignIn = pathname.startsWith("/sign-in");

  return (
    <div className="auth-tabs mb-6 grid w-full grid-cols-2 gap-1 rounded-2xl border border-border/60 bg-muted/30 p-1">
      <Link
        href="/sign-in"
        className={cn(
          "rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-all",
          isSignIn
            ? "auth-tab-active bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {t.auth.signInTab}
      </Link>
      <Link
        href="/sign-up"
        className={cn(
          "rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-all",
          !isSignIn
            ? "auth-tab-active bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {t.auth.signUpTab}
      </Link>
    </div>
  );
}
