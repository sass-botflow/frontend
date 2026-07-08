import { Suspense } from "react";
import { ChannelsDashboard } from "@/components/channels/channels-dashboard";
import { ChannelsPageSkeleton } from "@/components/channels/channels-skeleton";

export const metadata = {
  title: "WhatsApp",
  description:
    "Connect WhatsApp Business via QR code — scan with your phone to link your number.",
};

export default function ChannelsPage() {
  return (
    <Suspense fallback={<ChannelsPageSkeleton />}>
      <ChannelsDashboard />
    </Suspense>
  );
}
