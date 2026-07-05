"use client";

import { motion } from "framer-motion";
import { Hash, Smartphone, Tag } from "lucide-react";
import { ChannelLogo } from "@/components/channels/channel-logo";
import { ChannelStatusBadge } from "@/components/channels/channel-status-badge";
import type { WhatsAppSession } from "@/lib/whatsapp/types";

interface WhatsAppProfileCardProps {
  session: WhatsAppSession;
  index: number;
}

export function WhatsAppProfileCard({ session, index }: WhatsAppProfileCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.03] p-5 sm:p-6 backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:bg-emerald-500/[0.05]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#25D366]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <ChannelLogo channel="whatsapp" size="lg" />
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold tracking-tight">
                {session.profileName}
              </h3>
              <ChannelStatusBadge status={session.status} />
            </div>
            <p className="text-sm text-muted-foreground">
              WhatsApp profile session
            </p>
          </div>
        </div>
      </div>

      <dl className="relative mt-5 grid gap-3 sm:grid-cols-2">
        <ProfileField
          icon={Tag}
          label="Profile Name"
          value={session.profileName}
        />
        <ProfileField
          icon={Hash}
          label="Instance Name"
          value={session.instanceName}
        />
        <ProfileField
          icon={Smartphone}
          label="Status"
          value={session.status}
          className="sm:col-span-2"
        />
      </dl>
    </motion.article>
  );
}

function ProfileField({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: typeof Tag;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-border/50 bg-background/40 px-4 py-3 ${className ?? ""}`}
    >
      <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
