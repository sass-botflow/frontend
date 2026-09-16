import { Hero } from "@/components/marketing/hero";
import { LogoWall } from "@/components/marketing/logo-wall";
import { StatsBar } from "@/components/marketing/stats-bar";
import { BentoFeatures } from "@/components/marketing/bento-features";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ProductShowcase } from "@/components/marketing/product-showcase";
import { Channels } from "@/components/marketing/channels";
import { CompetitorEdge } from "@/components/marketing/competitor-edge";
import { ScaleStats } from "@/components/marketing/scale-stats";
import { VideoTestimonials } from "@/components/marketing/video-testimonials";
import { Testimonials } from "@/components/marketing/testimonials";
import { FAQ } from "@/components/marketing/faq";
import { CTA } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoWall />
      <StatsBar />
      <BentoFeatures />
      <HowItWorks />
      <ProductShowcase />
      <Channels />
      <CompetitorEdge />
      <ScaleStats />
      <VideoTestimonials />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
