import { DashboardHeader } from "@/components/dashboard/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS } from "@/lib/constants";
import { cn, formatCurrency } from "@/lib/utils";
import { Check, CreditCard } from "lucide-react";

export const metadata = { title: "Billing" };

export default function BillingPage() {
  return (
    <>
      <DashboardHeader title="Billing" />
      <div className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_70%)]" />

        <div className="relative mx-auto max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          <div className="mb-8">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Your plan</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Simple pricing. Upgrade or cancel anytime.
            </p>
          </div>

          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/10 via-card/80 to-transparent shadow-none">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold">Professional</p>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCurrency(99)}/month · Renews July 23, 2026
                </p>
              </div>
              <Button variant="outline" className="rounded-xl">
                Manage subscription
              </Button>
            </CardContent>
          </Card>

          <p className="mb-4 text-sm font-medium text-muted-foreground">All plans</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "border-border/60 shadow-none",
                  "popular" in plan && plan.popular && "border-primary ring-1 ring-primary/20",
                )}
              >
                <CardHeader className="pb-2">
                  {"popular" in plan && plan.popular && (
                    <Badge className="mb-2 w-fit" variant="secondary">
                      Current
                    </Badge>
                  )}
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <CardDescription className="text-xs">{plan.description}</CardDescription>
                  <p className="pt-2 text-2xl font-semibold">
                    {formatCurrency(plan.price)}
                    <span className="text-sm font-normal text-muted-foreground">/mo</span>
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant={"popular" in plan && plan.popular ? "outline" : "default"}
                    size="sm"
                    className="w-full rounded-xl"
                    disabled={"popular" in plan && plan.popular}
                  >
                    {"popular" in plan && plan.popular ? "Current plan" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
