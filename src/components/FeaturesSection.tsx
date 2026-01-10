import { Search, BarChart3, Eye, GitCompare } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: Search,
    title: "Fact Verification (RAG)",
    description: "Every AI response is cross-checked against trusted documents, verified APIs, and curated knowledge bases to prevent fake or outdated information.",
  },
  {
    icon: BarChart3,
    title: "Confidence Scoring",
    description: "Each answer receives a reliability score from 0-100%, giving you instant insight into how trustworthy the response is before you act on it.",
  },
  {
    icon: Eye,
    title: "Full Explainability",
    description: "See exactly which sources were used, why the answer was rated a certain way, and highlighted evidence supporting each claim.",
  },
  {
    icon: GitCompare,
    title: "Consistency Checking",
    description: "The same question asked multiple times should give the same verified answer. We detect contradictions and flag inconsistencies.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Four Pillars of <span className="text-gradient-primary">AI Trust</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our Trust Layer combines multiple verification strategies to ensure every AI response meets the highest standards of reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
