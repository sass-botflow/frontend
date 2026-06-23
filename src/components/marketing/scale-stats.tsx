"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Clock, Zap } from "lucide-react";

const metrics = [
  { value: "500+", label: "Active businesses" },
  { value: "2M+", label: "Messages automated" },
  { value: "50+", label: "Countries served" },
  { value: "15hrs", label: "Saved weekly per team" },
];

const security = [
  { icon: Shield, title: "99.9% uptime", description: "Enterprise-grade reliability" },
  { icon: Lock, title: "Encrypted data", description: "End-to-end message security" },
  { icon: Clock, title: "24/7 monitoring", description: "Always-on infrastructure" },
  { icon: Zap, title: "Instant setup", description: "Live in under 5 minutes" },
];

export function ScaleStats() {
  return (
    <section className="border-t border-border/60 bg-muted/20 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Customer automation at scale
          </h2>
          <p className="mt-4 text-muted-foreground">
            Businesses and agencies running their full customer communication on BotFlow.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-4xl font-semibold tracking-tight">{m.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Enterprise-grade security & compliance
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {security.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border/60 bg-card p-5 text-center"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
