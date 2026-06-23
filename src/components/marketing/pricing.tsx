"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS } from "@/lib/constants";
import { cn, formatCurrency } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-border/60 bg-muted/20 py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Simple pricing
          </h2>
          <p className="mt-3 text-muted-foreground">
            No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card
                className={cn(
                  "h-full border-border/60 shadow-none",
                  "popular" in plan && plan.popular && "border-primary",
                )}
              >
                {"popular" in plan && plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <p className="pt-2 text-3xl font-semibold">
                    {formatCurrency(plan.price)}
                    <span className="text-sm font-normal text-muted-foreground">/mo</span>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={"popular" in plan && plan.popular ? "default" : "outline"} asChild>
                    <Link href="/register">Start free trial</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
