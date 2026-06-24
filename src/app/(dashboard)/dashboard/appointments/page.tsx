import { Calendar } from "lucide-react";
import { DashboardPlaceholder } from "@/components/dashboard/placeholder-page";

export const metadata = { title: "Appointments" };

export default function AppointmentsPage() {
  return (
    <DashboardPlaceholder
      title="Appointments"
      description="Let BotFlow book meetings from WhatsApp, Instagram and TikTok conversations. Scheduling tools are coming next."
      icon={Calendar}
    />
  );
}
