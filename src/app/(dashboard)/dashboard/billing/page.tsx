import { DashboardHeader } from "@/components/dashboard/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS } from "@/lib/constants";
import { cn, formatCurrency } from "@/lib/utils";
import { Check } from "lucide-react";

export const metadata = { title: "Billing" };

export default function BillingPage() {
  return (
    <>
      <DashboardHeader title="Billing" />
      <div className="mx-auto max-w-3xl flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight">Your plan</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Simple pricing. Cancel anytime.
          </p>
        </div>

        <Card className="mb-8 border-border/60 shadow-none">
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="font-medium">Professional</p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(99)}/month · Renews July 23, 2026
              </p>
            </div>
            <Badge variant="success">Active</Badge>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "border-border/60 shadow-none",
                "popular" in plan && plan.popular && "border-primary",
              )}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{plan.name}</CardTitle>
                <CardDescription className="text-xs">
                  {plan.description}
                </CardDescription>
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
                  className="w-full"
                  disabled={"popular" in plan && plan.popular}
                >
                  {"popular" in plan && plan.popular ? "Current plan" : "Switch"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
