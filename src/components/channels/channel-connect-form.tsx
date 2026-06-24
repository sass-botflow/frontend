"use client";

import { useState } from "react";
import { ExternalLink, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CONNECT_FIELDS,
  validateConnectCredentials,
  type ConnectCredentialsInput,
} from "@/lib/integrations/connect-credentials";
import type { IntegrationPlatform } from "@/lib/integrations/types";
import { cn } from "@/lib/utils";

const PLATFORM_HELP: Record<
  IntegrationPlatform,
  { title: string; steps: string[]; docsUrl?: string; docsLabel?: string }
> = {
  whatsapp: {
    title: "Enter your WhatsApp Business details",
    steps: [
      "Open Meta Developer Console → WhatsApp → API Setup.",
      "Copy your Phone Number ID and permanent access token.",
      "Paste them below with your business phone number.",
    ],
    docsUrl: "https://developers.facebook.com/docs/whatsapp/cloud-api/get-started",
    docsLabel: "WhatsApp Cloud API guide",
  },
  instagram: {
    title: "Enter your Instagram Business details",
    steps: [
      "Link Instagram to a Facebook Page in Meta Business Suite.",
      "Generate a Page access token with instagram_manage_messages.",
      "Paste your @username, Page ID, and token below.",
    ],
    docsUrl: "https://developers.facebook.com/docs/instagram-platform",
    docsLabel: "Instagram API guide",
  },
  tiktok: {
    title: "Enter your TikTok Business details",
    steps: [
      "Open TikTok for Business Developer Portal.",
      "Create or select your app and copy the App / Business ID.",
      "Paste your @username, App ID, and access token below.",
    ],
    docsUrl: "https://developers.tiktok.com/",
    docsLabel: "TikTok Developer docs",
  },
};

interface ChannelConnectFormProps {
  platform: IntegrationPlatform;
  loading: boolean;
  onSubmit: (credentials: ConnectCredentialsInput) => Promise<void>;
  className?: string;
}

export function ChannelConnectForm({
  platform,
  loading,
  onSubmit,
  className,
}: ChannelConnectFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const fields = CONNECT_FIELDS[platform];
  const help = PLATFORM_HELP[platform];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    try {
      const credentials = validateConnectCredentials({ platform, ...values });
      await onSubmit(credentials);
      setValues({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-xl border border-dashed border-primary/25 bg-background/40 p-4 sm:p-5",
        className,
      )}
    >
      <div className="mb-4 space-y-3">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">{help.title}</p>
            <ol className="list-decimal space-y-1 pl-4 text-xs leading-relaxed text-muted-foreground">
              {help.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        {help.docsUrl && (
          <a
            href={help.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {help.docsLabel}
          </a>
        )}
      </div>

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={`${platform}-${field.name}`} className="text-sm">
              {field.label}
            </Label>
            <Input
              id={`${platform}-${field.name}`}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
              }
              required
              className="h-11 bg-background/80"
              autoComplete="off"
            />
            {field.hint && (
              <p className="text-xs text-muted-foreground">{field.hint}</p>
            )}
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="mt-5 h-11 w-full rounded-xl font-semibold sm:w-auto sm:min-w-[180px]"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          "Save & connect"
        )}
      </Button>
    </form>
  );
}
