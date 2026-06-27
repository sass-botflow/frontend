import { Share2, TrendingUp, Wallet } from "lucide-react";

const STEPS = [
  {
    icon: Share2,
    title: "Get your referral link",
    description: "Join the program and copy your unique BotFlow link from this dashboard.",
  },
  {
    icon: TrendingUp,
    title: "Share with your audience",
    description:
      "Recommend BotFlow to agencies, e-commerce brands, and local businesses.",
  },
  {
    icon: Wallet,
    title: "Earn monthly commissions",
    description:
      "Get 30% of every subscription payment — for as long as they stay subscribed.",
  },
];

export function HowItWorks() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">How it works</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <div key={step.title} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                {index + 1}
              </div>
              <step.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">{step.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
