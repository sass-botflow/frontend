"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Inbox, Radio, Users } from "lucide-react";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { cn } from "@/lib/utils";

const tabs = [
  {
    id: "inbox",
    label: "Unified Inbox",
    icon: Inbox,
    title: "All conversations in one place",
    description:
      "WhatsApp, Instagram, and TikTok messages flow into a single inbox. See AI replies, jump in anytime, and never miss a lead.",
    highlights: ["Real-time sync", "AI + human handoff", "Conversation history"],
  },
  {
    id: "brain",
    label: "AI Brain",
    icon: Bot,
    title: "Teach AI about your business in 5 minutes",
    description:
      "A guided wizard helps you set business type, goals, and knowledge. No prompts to write — BotFlow generates everything for you.",
    highlights: ["5-step wizard", "PDF & website training", "Multi-language"],
  },
  {
    id: "channels",
    label: "Channels",
    icon: Radio,
    title: "Connect every channel your customers use",
    description:
      "Official WhatsApp Business API, Instagram DMs, and TikTok messages — all managed from one dashboard.",
    highlights: ["One-click connect", "Branded channel logos", "Status monitoring"],
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    title: "Collaborate with your whole team",
    description:
      "Invite team members, assign roles, and let anyone reply when the AI needs a human touch.",
    highlights: ["Role permissions", "Activity logs", "Shared inbox"],
  },
];

export function ProductShowcase() {
  const [active, setActive] = useState("inbox");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section id="features" className="border-t border-border/60 bg-muted/10 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Automate. Reply. Scale.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to run customer communication on autopilot.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
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
              {tab.label}
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
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {current.description}
              </p>
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

function ShowcaseVisual({ tab }: { tab: string }) {
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
              Connected
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
          {["Business type", "Goals", "Knowledge", "Generate AI"].map((step, i) => (
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
                <span className="ml-auto text-[10px] text-primary">In progress</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === "team") {
    return (
      <div className="rounded-2xl border border-border/60 bg-card p-6">
        {[
          { name: "John Doe", role: "Owner", initials: "JD" },
          { name: "Sara Ahmed", role: "Admin", initials: "SA" },
          { name: "Mike Chen", role: "Member", initials: "MC" },
        ].map((m) => (
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
      {[
        { ch: "whatsapp" as const, msg: "AI: Our clinic is open Mon-Sat 9am-6pm" },
        { ch: "instagram" as const, msg: "AI: Yes, we deliver to Casablanca!" },
        { ch: "tiktok" as const, msg: "AI: The price is 299 MAD with free shipping." },
      ].map((item) => (
        <div key={item.ch} className="flex gap-3 border-b border-border/40 py-3 last:border-0">
          <ChannelLogo channel={item.ch} size="sm" />
          <p className="text-xs leading-relaxed text-muted-foreground">{item.msg}</p>
        </div>
      ))}
    </div>
  );
}
