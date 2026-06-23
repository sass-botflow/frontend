import { Pricing } from "@/components/marketing/pricing";
import { CTA } from "@/components/marketing/cta";

export const metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <div className="pt-24">
      <Pricing />
      <CTA />
    </div>
  );
}
