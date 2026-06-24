"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/marketing/language-switcher";
import { AuthTabs } from "@/components/auth/auth-tabs";
import { useLocale } from "@/components/providers/locale-provider";

export function AuthShell({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();

  return (
    <div className="auth-neon-page relative flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 py-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#39ff14]/[0.07] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,255,20,0.04)_0%,transparent_65%)]" />
      </div>

      <div className="absolute right-6 top-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center">
        <p className="mb-8 text-center text-sm font-medium tracking-wide text-gray-400">
          {t.auth.tagline}
        </p>

        <AuthTabs />

        <div className="w-full">{children}</div>

        <p className="mt-8 text-center text-xs text-gray-600">{t.auth.copyright}</p>
      </div>
    </div>
  );
}
