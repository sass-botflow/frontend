import { Suspense } from "react";
import { ChannelsDashboard } from "@/components/channels/channels-dashboard";
import { ChannelsPageSkeleton } from "@/components/channels/channels-skeleton";

export const metadata = {
  title: "Connect WhatsApp",
  description:
    "Connect WhatsApp Business via Meta Embedded Signup — create or link your account in one guided flow.",
};

export default function ChannelsPage() {
  return (
    <Suspense fallback={<ChannelsPageSkeleton />}>
      <ChannelsDashboard />
    </Suspense>
  );
}
