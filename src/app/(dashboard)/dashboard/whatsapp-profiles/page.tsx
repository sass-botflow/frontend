import { Suspense } from "react";
import { ChannelsPageSkeleton } from "@/components/channels/channels-skeleton";
import { WhatsAppProfilesDashboard } from "@/components/whatsapp-profiles/whatsapp-profiles-dashboard";

export const metadata = {
  title: "WhatsApp Profiles",
  description: "Manage WhatsApp profile sessions for your workspace.",
};

export default function WhatsAppProfilesPage() {
  return (
    <Suspense fallback={<ChannelsPageSkeleton />}>
      <WhatsAppProfilesDashboard />
    </Suspense>
  );
}
