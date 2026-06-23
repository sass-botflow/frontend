"use client";

import { useState } from "react";
import { SettingsPageShell } from "@/components/settings/settings-page-shell";
import {
  SettingsCard,
  SettingsCardBody,
  SettingsRow,
  SettingsSection,
} from "@/components/settings/settings-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const PERSONALITIES = [
  { value: "professional", label: "Professional", desc: "Formal, polished, business-focused" },
  { value: "friendly", label: "Friendly", desc: "Warm, approachable, conversational" },
  { value: "concise", label: "Concise", desc: "Brief, direct, to the point" },
];

const RESPONSE_STYLES = [
  { value: "detailed", label: "Detailed" },
  { value: "balanced", label: "Balanced" },
  { value: "short", label: "Short & quick" },
];

const SUPPORTED_LANGUAGES = ["English", "French", "Arabic", "Spanish", "German"];

export default function AiSettingsPage() {
  const [handoffEnabled, setHandoffEnabled] = useState(true);
  const [afterMessages, setAfterMessages] = useState("5");
  const [selectedLanguages, setSelectedLanguages] = useState(["English", "French", "Arabic"]);

  function toggleLanguage(lang: string) {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  }

  return (
    <SettingsPageShell
      title="AI Settings"
      description="Customize how your AI assistant communicates and when to hand off to humans."
    >
      <SettingsSection title="AI personality">
        <SettingsCard>
          <SettingsCardBody className="space-y-3">
            {PERSONALITIES.map((p) => (
              <label
                key={p.value}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-border/60 p-4 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
              >
                <input
                  type="radio"
                  name="personality"
                  value={p.value}
                  defaultChecked={p.value === "friendly"}
                  className="mt-1"
                />
                <div>
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </label>
            ))}
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Response style">
        <SettingsCard>
          <SettingsCardBody className="p-0 sm:px-6">
            <SettingsRow label="Response length" description="How detailed AI replies should be">
              <select
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
                defaultValue="balanced"
              >
                {RESPONSE_STYLES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </SettingsRow>
            <SettingsRow label="Custom instructions" description="Additional rules for your AI">
              <Textarea
                rows={3}
                placeholder="Always mention our free shipping policy..."
                className="resize-none"
              />
            </SettingsRow>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Supported languages">
        <SettingsCard>
          <SettingsCardBody>
            <p className="mb-4 text-sm text-muted-foreground">
              Select languages your AI can respond in. It will auto-detect the customer&apos;s language.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const active = selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                      active
                        ? "border-primary bg-primary/10 font-medium text-primary"
                        : "border-border/60 text-muted-foreground hover:border-border"
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <SettingsSection title="Human handoff">
        <SettingsCard>
          <SettingsCardBody className="p-0 sm:px-6">
            <SettingsRow
              label="Enable human handoff"
              description="Transfer complex conversations to your team"
            >
              <Switch checked={handoffEnabled} onCheckedChange={setHandoffEnabled} />
            </SettingsRow>
            {handoffEnabled && (
              <>
                <SettingsRow
                  label="Handoff after messages"
                  description="Number of AI messages before suggesting a human"
                >
                  <Input
                    type="number"
                    min={1}
                    max={20}
                    value={afterMessages}
                    onChange={(e) => setAfterMessages(e.target.value)}
                    className="w-24"
                  />
                </SettingsRow>
                <SettingsRow
                  label="Handoff triggers"
                  description="Keywords that immediately transfer to a human"
                >
                  <Input placeholder="refund, complaint, manager..." defaultValue="refund, complaint, speak to human" />
                </SettingsRow>
              </>
            )}
          </SettingsCardBody>
        </SettingsCard>
      </SettingsSection>

      <div className="flex justify-end gap-3 border-t border-border/40 pt-6">
        <Button variant="outline">Reset to defaults</Button>
        <Button>Save changes</Button>
      </div>
    </SettingsPageShell>
  );
}
