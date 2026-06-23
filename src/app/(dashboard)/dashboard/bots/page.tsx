import Link from "next/link";
import { Plus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "AI Agents" };

const bots = [
  {
    id: "1",
    name: "Lead Qualifier",
    description: "Qualifies leads via WhatsApp with AI questions",
    status: "ACTIVE",
    channel: "WhatsApp",
    runs: 1247,
  },
  {
    id: "2",
    name: "Appointment Bot",
    description: "Books appointments from Instagram DMs",
    status: "ACTIVE",
    channel: "Instagram",
    runs: 856,
  },
  {
    id: "3",
    name: "FAQ Assistant",
    description: "Answers common questions across all channels",
    status: "DRAFT",
    channel: "All",
    runs: 0,
  },
];

export default function BotsPage() {
  return (
    <>
      <DashboardHeader title="AI Agents" />
      <div className="flex-1 p-6">
        <PageHeader
          title="AI Agent Builder"
          description="Create visual automation workflows without code."
          action={
            <Button asChild>
              <Link href="/dashboard/bots/new">
                <Plus className="h-4 w-4" />
                New agent
              </Link>
            </Button>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {bots.map((bot) => (
            <Link key={bot.id} href={`/dashboard/bots/${bot.id}`}>
              <Card className="h-full transition-colors hover:border-primary/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{bot.name}</CardTitle>
                    <Badge variant={bot.status === "ACTIVE" ? "success" : "secondary"}>
                      {bot.status}
                    </Badge>
                  </div>
                  <CardDescription>{bot.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{bot.channel}</span>
                    <span>{bot.runs.toLocaleString()} runs</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
