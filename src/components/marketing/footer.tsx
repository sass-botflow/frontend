"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useLocale, useLocalizedPath } from "@/components/providers/locale-provider";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  const { t } = useLocale();
  const lp = useLocalizedPath();

  const footerLinks = {
    [t.footer.product]: [
      { href: "#how-it-works", label: t.nav.howItWorks },
      { href: "#features", label: t.nav.features },
      { href: "#channels", label: t.nav.channels },
      { href: lp("/pricing"), label: t.nav.pricing },
    ],
    [t.footer.company]: [
      { href: "/login", label: t.nav.signIn },
      { href: "/register", label: t.nav.startFree },
      { href: "#faq", label: t.nav.faq },
    ],
    [t.footer.support]: [
      { href: "/dashboard/settings/support", label: t.footer.helpCenter },
      { href: "mailto:support@botflow.ink", label: t.footer.contact },
    ],
  };

  return (
    <footer className="border-t border-border/60 bg-muted/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href={lp("/")} className="flex items-center gap-2.5 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </span>
              {APP_NAME}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {APP_NAME}. {t.footer.rights}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">{t.footer.privacy}</Link>
            <Link href="#" className="hover:text-foreground">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
