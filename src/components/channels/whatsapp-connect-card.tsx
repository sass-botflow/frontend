"use client";

import { motion } from "framer-motion";
import { MessageCircle, QrCode, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhatsAppConnectCardProps {
  onConnect: () => void;
  loading?: boolean;
  className?: string;
}

export function WhatsAppConnectCard({
  onConnect,
  loading = false,
  className,
}: WhatsAppConnectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-8 shadow-xl shadow-black/5 backdrop-blur-xl sm:p-10",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,211,102,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl space-y-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#25D366]/15 ring-1 ring-[#25D366]/25">
          <MessageCircle className="h-8 w-8 text-[#25D366]" />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Connect WhatsApp
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
            Link your WhatsApp Business number in seconds. Scan a QR code with
            your phone — no passwords, no manual setup.
          </p>
        </div>

        <div className="grid gap-3 text-left sm:grid-cols-3">
          <FeaturePill icon={QrCode} title="QR pairing" text="Scan once with WhatsApp Linked Devices" />
          <FeaturePill icon={ShieldCheck} title="Secure session" text="Encrypted and isolated per workspace" />
          <FeaturePill icon={Zap} title="Instant routing" text="Messages flow to your AI automations" />
        </div>

        <div className="space-y-4">
          <Button
            type="button"
            disabled={loading}
            onClick={onConnect}
            className="h-14 w-full max-w-md rounded-2xl bg-[#25D366] px-8 text-lg font-semibold text-white shadow-lg shadow-emerald-500/20 hover:bg-[#1fb855]"
          >
            {loading ? "Starting..." : "Connect WhatsApp Business"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Open WhatsApp on your phone when the QR code appears.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturePill({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof QrCode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-background/40 p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
        <Icon className="h-5 w-5 text-emerald-400" />
      </div>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}
