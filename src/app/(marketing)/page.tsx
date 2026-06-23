import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { Channels } from "@/components/marketing/channels";
import { Pricing } from "@/components/marketing/pricing";
import { Testimonials } from "@/components/marketing/testimonials";
import { CTA } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Channels />
      <Pricing />
      <Testimonials />
      <CTA />
    </>
  );
}
