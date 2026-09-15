"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { useLocale } from "@/components/providers/locale-provider";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { getClerkLocalization } from "@/lib/clerk-localization";

export function ClerkLocaleProvider({
  children,
  publishableKey,
}: {
  children: React.ReactNode;
  publishableKey?: string;
}) {
  const { locale } = useLocale();

  if (!publishableKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      signInForceRedirectUrl="/dashboard"
      signUpForceRedirectUrl="/dashboard"
      appearance={clerkAppearance}
      localization={getClerkLocalization(locale)}
    >
      {children}
    </ClerkProvider>
  );
}
