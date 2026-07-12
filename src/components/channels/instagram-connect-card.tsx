"use client";

import { ChannelConnectCard } from "@/components/channels/channel-connect-card";
import { InstagramIcon } from "@/components/channels/channel-logo";
import { INSTAGRAM_CONNECT_CONFIG } from "@/lib/channels/connect-themes";
import { cn } from "@/lib/utils";

interface InstagramConnectCardProps {
  loading?: boolean;
  className?: string;
  onConnect?: () => void;
}

export function InstagramConnectCard({
  loading = false,
  className,
  onConnect,
}: InstagramConnectCardProps) {
  return (
    <ChannelConnectCard
      config={{
        ...INSTAGRAM_CONNECT_CONFIG,
        connectHref: undefined,
        headerIcon: <InstagramIcon className="h-8 w-8 text-[#DD2A7B]" />,
        buttonIcon: <InstagramIcon className="h-5 w-5 text-white" />,
      }}
      onConnect={onConnect}
      loading={loading}
      className={cn(className)}
    />
  );
}
