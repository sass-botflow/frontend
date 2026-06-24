import { Contact } from "lucide-react";
import { DashboardPlaceholder } from "@/components/dashboard/placeholder-page";

export const metadata = { title: "CRM" };

export default function CrmPage() {
  return (
    <DashboardPlaceholder
      title="CRM"
      description="Pipeline, contacts and lead scoring will live here. Connect your channels first to start capturing leads automatically."
      icon={Contact}
    />
  );
}
