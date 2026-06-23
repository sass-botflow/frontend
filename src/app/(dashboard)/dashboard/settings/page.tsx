import { DashboardHeader } from "@/components/dashboard/header";
import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader title="Settings" />
      <div className="flex-1 p-6">
        <PageHeader
          title="Settings"
          description="Branding, integrations, domains and API keys."
        />

        <Tabs defaultValue="branding" className="max-w-3xl">
          <TabsList>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
          </TabsList>

          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>
                  Customize your workspace appearance and white-label settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization name</Label>
                  <Input id="org-name" defaultValue="My Business" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary color</Label>
                  <Input id="primary-color" type="color" defaultValue="#6366f1" className="h-10 w-20" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">White-label mode</p>
                    <p className="text-sm text-muted-foreground">
                      Hide BotFlow branding (Agency plan)
                    </p>
                  </div>
                  <Switch />
                </div>
                <Button>Save changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Channel integrations</CardTitle>
                <CardDescription>Connect WhatsApp, Instagram, TikTok and Messenger.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {["WhatsApp Business", "Instagram", "TikTok", "Messenger"].map((channel) => (
                  <div key={channel}>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">{channel}</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage API keys for external integrations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm">
                  bf_live_••••••••••••••••
                </div>
                <Button variant="outline">Generate new key</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
