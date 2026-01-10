import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ConfidenceGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export const ConfidenceGauge = ({ score, size = "md", animated = true }: ConfidenceGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayScore(score);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const getColorClass = () => {
    if (score >= 80) return "text-verified";
    if (score >= 50) return "text-partial";
    return "text-unverified";
  };

  const getGradient = () => {
    if (score >= 80) return "from-verified to-verified/70";
    if (score >= 50) return "from-partial to-partial/70";
    return "from-unverified to-unverified/70";
  };

  const getLabel = () => {
    if (score >= 80) return "Verified";
    if (score >= 50) return "Partial";
    return "Unreliable";
  };

  const sizeClasses = {
    sm: { container: "w-20 h-20", text: "text-lg", label: "text-xs" },
    md: { container: "w-28 h-28", text: "text-2xl", label: "text-sm" },
    lg: { container: "w-36 h-36", text: "text-3xl", label: "text-base" },
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size].container)}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#confidenceGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="confidenceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={score >= 80 ? "hsl(var(--verified))" : score >= 50 ? "hsl(var(--partial))" : "hsl(var(--unverified))"} />
            <stop offset="100%" stopColor={score >= 80 ? "hsl(var(--verified) / 0.7)" : score >= 50 ? "hsl(var(--partial) / 0.7)" : "hsl(var(--unverified) / 0.7)"} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-display font-bold transition-all duration-300", sizeClasses[size].text, getColorClass())}>
          {Math.round(displayScore)}%
        </span>
        <span className={cn("font-medium", sizeClasses[size].label, getColorClass())}>
          {getLabel()}
        </span>
      </div>
    </div>
  );
};
