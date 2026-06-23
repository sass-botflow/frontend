"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  CreditCard,
  HelpCircle,
  Inbox,
  Radio,
  Settings,
  Users,
} from "lucide-react";
import { BotFlowLogo } from "@/components/brand/botflow-logo";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

const iconMap = {
  Radio,
  Brain,
  Inbox,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
} as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-border/60 bg-sidebar md:flex">
      <Link
        href="/dashboard/channels"
        className="flex h-16 items-center border-b border-border/60 px-5 transition-colors hover:bg-sidebar-accent/50"
      >
        <BotFlowLogo size="md" />
      </Link>

      <nav className="flex-1 space-y-0.5 p-3">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active = isNavActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/60 p-4">
        <p className="text-xs text-muted-foreground">
          Connect a channel, set up your AI Brain, and you&apos;re live.
        </p>
      </div>
    </aside>
  );
}

function isNavActive(pathname: string, href: string) {
  if (href === "/dashboard/settings/support") {
    return pathname.startsWith(href);
  }
  if (href === "/dashboard/settings") {
    return pathname.startsWith(href) && !pathname.startsWith("/dashboard/settings/support");
  }
  return pathname.startsWith(href);
}
