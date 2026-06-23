"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Inbox, Radio, Users } from "lucide-react";
import { useLocale } from "@/components/providers/locale-provider";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { cn } from "@/lib/utils";

const tabConfig = [
  { id: "inbox", icon: Inbox },
  { id: "brain", icon: Bot },
  { id: "channels", icon: Radio },
  { id: "team", icon: Users },
] as const;

type TabId = (typeof tabConfig)[number]["id"];

export function ProductShowcase() {
  const { t } = useLocale();
  const [active, setActive] = useState<TabId>("inbox");

  const tabContent = {
    inbox: t.product.inbox,
    brain: t.product.brain,
    channels: t.product.channels,
    team: t.product.team,
  };

  const current = tabContent[active];
  const tabLabels: Record<TabId, string> = {
    inbox: t.product.tabs.inbox,
    brain: t.product.tabs.brain,
    channels: t.product.tabs.channels,
    team: t.product.tabs.team,
  };

  return (
    <section id="features" className="border-t border-border/60 bg-muted/10 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.product.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.product.subtitle}</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabConfig.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all",
                active === tab.id
                  ? "border-primary bg-primary/10 font-medium text-primary"
                  : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tabLabels[tab.id]}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {current.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{current.description}</p>
              <ul className="mt-6 space-y-3">
                {current.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                      ✓
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent blur-2xl" />
            <ShowcaseVisual tab={active} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcaseVisual({ tab }: { tab: TabId }) {
  const { t } = useLocale();

  if (tab === "channels") {
    return (
      <div className="relative grid grid-cols-3 gap-4 rounded-2xl border border-border/60 bg-card p-6">
        {(["whatsapp", "instagram", "tiktok"] as const).map((ch) => (
          <div
            key={ch}
            className="flex flex-col items-center gap-3 rounded-xl border border-border/40 bg-muted/20 p-4"
          >
            <ChannelLogo channel={ch} size="md" />
            <span className="text-xs font-medium capitalize">{ch}</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-600 dark:text-emerald-400">
              {t.product.connected}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (tab === "brain") {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        <div className="space-y-3">
          {t.product.wizardSteps.map((step, i) => (
            <div
              key={step}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-3",
                i === 2 ? "border-primary/40 bg-primary/5" : "border-border/40",
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
                  i <= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {i + 1}
              </span>
              <span className="text-sm font-medium">{step}</span>
              {i === 2 && (
                <span className="ml-auto text-[10px] text-primary">{t.product.inProgress}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === "team") {
    const members = [
      { name: "John Doe", role: t.product.roles.owner, initials: "JD" },
      { name: "Sara Ahmed", role: t.product.roles.admin, initials: "SA" },
      { name: "Mike Chen", role: t.product.roles.member, initials: "MC" },
    ];
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        {members.map((m) => (
          <div
            key={m.name}
            className="flex items-center justify-between border-b border-border/40 py-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {m.initials}
              </span>
              <div>
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
              </div>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-4">
      {t.product.inboxPreviews.map((msg, i) => (
        <div key={i} className="flex gap-3 border-b border-border/40 py-3 last:border-0">
          <ChannelLogo
            channel={(["whatsapp", "instagram", "tiktok"] as const)[i]}
            size="sm"
          />
          <p className="text-xs leading-relaxed text-muted-foreground">{msg}</p>
        </div>
      ))}
    </div>
  );
}
