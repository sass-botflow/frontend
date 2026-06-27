"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  CreditCard,
  Gift,
  Inbox,
  LayoutDashboard,
  PlugZap,
  Settings,
} from "lucide-react";
import { BotFlowLogo } from "@/components/brand/botflow-logo";
import { BOTTOM_NAV_ITEMS, MAIN_NAV_ITEMS, type NavIcon } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutDashboard,
  Inbox,
  Bot,
  PlugZap,
  Gift,
  Settings,
  CreditCard,
} satisfies Record<NavIcon, typeof LayoutDashboard>;

function NavLink({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: NavIcon;
  active: boolean;
}) {
  const Icon = iconMap[icon];

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
        active
          ? "bg-primary/10 font-medium text-primary shadow-[inset_0_0_0_1px_rgba(139,92,246,0.15)]"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </Link>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[15.5rem] shrink-0 flex-col border-r border-border/60 bg-sidebar md:flex">
      <Link
        href="/dashboard"
        className="flex h-14 items-center px-5 transition-colors hover:bg-sidebar-accent/50"
      >
        <BotFlowLogo size="md" />
      </Link>

      <nav className="flex flex-1 flex-col px-3 pt-2">
        <div className="space-y-0.5">
          {MAIN_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={isNavActive(pathname, item.href)}
            />
          ))}
        </div>

        <div className="mt-auto space-y-0.5 border-t border-border/60 pt-3 pb-3">
          {BOTTOM_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={isNavActive(pathname, item.href)}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}

export function DashboardMobileNav() {
  const pathname = usePathname();
  const mobileItems = MAIN_NAV_ITEMS.filter((item) =>
    [
      "/dashboard",
      "/dashboard/inbox",
      "/dashboard/channels",
      "/dashboard/brain",
      "/dashboard/settings",
    ].includes(item.href),
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 py-1.5">
        {mobileItems.map((item) => {
          const Icon = iconMap[item.icon];
          const active = isNavActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-medium transition-colors",
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
