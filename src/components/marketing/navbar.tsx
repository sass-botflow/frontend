"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BotFlowLogo } from "@/components/brand/botflow-logo";
import { AuthNavActions } from "@/components/auth/auth-nav-actions";
import { LanguageSwitcher } from "@/components/marketing/language-switcher";
import { useLocale, useLocalizedPath } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MarketingNavbar() {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLocale();
  const lp = useLocalizedPath();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#how-it-works", label: t.nav.howItWorks },
    { href: "#features", label: t.nav.features },
    { href: "#channels", label: t.nav.channels },
    { href: "#faq", label: t.nav.faq },
    { href: lp("/pricing"), label: t.nav.pricing },
  ];

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href={lp("/")} className="transition-opacity hover:opacity-90">
          <BotFlowLogo size="lg" />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/40 bg-card/30 px-2 py-1 backdrop-blur-xl md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          </Button>
          <AuthNavActions
            signInLabel={t.nav.signIn}
            signUpLabel={t.nav.startFree}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden",
          mobileOpen ? "max-h-[28rem]" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex items-center justify-between border-t border-border/40 pt-4">
            <span className="px-3 text-xs text-muted-foreground">Language</span>
            <LanguageSwitcher />
          </div>
          <AuthNavActions
            layout="mobile"
            signInLabel={t.nav.signIn}
            signUpLabel={t.nav.startFree}
            className="mt-2 flex flex-col gap-2"
          />
        </nav>
      </div>
    </motion.header>
  );
}
