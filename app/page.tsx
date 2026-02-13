import { HeroCarousel } from "@/components/HeroCarousel";
import { BenefitCards } from "@/components/BenefitCards";
import { AboutSection } from "@/components/AboutSection";
import { LensDiagram } from "@/components/educational/LensDiagram";
import { ProductLines } from "@/components/educational/ProductLines";
import { TreatmentsGrid } from "@/components/educational/TreatmentsGrid";
import { RefractionIndex } from "@/components/educational/RefractionIndex";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <HeroCarousel />
        <BenefitCards />
      </div>
      <AboutSection />

      <div id="multifocais">
        <LensDiagram />
        <ProductLines />
      </div>

      <div id="tratamentos">
        <TreatmentsGrid />
        <RefractionIndex />
      </div>

      <div id="contato">
        <ContactSection />
      </div>

      <Footer />
    </main>
  );
}
