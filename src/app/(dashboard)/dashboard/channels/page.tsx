import { Suspense } from "react";
import { ChannelsDashboard } from "@/components/channels/channels-dashboard";
import { ChannelsPageSkeleton } from "@/components/channels/channels-skeleton";

export const metadata = {
  title: "Channels",
  description:
    "Connect WhatsApp Business and Instagram Professional accounts to automate customer messages.",
};

export default function ChannelsPage() {
  return (
    <Suspense fallback={<ChannelsPageSkeleton />}>
      <ChannelsDashboard />
    </Suspense>
  );
}
