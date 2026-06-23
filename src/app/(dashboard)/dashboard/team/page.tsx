import { DashboardHeader } from "@/components/dashboard/header";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

export const metadata = { title: "Team" };

const members = [
  { name: "You", email: "owner@botflow.ink", role: "OWNER" },
  { name: "Sarah Admin", email: "sarah@botflow.ink", role: "ADMIN" },
  { name: "Mike Agent", email: "mike@botflow.ink", role: "AGENT" },
  { name: "Lisa Manager", email: "lisa@botflow.ink", role: "MANAGER" },
];

const roleColors: Record<string, "default" | "secondary" | "outline" | "success"> = {
  OWNER: "default",
  ADMIN: "success",
  MANAGER: "secondary",
  AGENT: "outline",
};

export default function TeamPage() {
  return (
    <>
      <DashboardHeader title="Team" />
      <div className="flex-1 p-6">
        <PageHeader
          title="Team Management"
          description="Invite members and manage roles & permissions."
          action={
            <Button>
              <Plus className="h-4 w-4" />
              Invite member
            </Button>
          }
        />

        <Card>
          <CardHeader>
            <CardTitle>Team members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {members.map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <Badge variant={roleColors[member.role] ?? "outline"}>
                  {member.role}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
