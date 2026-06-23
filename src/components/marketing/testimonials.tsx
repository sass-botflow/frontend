"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    quote:
      "We went from missing 40% of WhatsApp leads to booking 3x more appointments. BotFlow paid for itself in week one. The AI handles Arabic and French perfectly.",
    author: "Dr. Amira K.",
    role: "Dental Clinic Owner",
    initials: "AK",
    metric: "3x more bookings",
  },
  {
    quote:
      "Before BotFlow, we spent hours replying to Instagram DMs manually. Now the AI answers product questions, collects leads, and we only jump in for complex orders.",
    author: "James L.",
    role: "E-commerce Founder",
    initials: "JL",
    metric: "15+ hrs saved/week",
  },
  {
    quote:
      "Managing customer messages across WhatsApp and TikTok used to be chaos. BotFlow unified everything. Our response time went from hours to seconds.",
    author: "Sofia M.",
    role: "Restaurant Owner",
    initials: "SM",
    metric: "Response in < 3 sec",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Trusted by businesses worldwide
          </h2>
          <p className="mt-4 text-muted-foreground">
            See how teams automate customer communication with BotFlow.
          </p>
          <div className="mt-4 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              4.9/5 from 500+ businesses
            </span>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-border/60 bg-card p-6"
            >
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                  {t.metric}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
