import { Shield, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-[15%] float-animation opacity-50">
        <Shield className="w-8 h-8 text-primary" />
      </div>
      <div className="absolute bottom-32 left-[10%] float-animation opacity-40" style={{ animationDelay: "2s" }}>
        <Sparkles className="w-6 h-6 text-primary" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI Trust & Verification Layer</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-slide-up">
          We're not building{" "}
          <span className="text-gradient-primary">smarter AI</span>
          <br />
          We're building AI{" "}
          <span className="text-gradient-primary">you can trust</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
          A verification layer that sits between you and AI, answering the critical question:{" "}
          <span className="text-foreground font-medium">"Can this response be trusted?"</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "200ms" }}>
          <Button variant="hero" size="xl" onClick={scrollToDemo}>
            Try the Demo
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="heroOutline" size="xl">
            Learn More
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-verified" />
            <span>Fact Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Confidence Scoring</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-partial" />
            <span>Explainable Results</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-unverified" />
            <span>Hallucination Detection</span>
          </div>
        </div>
      </div>
    </section>
  );
};
