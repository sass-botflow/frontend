import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">
          Ready to stop missing messages?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Connect WhatsApp and let AI reply in under 5 minutes.
        </p>
        <Button size="lg" className="mt-8 h-12 px-8" asChild>
          <Link href="/register">
            Start free trial
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
