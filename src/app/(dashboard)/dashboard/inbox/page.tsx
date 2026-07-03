import { Suspense } from "react";
import { InboxDashboard } from "@/components/inbox/inbox-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = { title: "Inbox" };

export default function InboxPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 flex-col gap-4 p-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-[60vh] w-full rounded-xl" />
        </div>
      }
    >
      <InboxDashboard />
    </Suspense>
  );
}
