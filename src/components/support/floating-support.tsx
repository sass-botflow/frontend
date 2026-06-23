"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  Headphones,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SupportView = "menu" | "chat";

const menuOptions = [
  {
    id: "chat",
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our team in real time",
    badge: "Online",
    accent: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    id: "help",
    icon: BookOpen,
    title: "Help Center",
    description: "Guides, tutorials & documentation",
    href: "/dashboard/settings/support",
    accent: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    id: "contact",
    icon: Mail,
    title: "Contact Support",
    description: "Email us or submit a support ticket",
    href: "/dashboard/settings/support",
    accent: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-500/10",
  },
] as const;

export function FloatingSupport() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<SupportView>("menu");
  const [message, setMessage] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setView("menu");
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
        setView("menu");
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  function handleToggle() {
    setOpen((prev) => {
      if (prev) setView("menu");
      return !prev;
    });
  }

  function handleOptionClick(optionId: string) {
    if (optionId === "chat") {
      setView("chat");
      return;
    }
    setOpen(false);
    setView("menu");
  }

  return (
    <div
      ref={panelRef}
      className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-2xl shadow-black/10 backdrop-blur-xl dark:shadow-black/40"
          >
            {view === "menu" ? (
              <SupportMenu onSelect={handleOptionClick} onClose={() => setOpen(false)} />
            ) : (
              <LiveChatPanel
                message={message}
                onMessageChange={setMessage}
                onBack={() => setView("menu")}
                onClose={() => {
                  setOpen(false);
                  setView("menu");
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleToggle}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-label={open ? "Close support" : "Open support"}
        aria-expanded={open}
        className={cn(
          "group relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-shadow",
          "bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] text-primary-foreground",
          "ring-1 ring-white/20 hover:shadow-xl",
          open && "ring-2 ring-primary/30",
        )}
      >
        <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-card bg-emerald-500" />
        </span>

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Headphones className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {!open && (
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-none absolute bottom-4 right-16 hidden rounded-full border border-border/60 bg-card/90 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:block"
        >
          Need help?
        </motion.span>
      )}
    </div>
  );
}

function SupportMenu({
  onSelect,
  onClose,
}: {
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="border-b border-border/40 bg-gradient-to-br from-primary/5 via-transparent to-transparent px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold tracking-tight">How can we help?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Our team is here for you — typically replies in under 2 minutes.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 text-muted-foreground"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex -space-x-2">
            {["SA", "MK", "JD"].map((initials) => (
              <Avatar key={initials} className="h-7 w-7 border-2 border-card">
                <AvatarFallback className="bg-primary/10 text-[10px] font-medium text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Verified support team
          </div>
        </div>
      </div>

      <div className="p-2">
        {menuOptions.map((option) => {
          const Icon = option.icon;
          const content = (
            <div className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-muted/50">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  option.iconBg,
                )}
              >
                <Icon className={cn("h-5 w-5", option.accent)} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{option.title}</p>
                  {"badge" in option && option.badge && (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                      {option.badge}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60" />
            </div>
          );

          if ("href" in option && option.href) {
            return (
              <Link
                key={option.id}
                href={option.href}
                onClick={() => onSelect(option.id)}
                className="block"
              >
                {content}
              </Link>
            );
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="block w-full"
            >
              {content}
            </button>
          );
        })}
      </div>

      <div className="border-t border-border/40 px-5 py-3">
        <p className="text-center text-[11px] text-muted-foreground">
          BotFlow Support · Encrypted & secure
        </p>
      </div>
    </>
  );
}

function LiveChatPanel({
  message,
  onMessageChange,
  onBack,
  onClose,
}: {
  message: string;
  onMessageChange: (value: string) => void;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex h-[420px] flex-col">
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back
        </button>
        <div className="text-center">
          <p className="text-sm font-semibold">Live Chat</p>
          <p className="flex items-center justify-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Team is online
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        <div className="flex gap-2.5">
          <Avatar className="mt-0.5 h-7 w-7 shrink-0">
            <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
              SA
            </AvatarFallback>
          </Avatar>
          <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-muted/60 px-3.5 py-2.5">
            <p className="text-sm leading-relaxed">
              Hi there! 👋 I&apos;m Sara from BotFlow Support. How can I help you today?
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground">Just now</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border/40 p-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onMessageChange("");
          }}
          className="flex gap-2"
        >
          <Input
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Type your message..."
            className="h-10 rounded-xl"
          />
          <Button type="submit" size="icon" className="h-10 w-10 shrink-0 rounded-xl">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          We typically reply in under 2 minutes
        </p>
      </div>
    </div>
  );
}
