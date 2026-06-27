import { Share2, TrendingUp, Wallet } from "lucide-react";

const STEPS = [
  {
    icon: Share2,
    title: "Apply & get your link",
    description:
      "Sign up for a free BotFlow account, join the affiliate program from this dashboard, and receive your unique referral link instantly.",
  },
  {
    icon: TrendingUp,
    title: "Promote to your audience",
    description:
      "Share your link in content — blog posts, YouTube tutorials, social media, email newsletters. BotFlow's trial does the heavy lifting.",
  },
  {
    icon: Wallet,
    title: "Earn 30% on every payment",
    description:
      "When someone subscribes via your link, you earn 30% of every payment they make — for the life of their subscription, with no cap.",
  },
];

export function HowItWorks() {
  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 p-5 sm:p-6">
      <h3 className="text-lg font-semibold">How It Works</h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <div key={step.title} className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
              {index + 1}
            </div>
            <div>
              <p className="font-semibold">{step.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
