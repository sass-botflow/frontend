"use client";

import { MessageCircle } from "lucide-react";
import { ChannelConnectCard } from "@/components/channels/channel-connect-card";
import { WHATSAPP_CONNECT_CONFIG } from "@/lib/channels/connect-themes";
import { cn } from "@/lib/utils";

interface WhatsAppConnectCardProps {
  onConnect: () => void;
  loading?: boolean;
  className?: string;
}

export function WhatsAppConnectCard({
  onConnect,
  loading = false,
  className,
}: WhatsAppConnectCardProps) {
  return (
    <ChannelConnectCard
      config={{
        ...WHATSAPP_CONNECT_CONFIG,
        headerIcon: <MessageCircle className="h-8 w-8 text-[#25D366]" />,
      }}
      onConnect={onConnect}
      loading={loading}
      className={cn(className)}
    />
  );
}
