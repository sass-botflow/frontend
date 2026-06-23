"use client";

import { motion } from "framer-motion";
import { CHANNELS } from "@/lib/constants";

export function Channels() {
  return (
    <section id="channels" className="border-y border-border bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Every channel. One inbox.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Connect your channels in minutes and let AI handle the rest.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((channel, i) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-lg"
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white"
                style={{ backgroundColor: channel.color }}
              >
                {channel.name[0]}
              </div>
              <h3 className="font-semibold">{channel.name}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {channel.id === "whatsapp" && (
                  <>
                    <li>Auto replies & FAQ</li>
                    <li>Appointment booking</li>
                    <li>Lead qualification</li>
                  </>
                )}
                {channel.id === "instagram" && (
                  <>
                    <li>DM automation</li>
                    <li>Story replies</li>
                    <li>Comment triggers</li>
                  </>
                )}
                {channel.id === "tiktok" && (
                  <>
                    <li>DM automation</li>
                    <li>Comment automation</li>
                    <li>Lead capture</li>
                  </>
                )}
                {channel.id === "messenger" && (
                  <>
                    <li>Keyword automation</li>
                    <li>AI responses</li>
                    <li>Human handoff</li>
                  </>
                )}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
