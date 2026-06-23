import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader title="Settings" />
      <div className="mx-auto max-w-2xl flex-1 p-6">
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="api">API keys</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-border/60 shadow-none">
              <CardHeader>
                <CardTitle className="text-base">Profile</CardTitle>
                <CardDescription>Your account details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" defaultValue="Ahmed Benali" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="ahmed@business.com" />
                </div>
                <Button size="sm">Save profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding">
            <Card className="border-border/60 shadow-none">
              <CardHeader>
                <CardTitle className="text-base">Branding</CardTitle>
                <CardDescription>
                  How your business appears to customers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display name</Label>
                  <Input id="display-name" defaultValue="Smile Dental Clinic" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Brand color</Label>
                  <Input id="color" type="color" defaultValue="#6366f1" className="h-10 w-16" />
                </div>
                <Button size="sm">Save branding</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="border-border/60 shadow-none">
              <CardHeader>
                <CardTitle className="text-base">API keys</CardTitle>
                <CardDescription>
                  For developers who want to connect BotFlow to other tools.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border/60 bg-muted/30 p-4 font-mono text-sm">
                  bf_live_••••••••••••••••
                </div>
                <Separator />
                <Button variant="outline" size="sm">
                  Generate new key
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
