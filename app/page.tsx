import { HeroCarousel } from "@/components/HeroCarousel";
import { BenefitCards } from "@/components/BenefitCards";
import { LensSurvey } from "@/components/survey/LensSurvey";
import { AboutSection } from "@/components/AboutSection";
import { LensDiagram } from "@/components/educational/LensDiagram";
import { ProductLines } from "@/components/educational/ProductLines";
import { TreatmentsGrid } from "@/components/educational/TreatmentsGrid";
import { RefractionIndex } from "@/components/educational/RefractionIndex";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { FramesSection } from "@/components/FramesSection";
import { WhyVizz } from "@/components/WhyVizz";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { SectionNavigator } from "@/components/SectionNavigator";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SectionNavigator />
      <div id="hero" className="relative h-dvh">
        <HeroCarousel />
        <BenefitCards />
      </div>
      <LensSurvey />
      <AboutSection />

      <div id="multifocais">
        <LensDiagram />
        <ProductLines />
      </div>

      <div id="tratamentos">
        <TreatmentsGrid />
        <RefractionIndex />
      </div>

      <FramesSection />
      <WhyVizz />

      <Testimonials />
      <FAQ />

      <div id="contato">
        <ContactSection />
      </div>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
