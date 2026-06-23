import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

export const metadata = { title: "Team" };

const members = [
  { name: "You", email: "owner@business.com", role: "Owner" },
  { name: "Sara Ahmed", email: "sara@business.com", role: "Member" },
];

export default function TeamPage() {
  return (
    <>
      <DashboardHeader title="Team" />
      <div className="mx-auto max-w-2xl flex-1 p-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Your team</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Invite people who can view the inbox and reply to customers.
            </p>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Invite
          </Button>
        </div>

        <Card className="border-border/60 shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Members</CardTitle>
            <CardDescription>
              Everyone on your team can see conversations and jump in when
              needed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {members.map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between rounded-lg border border-border/60 p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{member.role}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
