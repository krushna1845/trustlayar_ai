import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DemoSection } from "@/components/DemoSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <DemoSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <Footer />
    </div>
  );
};

export default Index;
