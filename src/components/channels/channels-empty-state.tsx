import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function ChannelsEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/60 to-violet-500/5 p-6 sm:p-8 backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 ring-1 ring-primary/25">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight">
            Connect your first channel
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Start with{" "}
            <span className="font-medium text-foreground">
              Connect WhatsApp Business
            </span>{" "}
            — Meta Embedded Signup handles Business Manager, WABA, and phone
            selection automatically. Instagram and TikTok forms are below.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-primary">
            <ArrowDown className="h-3.5 w-3.5" />
            No manual tokens required for WhatsApp
          </p>
        </div>
      </div>
    </motion.div>
  );
}
