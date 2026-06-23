import { DashboardHeader } from "@/components/dashboard/header";
import { cn } from "@/lib/utils";

interface SettingsPageShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  wide?: boolean;
}

export function SettingsPageShell({
  title,
  description,
  children,
  wide,
}: SettingsPageShellProps) {
  return (
    <>
      <DashboardHeader title="Settings" />
      <div className="p-5 sm:p-8">
        <div
          className={cn(
            "mx-auto space-y-8",
            wide ? "max-w-5xl" : "max-w-3xl",
          )}
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
