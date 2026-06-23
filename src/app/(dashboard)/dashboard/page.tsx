import Link from "next/link";
import { ArrowRight, MessageSquare, Radio, Sparkles, User } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Home" };

const stats = [
  {
    label: "Total conversations",
    value: "1,284",
    icon: MessageSquare,
  },
  {
    label: "AI handled",
    value: "78%",
    icon: Sparkles,
    accent: "text-violet-500",
  },
  {
    label: "Human handled",
    value: "22%",
    icon: User,
    accent: "text-blue-500",
  },
  {
    label: "Active channels",
    value: "2",
    icon: Radio,
    accent: "text-emerald-500",
  },
];

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Home" />
      <div className="mx-auto max-w-4xl flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Good morning 👋
          </h2>
          <p className="mt-1 text-muted-foreground">
            Here&apos;s how your AI assistant is doing today.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/60 shadow-none">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                  <stat.icon className={`h-5 w-5 ${stat.accent ?? "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-dashed border-primary/30 bg-primary/5 shadow-none">
          <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Get started in under 5 minutes</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Connect a channel, teach your AI about your business, and start
                replying automatically.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/brain">Set up AI Brain</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/dashboard/channels">
                  Connect channel
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
