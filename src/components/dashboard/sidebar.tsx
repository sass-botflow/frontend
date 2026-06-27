"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  Gift,
  Inbox,
  LayoutDashboard,
  PlugZap,
  Settings,
} from "lucide-react";
import { BotFlowLogo } from "@/components/brand/botflow-logo";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";

const iconMap = {
  LayoutDashboard,
  Inbox,
  Bot,
  PlugZap,
  Gift,
  Settings,
} as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-border/60 bg-sidebar md:flex">
      <Link
        href="/dashboard"
        className="flex h-16 items-center border-b border-border/60 px-5 transition-colors hover:bg-sidebar-accent/50"
      >
        <BotFlowLogo size="md" />
      </Link>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active = isNavActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                active
                  ? "bg-primary/10 font-medium text-primary shadow-[inset_0_0_0_1px_rgba(139,92,246,0.15)]"
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
        <p className="text-xs leading-relaxed text-muted-foreground">
          Connect your apps, train your bot, and reply to customers automatically.
        </p>
      </div>
    </aside>
  );
}

export function DashboardMobileNav() {
  const pathname = usePathname();
  const mobileItems = NAV_ITEMS.filter((item) =>
    [
      "/dashboard",
      "/dashboard/inbox",
      "/dashboard/channels",
      "/dashboard/brain",
      "/dashboard/settings",
    ].includes(item.href),
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 py-2">
        {mobileItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active = isNavActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[10px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function isNavActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  if (href === "/dashboard/settings") {
    return pathname.startsWith("/dashboard/settings");
  }
  return pathname.startsWith(href);
}
