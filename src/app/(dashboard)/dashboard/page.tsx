import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <DashboardOverview />
    </>
  );
}
