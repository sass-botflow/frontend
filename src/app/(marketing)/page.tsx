import { Hero } from "@/components/marketing/hero";
import { StatsBar } from "@/components/marketing/stats-bar";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { Channels } from "@/components/marketing/channels";
import { ScaleStats } from "@/components/marketing/scale-stats";
import { Testimonials } from "@/components/marketing/testimonials";
import { FAQ } from "@/components/marketing/faq";
import { CTA } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <ProductShowcase />
      <Channels />
      <ScaleStats />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
