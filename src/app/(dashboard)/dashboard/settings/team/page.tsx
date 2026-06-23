import { Mail, Plus, Shield } from "lucide-react";
import { SettingsPageShell } from "@/components/settings/settings-page-shell";
import {
  SettingsCard,
  SettingsCardBody,
  SettingsCardHeader,
  SettingsSection,
} from "@/components/settings/settings-section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Team · Settings" };

const members = [
  { name: "John Doe", email: "john@business.com", role: "Owner", initials: "JD" },
  { name: "Sara Ahmed", email: "sara@business.com", role: "Admin", initials: "SA" },
  { name: "Mike Chen", email: "mike@business.com", role: "Member", initials: "MC" },
];

const roles = [
  { name: "Owner", description: "Full access to all settings, billing, and team management", count: 1 },
  { name: "Admin", description: "Manage channels, AI settings, and team members", count: 1 },
  { name: "Member", description: "View inbox and reply to customer conversations", count: 1 },
];

const activity = [
  { action: "Sara Ahmed replied to a WhatsApp conversation", time: "2 min ago" },
  { action: "Mike Chen was invited to the team", time: "1 hour ago" },
  { action: "John Doe updated AI personality settings", time: "Yesterday" },
  { action: "Instagram channel connected", time: "3 days ago" },
];

export default function TeamSettingsPage() {
  return (
    <SettingsPageShell
      title="Team Management"
      description="Invite teammates, manage roles, and review workspace activity."
    >
      <SettingsSection title="Invite members">
        <SettingsCard>
          <SettingsCardBody>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="colleague@company.com" className="pl-9" />
              </div>
              <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm sm:w-36">
                <option>Member</option>
                <option>Admin</option>
              </select>
              <Button>
                <Plus className="h-4 w-4" />
                Send invite
              </Button>
            </div>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Team members">
        <SettingsCard>
          <SettingsCardBody className="space-y-2 p-4 sm:p-6">
            {members.map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between rounded-lg border border-border/40 p-4"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs">{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <Badge variant={member.role === "Owner" ? "default" : "secondary"}>
                  {member.role}
                </Badge>
              </div>
            ))}
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Roles & permissions">
        <div className="grid gap-4 sm:grid-cols-3">
          {roles.map((role) => (
            <SettingsCard key={role.name}>
              <SettingsCardBody>
                <div className="mb-3 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold">{role.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{role.description}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {role.count} member{role.count !== 1 ? "s" : ""}
                </p>
              </SettingsCardBody>
            </SettingsCard>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title="Activity log">
        <SettingsCard>
          <SettingsCardHeader
            title="Recent activity"
            description="Track changes and actions across your workspace"
          />
          <SettingsCardBody className="divide-y divide-border/40 p-0">
            {activity.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 sm:px-6">
                <p className="text-sm">{item.action}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>
    </SettingsPageShell>
  );
}
