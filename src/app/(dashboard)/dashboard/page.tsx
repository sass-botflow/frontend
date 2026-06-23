import {
  DollarSign,
  MessageSquare,
  Timer,
  Users,
} from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "Dashboard" };

const recentConversations = [
  { name: "Sarah Mitchell", channel: "WhatsApp", status: "Open", time: "2m ago" },
  { name: "Alex Rivera", channel: "Instagram", status: "Pending", time: "15m ago" },
  { name: "Emma Chen", channel: "TikTok", status: "Open", time: "1h ago" },
  { name: "Michael Brown", channel: "Messenger", status: "Resolved", time: "3h ago" },
];

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Overview" />
      <div className="flex-1 space-y-8 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatsCard title="Revenue" value="$24,580" change={12.5} icon={DollarSign} />
          <StatsCard title="Leads" value="412" change={8.2} icon={Users} />
          <StatsCard title="Conversations" value="2,847" change={15.3} icon={MessageSquare} />
          <StatsCard title="Avg. Response" value="12s" change={-22} icon={Timer} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentConversations.map((convo) => (
                <div
                  key={convo.name}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="font-medium">{convo.name}</p>
                    <p className="text-sm text-muted-foreground">{convo.channel}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        convo.status === "Resolved" ? "secondary" : "success"
                      }
                    >
                      {convo.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {convo.time}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active AI agents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Lead Qualifier", channel: "WhatsApp", runs: "1.2k" },
                { name: "Appointment Bot", channel: "Instagram", runs: "856" },
                { name: "FAQ Assistant", channel: "All channels", runs: "2.4k" },
              ].map((bot) => (
                <div
                  key={bot.name}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <p className="font-medium">{bot.name}</p>
                    <p className="text-sm text-muted-foreground">{bot.channel}</p>
                  </div>
                  <span className="text-sm font-medium">{bot.runs} runs</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
