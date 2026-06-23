"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/components/providers/locale-provider";
import { CHANNELS } from "@/lib/channels";
import { ChannelLogo } from "@/components/channels/channel-logo";

export function Channels() {
  const { t } = useLocale();

  return (
    <section id="channels" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.channels.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t.channels.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {CHANNELS.map((channel, i) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-8 text-center transition-all hover:border-border hover:shadow-xl"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${channel.color}15, transparent 70%)`,
                }}
              />
              <div className="relative">
                <div className="mx-auto mb-5 flex justify-center">
                  <ChannelLogo channel={channel.id} size="lg" />
                </div>
                <h3 className="text-xl font-semibold">{channel.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{channel.description}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t.channels.officialApi}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
