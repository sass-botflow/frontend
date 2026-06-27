import { Building2, Megaphone, Store, Users, Video } from "lucide-react";

const AUDIENCES = [
  { icon: Video, label: "Content creators" },
  { icon: Building2, label: "Agencies" },
  { icon: Megaphone, label: "Marketers" },
  { icon: Users, label: "SMMA owners" },
  { icon: Store, label: "Ecom educators" },
] as const;

export function AffiliateWhoIsThisFor() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">Who Is This For?</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Anyone with an audience of brands, marketers, or creators who need
        WhatsApp, Instagram &amp; TikTok automation
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {AUDIENCES.map((item) => (
          <div
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm font-medium"
          >
            <item.icon className="h-4 w-4 text-primary" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
