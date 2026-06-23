import { Camera } from "lucide-react";
import { SettingsPageShell } from "@/components/settings/settings-page-shell";
import {
  SettingsCard,
  SettingsCardBody,
  SettingsRow,
  SettingsSection,
} from "@/components/settings/settings-section";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export const metadata = { title: "Profile · Settings" };

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "ar", label: "Arabic" },
  { value: "es", label: "Spanish" },
];

const TIMEZONES = [
  { value: "Africa/Casablanca", label: "Casablanca (GMT+1)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "America/New_York", label: "New York (EST)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
];

export default function ProfileSettingsPage() {
  return (
    <SettingsPageShell
      title="Profile"
      description="Manage your personal account, security preferences, and regional settings."
    >
      <SettingsSection title="Profile picture">
        <SettingsCard>
          <SettingsCardBody>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Avatar className="h-20 w-20 ring-2 ring-border/60">
                <AvatarFallback className="text-lg font-semibold">JD</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  JPG, PNG or GIF. Max 2MB. Recommended 400×400px.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Camera className="h-4 w-4" />
                    Upload photo
                  </Button>
                  <Button size="sm" variant="ghost">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Personal information">
        <SettingsCard>
          <SettingsCardBody className="p-0 sm:px-6">
            <SettingsRow label="Full name" description="Your display name across BotFlow">
              <Input defaultValue="John Doe" />
            </SettingsRow>
            <SettingsRow label="Email" description="Used for login and notifications">
              <Input type="email" defaultValue="john@business.com" />
            </SettingsRow>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Security">
        <SettingsCard>
          <SettingsCardBody className="p-0 sm:px-6">
            <SettingsRow label="Password" description="Last changed 3 months ago">
              <Button variant="outline" size="sm">
                Change password
              </Button>
            </SettingsRow>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Preferences">
        <SettingsCard>
          <SettingsCardBody className="p-0 sm:px-6">
            <SettingsRow label="Language" description="Interface and notification language">
              <select
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                defaultValue="en"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </SettingsRow>
            <SettingsRow label="Timezone" description="Used for scheduling and activity logs">
              <select
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                defaultValue="Africa/Casablanca"
              >
                {TIMEZONES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </SettingsRow>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <div className="flex justify-end gap-3 border-t border-border/40 pt-6">
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </SettingsPageShell>
  );
}
