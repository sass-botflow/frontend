import { type LucideIcon } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";

interface DashboardPlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function DashboardPlaceholder({
  title,
  description,
  icon: Icon,
}: DashboardPlaceholderProps) {
  return (
    <>
      <DashboardHeader title={title} />
      <div className="relative flex flex-1 items-center justify-center p-6 pb-24 md:pb-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_65%)]" />
        <div className="glass relative max-w-lg rounded-2xl border border-border/50 p-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}
