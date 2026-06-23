"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "We went from missing 40% of WhatsApp leads to booking 3x more appointments. BotFlow paid for itself in week one.",
    author: "Dr. Amira K.",
    role: "Dental Clinic Owner",
  },
  {
    quote:
      "Managing 8 client accounts used to be chaos. Agency mode with white-label branding changed everything for our team.",
    author: "James L.",
    role: "Marketing Agency Founder",
  },
  {
    quote:
      "The AI agent builder is insanely good. We built a full qualification flow in 20 minutes without a developer.",
    author: "Sofia M.",
    role: "Real Estate Director",
  },
];

export function Testimonials() {
  return (
    <section className="border-t border-border bg-muted/20 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Trusted by businesses worldwide
        </h2>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <p className="leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6">
                    <p className="font-medium">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
