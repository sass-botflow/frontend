"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <Badge variant="secondary" className="mb-6 gap-1.5 px-3 py-1">
            <Sparkles className="h-3.5 w-3.5" />
            AI automation for modern businesses
          </Badge>

          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Your AI team for{" "}
            <span className="gradient-text">every customer channel</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            BotFlow unifies WhatsApp, Instagram, TikTok and Messenger in one
            premium inbox. Build AI agents, automate replies, capture leads and
            book appointments — without writing code.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-12 px-8" asChild>
              <Link href="/register">
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8" asChild>
              <Link href="/dashboard">View demo dashboard</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="gradient-border overflow-hidden rounded-2xl shadow-2xl">
            <div className="overflow-hidden rounded-2xl border border-border/50 bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-xs text-muted-foreground">
                  botflow.ink/dashboard
                </span>
              </div>
              <div className="grid gap-px bg-border md:grid-cols-[240px_1fr]">
                <div className="hidden bg-sidebar p-4 md:block">
                  <div className="space-y-2">
                    {["Inbox", "AI Agents", "CRM", "Analytics"].map((item) => (
                      <div
                        key={item}
                        className="rounded-lg bg-sidebar-accent px-3 py-2 text-sm text-sidebar-foreground"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-background p-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { label: "Conversations", value: "2,847" },
                      { label: "Leads captured", value: "412" },
                      { label: "Response time", value: "12s" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-border bg-card p-4"
                      >
                        <p className="text-xs text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className="mt-1 text-2xl font-semibold">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { name: "Sarah M.", channel: "WhatsApp", msg: "Can I book a consultation?" },
                      { name: "Alex R.", channel: "Instagram", msg: "What are your prices?" },
                    ].map((convo) => (
                      <div
                        key={convo.name}
                        className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                      >
                        <div>
                          <p className="font-medium">{convo.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {convo.msg}
                          </p>
                        </div>
                        <Badge variant="outline">{convo.channel}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
