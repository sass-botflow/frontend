"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { ClerkLocaleProvider } from "@/components/providers/clerk-locale-provider";
import { FloatingSupport } from "@/components/support/floating-support";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LocaleProvider>
        <ClerkLocaleProvider>
          {children}
          <FloatingSupport />
        </ClerkLocaleProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
