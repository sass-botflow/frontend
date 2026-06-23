"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { FloatingSupport } from "@/components/support/floating-support";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <FloatingSupport />
    </ThemeProvider>
  );
}
