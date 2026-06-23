"use client";

import { useState } from "react";
import { FileUp, Save, Sparkles } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_AI_INSTRUCTIONS } from "@/lib/constants";

export default function BrainPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <>
      <DashboardHeader title="AI Brain" />
      <div className="mx-auto max-w-2xl flex-1 p-6">
        <div className="mb-8 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Teach your AI about your business
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill in these details once. Your AI uses them to reply to every
              customer message.
            </p>
          </div>
        </div>

        <Card className="border-border/60 shadow-none">
          <CardHeader>
            <CardTitle className="text-base">Business info</CardTitle>
            <CardDescription>
              The more you share, the better your AI replies.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="business-name">Business name</Label>
              <Input
                id="business-name"
                placeholder="e.g. Smile Dental Clinic"
                defaultValue="Smile Dental Clinic"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="business-description">Business description</Label>
              <Textarea
                id="business-description"
                placeholder="What does your business do? What services do you offer?"
                defaultValue="Family dental clinic in Casablanca. We offer cleanings, whitening, implants, and emergency care. Open Mon–Sat 9am–7pm."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourbusiness.com"
                defaultValue="https://smiledental.ma"
              />
            </div>

            <div className="space-y-2">
              <Label>Knowledge base (PDF)</Label>
              <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-6 py-8 transition-colors hover:bg-muted/50">
                <FileUp className="mb-2 h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">Drop a PDF here or click to upload</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Menu, price list, FAQ, services brochure
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Custom instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Tell your AI how to behave..."
                defaultValue={DEFAULT_AI_INSTRUCTIONS}
                className="min-h-[120px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Example: &quot;You are a helpful assistant for Smile Dental
                Clinic. Always be warm and offer to book appointments.&quot;
              </p>
            </div>

            <Button onClick={handleSave} className="w-full sm:w-auto">
              <Save className="h-4 w-4" />
              {saved ? "Saved!" : "Save AI Brain"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
