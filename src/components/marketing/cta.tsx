import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustBadges = [
  "No card required",
  "99.9% uptime",
  "Built for all businesses",
];

export function CTA() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          500+ Businesses Trust BotFlow
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Ready to automate your customer replies?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join hundreds of businesses letting BotFlow handle WhatsApp, Instagram,
          and TikTok messages 24/7.
        </p>

        <Button size="lg" className="mt-10 h-12 px-10 text-base" asChild>
          <Link href="/register">
            Get Started for Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {trustBadges.map((badge) => (
            <span key={badge} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
