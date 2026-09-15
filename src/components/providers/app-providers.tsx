"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { ClerkLocaleProvider } from "@/components/providers/clerk-locale-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { FloatingSupport } from "@/components/support/floating-support";

export function AppProviders({
  children,
  clerkPublishableKey,
}: {
  children: React.ReactNode;
  clerkPublishableKey?: string;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        <LocaleProvider>
          <ClerkLocaleProvider publishableKey={clerkPublishableKey}>
            {children}
            <FloatingSupport />
          </ClerkLocaleProvider>
        </LocaleProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
