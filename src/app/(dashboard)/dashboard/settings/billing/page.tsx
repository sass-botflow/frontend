import { Download, TrendingUp } from "lucide-react";
import { SettingsPageShell } from "@/components/settings/settings-page-shell";
import {
  SettingsCard,
  SettingsCardBody,
  SettingsCardHeader,
  SettingsSection,
} from "@/components/settings/settings-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS } from "@/lib/constants";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Check } from "lucide-react";

export const metadata = { title: "Billing · Settings" };

const usage = [
  { label: "Conversations", used: 1247, limit: 2000, unit: "" },
  { label: "AI messages", used: 8432, limit: 10000, unit: "" },
  { label: "Team members", used: 3, limit: 10, unit: "" },
];

const invoices = [
  { id: "INV-2026-06", date: "Jun 1, 2026", amount: 99, status: "Paid" },
  { id: "INV-2026-05", date: "May 1, 2026", amount: 99, status: "Paid" },
  { id: "INV-2026-04", date: "Apr 1, 2026", amount: 99, status: "Paid" },
];

export default function BillingSettingsPage() {
  return (
    <SettingsPageShell
      title="Billing"
      description="Manage your subscription, monitor usage, and download invoices."
      wide
    >
      <SettingsSection title="Current plan">
        <SettingsCard className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">Professional</h3>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatCurrency(99)}/month · Renews July 23, 2026
                </p>
              </div>
              <Button variant="outline">Manage subscription</Button>
            </div>
          </div>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Usage statistics">
        <div className="grid gap-4 sm:grid-cols-3">
          {usage.map((item) => {
            const pct = Math.round((item.used / item.limit) * 100);
            return (
              <SettingsCard key={item.label}>
                <SettingsCardBody>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatNumber(item.used)}
                    <span className="text-sm font-normal text-muted-foreground">
                      {" "}/ {formatNumber(item.limit)}
                    </span>
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{pct}% used this period</p>
                </SettingsCardBody>
              </SettingsCard>
            );
          })}
        </div>
      </SettingsSection>

      <SettingsSection title="Upgrade plan">
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
                  <Badge className="mb-2 w-fit">Current plan</Badge>
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
                  className="w-full"
                  disabled={"popular" in plan && plan.popular}
                >
                  {"popular" in plan && plan.popular ? "Current plan" : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title="Invoices">
        <SettingsCard>
          <SettingsCardHeader title="Billing history" description="Download past invoices" />
          <SettingsCardBody className="divide-y divide-border/40 p-0">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between px-5 py-3.5 sm:px-6"
              >
                <div>
                  <p className="text-sm font-medium">{inv.id}</p>
                  <p className="text-xs text-muted-foreground">{inv.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{formatCurrency(inv.amount)}</span>
                  <Badge variant="success">{inv.status}</Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>
    </SettingsPageShell>
  );
}
