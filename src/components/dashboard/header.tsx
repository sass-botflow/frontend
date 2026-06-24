"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { HelpCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { LanguageSwitcher } from "@/components/marketing/language-switcher";
import { Button } from "@/components/ui/button";

export function DashboardHeader({ title }: { title?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-14 items-center justify-between border-b border-border/60 px-6">
      <h1 className="text-base font-semibold tracking-tight">{title}</h1>

      <div className="flex items-center gap-1">
        <LanguageSwitcher variant="compact" />
        <Button variant="ghost" size="sm" className="hidden h-8 gap-1.5 text-muted-foreground sm:inline-flex" asChild>
          <Link href="/dashboard/settings/support">
            <HelpCircle className="h-4 w-4" />
            Support
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 sm:hidden" asChild>
          <Link href="/dashboard/settings/support" aria-label="Support">
            <HelpCircle className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        </Button>

        <UserButton
          userProfileMode="navigation"
          userProfileUrl="/dashboard/settings/profile"
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
            },
          }}
        />
      </div>
    </header>
  );
}
