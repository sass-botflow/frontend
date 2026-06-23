import {
  BookOpen,
  Bug,
  ExternalLink,
  Lightbulb,
  MessageCircle,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { SettingsPageShell } from "@/components/settings/settings-page-shell";
import { SettingsSection } from "@/components/settings/settings-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = { title: "Support Center · Settings" };

const supportOptions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real time. Average response under 2 minutes.",
    action: "Start chat",
    badge: "Online",
    badgeVariant: "success" as const,
  },
  {
    icon: Ticket,
    title: "Submit Ticket",
    description: "Create a support ticket for technical issues or account questions.",
    action: "New ticket",
  },
  {
    icon: Lightbulb,
    title: "Feature Requests",
    description: "Suggest new features or improvements. We review every submission.",
    action: "Submit idea",
  },
  {
    icon: Bug,
    title: "Bug Reports",
    description: "Report a bug with steps to reproduce. Help us fix issues faster.",
    action: "Report bug",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Guides, tutorials, and API reference for BotFlow.",
    action: "View docs",
    href: "#",
  },
];

export default function SupportSettingsPage() {
  return (
    <SettingsPageShell
      title="Support Center"
      description="Get help, submit tickets, and access documentation."
      wide
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {supportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.title}
              className="group flex flex-col rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-border hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                {"badge" in option && option.badge && (
                  <Badge variant={option.badgeVariant}>{option.badge}</Badge>
                )}
              </div>
              <h3 className="mt-4 font-semibold">{option.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {option.description}
              </p>
              <div className="mt-5">
                {"href" in option && option.href ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={option.href}>
                      {option.action}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full">
                    {option.action}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <SettingsSection title="Contact support">
        <div className="rounded-xl border border-border/60 bg-card p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="How can we help?" className="mt-1.5" />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <select className="mt-1.5 flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                <option>Technical issue</option>
                <option>Billing question</option>
                <option>Feature request</option>
                <option>Bug report</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              rows={4}
              placeholder="Describe your issue in detail..."
              className="mt-1.5 resize-none"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button>Send message</Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Quick links">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="#">Getting started guide</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="#">API documentation</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="#">Status page</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="mailto:support@botflow.ink">support@botflow.ink</Link>
          </Button>
        </div>
      </SettingsSection>
    </SettingsPageShell>
  );
}
