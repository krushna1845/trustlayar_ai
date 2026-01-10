import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  type: "verified" | "partial" | "unverified";
  label?: string;
  className?: string;
}

export const TrustBadge = ({ type, label, className }: TrustBadgeProps) => {
  const config = {
    verified: {
      icon: CheckCircle,
      text: label || "Verified",
      bg: "bg-verified/10",
      border: "border-verified/30",
      textColor: "text-verified",
    },
    partial: {
      icon: AlertTriangle,
      text: label || "Partially Verified",
      bg: "bg-partial/10",
      border: "border-partial/30",
      textColor: "text-partial",
    },
    unverified: {
      icon: XCircle,
      text: label || "Unreliable",
      bg: "bg-unverified/10",
      border: "border-unverified/30",
      textColor: "text-unverified",
    },
  };

  const { icon: Icon, text, bg, border, textColor } = config[type];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border",
        bg,
        border,
        className
      )}
    >
      <Icon className={cn("w-4 h-4", textColor)} />
      <span className={cn("text-sm font-medium", textColor)}>{text}</span>
    </div>
  );
};
