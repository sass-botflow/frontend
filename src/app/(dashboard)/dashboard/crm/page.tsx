import { DashboardHeader } from "@/components/dashboard/header";
import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const metadata = { title: "CRM" };

const stages = [
  { name: "New Lead", count: 24, color: "#6366f1" },
  { name: "Qualified", count: 12, color: "#8b5cf6" },
  { name: "Proposal", count: 8, color: "#f59e0b" },
  { name: "Won", count: 5, color: "#10b981" },
];

const contacts = [
  { name: "Sarah Mitchell", email: "sarah@email.com", score: 85, tags: ["Hot lead"] },
  { name: "Alex Rivera", email: "alex@email.com", score: 62, tags: ["Instagram"] },
  { name: "Emma Chen", email: "emma@email.com", score: 45, tags: ["Follow up"] },
];

export default function CrmPage() {
  return (
    <>
      <DashboardHeader title="CRM" />
      <div className="flex-1 p-6">
        <PageHeader
          title="Contacts & Pipelines"
          description="Manage leads, deals and customer relationships."
          action={
            <Button>
              <Plus className="h-4 w-4" />
              Add contact
            </Button>
          }
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <Card key={stage.name}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stage.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div
                  key={contact.email}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {contact.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                    <Badge variant="secondary">Score: {contact.score}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
