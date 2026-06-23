"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Calendar,
  Inbox,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Inbox,
    title: "Unified Inbox",
    description:
      "WhatsApp, Instagram, TikTok and Messenger in one place. Assign, tag, note and collaborate.",
  },
  {
    icon: Bot,
    title: "AI Agent Builder",
    description:
      "Drag-and-drop workflows with AI responses, conditions, lead capture and human handoff.",
  },
  {
    icon: Users,
    title: "Built-in CRM",
    description:
      "Contacts, pipelines, stages and lead scoring — everything your sales team needs.",
  },
  {
    icon: Calendar,
    title: "Appointment Booking",
    description:
      "Availability, reminders and rescheduling integrated directly into conversations.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Revenue, leads, conversion rate and response time — beautiful charts that drive decisions.",
  },
  {
    icon: Zap,
    title: "Agency Mode",
    description:
      "Manage multiple clients with white-label branding, teams and granular permissions.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything to automate customer communication
          </h2>
          <p className="mt-4 text-muted-foreground">
            From first message to booked appointment — one platform for clinics,
            agencies, e-commerce and local businesses.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full border-border/60 transition-colors hover:border-primary/30">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
