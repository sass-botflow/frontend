"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useLocale } from "@/components/providers/locale-provider";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { getClerkLocalization } from "@/lib/clerk-localization";

export function ClerkLocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { locale } = useLocale();

  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/onboarding"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/onboarding"
      appearance={clerkAppearance}
      localization={getClerkLocalization(locale)}
    >
      {children}
    </ClerkProvider>
  );
}
