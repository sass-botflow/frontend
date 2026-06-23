import { SettingsSidebar } from "@/components/settings/settings-sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <aside className="shrink-0 border-b border-border/60 bg-muted/20 lg:w-64 lg:border-b-0 lg:border-r">
        <div className="p-4 lg:sticky lg:top-0 lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto lg:p-6">
          <div className="mb-4 hidden lg:block">
            <h1 className="text-sm font-semibold">Settings</h1>
            <p className="text-xs text-muted-foreground">
              Manage your workspace
            </p>
          </div>
          <SettingsSidebar />
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
