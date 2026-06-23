import Link from "next/link";
import { Zap } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

const footerLinks = {
  Product: [
    { href: "#how-it-works", label: "How it works" },
    { href: "#features", label: "Features" },
    { href: "#channels", label: "Channels" },
    { href: "/pricing", label: "Pricing" },
  ],
  Company: [
    { href: "/login", label: "Sign in" },
    { href: "/register", label: "Start free" },
    { href: "#faq", label: "FAQ" },
  ],
  Support: [
    { href: "/dashboard/settings/support", label: "Help Center" },
    { href: "mailto:support@botflow.ink", label: "Contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/10">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </span>
              {APP_NAME}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI customer automation for WhatsApp, Instagram, and TikTok.
              Built for businesses that want to reply faster without hiring more staff.
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
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
