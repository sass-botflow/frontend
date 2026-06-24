"use client";

import Link from "next/link";
import { BotFlowLogo } from "@/components/brand/botflow-logo";
import { LanguageSwitcher } from "@/components/marketing/language-switcher";
import { AuthCard } from "@/components/auth/auth-card";
import { useLocale } from "@/components/providers/locale-provider";

export function AuthShell({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();

  return (
    <div className="auth-page relative flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute left-1/2 top-1/4 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />

      <div className="absolute right-6 top-6 z-20">
        <LanguageSwitcher />
      </div>

      <div className="relative z-10 flex w-full max-w-[440px] flex-col items-center">
        <Link
          href="/en"
          className="mb-3 flex flex-col items-center transition-transform hover:scale-[1.02]"
        >
          <BotFlowLogo size="2xl" />
        </Link>

        <p className="mb-8 text-center text-sm text-muted-foreground">
          {t.auth.tagline}
        </p>

        <AuthCard>{children}</AuthCard>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          {t.auth.copyright}
        </p>
      </div>
    </div>
  );
}
