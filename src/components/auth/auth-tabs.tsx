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
    <div className="auth-tabs mb-6 grid w-full grid-cols-2 gap-1 rounded-2xl border border-white/[0.08] bg-[#0d0d0d] p-1">
      <Link
        href="/sign-in"
        className={cn(
          "rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-all",
          isSignIn
            ? "auth-tab-active bg-[#39ff14] text-black shadow-[0_0_28px_rgba(57,255,20,0.45)]"
            : "text-gray-400 hover:text-white",
        )}
      >
        {t.auth.signInTab}
      </Link>
      <Link
        href="/sign-up"
        className={cn(
          "rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-all",
          !isSignIn
            ? "auth-tab-active bg-[#39ff14] text-black shadow-[0_0_28px_rgba(57,255,20,0.45)]"
            : "text-gray-400 hover:text-white",
        )}
      >
        {t.auth.signUpTab}
      </Link>
    </div>
  );
}
