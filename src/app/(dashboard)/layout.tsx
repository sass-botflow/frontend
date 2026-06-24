import { DashboardSidebar, DashboardMobileNav } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col pb-20 md:pb-0">{children}</div>
      <DashboardMobileNav />
    </div>
  );
}
