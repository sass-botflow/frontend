import { BarChart3 } from "lucide-react";
import { DashboardPlaceholder } from "@/components/dashboard/placeholder-page";

export const metadata = { title: "Analytics" };

export default function AnalyticsPage() {
  return (
    <DashboardPlaceholder
      title="Analytics"
      description="Track channel performance, AI resolution rates and revenue impact across your connected platforms."
      icon={BarChart3}
    />
  );
}
