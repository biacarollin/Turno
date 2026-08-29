import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { SegmentsSection } from "@/components/landing/SegmentsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SegmentsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
