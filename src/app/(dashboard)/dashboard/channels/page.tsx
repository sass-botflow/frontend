"use client";

import { useState } from "react";
import { Check, ExternalLink } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CHANNELS } from "@/lib/constants";

export default function ChannelsPage() {
  const [connected, setConnected] = useState<Record<string, boolean>>({
    whatsapp: true,
    instagram: true,
    tiktok: false,
  });

  return (
    <>
      <DashboardHeader title="Channels" />
      <div className="mx-auto max-w-2xl flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight">
            Connect your channels
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            One click to connect. Your AI will start handling messages
            automatically.
          </p>
        </div>

        <div className="space-y-3">
          {CHANNELS.map((channel) => {
            const isConnected = connected[channel.id];

            return (
              <Card key={channel.id} className="border-border/60 shadow-none">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white"
                        style={{ backgroundColor: channel.color }}
                      >
                        {channel.name[0]}
                      </div>
                      <div>
                        <CardTitle className="text-base">{channel.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {channel.description}
                        </CardDescription>
                      </div>
                    </div>
                    {isConnected && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" />
                        Connected
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button
                    variant={isConnected ? "outline" : "default"}
                    size="sm"
                    className="w-full sm:w-auto"
                    onClick={() =>
                      setConnected((prev) => ({
                        ...prev,
                        [channel.id]: !prev[channel.id],
                      }))
                    }
                  >
                    {isConnected ? (
                      "Disconnect"
                    ) : (
                      <>
                        Connect {channel.name}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
