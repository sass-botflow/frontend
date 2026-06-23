import { Building2, Upload } from "lucide-react";
import { SettingsPageShell } from "@/components/settings/settings-page-shell";
import {
  SettingsCard,
  SettingsCardBody,
  SettingsRow,
  SettingsSection,
} from "@/components/settings/settings-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BUSINESS_TYPES } from "@/lib/ai-brain";

export const metadata = { title: "Business · Settings" };

export default function BusinessSettingsPage() {
  return (
    <SettingsPageShell
      title="Business Settings"
      description="Configure your company details, branding, and public-facing information."
    >
      <SettingsSection title="Company logo">
        <SettingsCard>
          <SettingsCardBody>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-border/80 bg-muted/30">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Square logo, at least 256×256px. Shown in conversations and emails.
                </p>
                <Button size="sm" variant="outline">
                  <Upload className="h-4 w-4" />
                  Upload logo
                </Button>
              </div>
            </div>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Business details">
        <SettingsCard>
          <SettingsCardBody className="p-0 sm:px-6">
            <SettingsRow label="Business name" description="Your company or brand name">
              <Input defaultValue="Acme Business" />
            </SettingsRow>
            <SettingsRow label="Business type" description="Helps AI understand your industry">
              <select
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                defaultValue="local"
              >
                {BUSINESS_TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </SettingsRow>
            <SettingsRow label="Website URL" description="Your main business website">
              <Input type="url" placeholder="https://yourbusiness.com" defaultValue="https://acme.com" />
            </SettingsRow>
            <SettingsRow
              label="Business description"
              description="A short summary of what your business does"
            >
              <Textarea
                rows={4}
                placeholder="We help local customers with..."
                defaultValue="A modern local business serving customers across Morocco with premium products and services."
                className="resize-none"
              />
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
