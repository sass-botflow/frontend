import { Suspense } from "react";
import { ChannelsDashboard } from "@/components/channels/channels-dashboard";
import { ChannelsPageSkeleton } from "@/components/channels/channels-skeleton";

export const metadata = {
  title: "Channels",
  description:
    "Connect WhatsApp via Meta OAuth, and Instagram and TikTok to BotFlow.",
};

export default function ChannelsPage() {
  return (
    <Suspense fallback={<ChannelsPageSkeleton />}>
      <ChannelsDashboard />
    </Suspense>
  );
}
