import { ExternalLink, FileText, Globe, Book } from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceCardProps {
  title: string;
  type: "document" | "web" | "api" | "knowledge";
  url?: string;
  excerpt?: string;
  reliability: number;
}

export const SourceCard = ({ title, type, url, excerpt, reliability }: SourceCardProps) => {
  const iconMap = {
    document: FileText,
    web: Globe,
    api: ExternalLink,
    knowledge: Book,
  };

  const Icon = iconMap[type];

  return (
    <div className="glass-card p-4 hover:bg-card/80 transition-colors group cursor-pointer">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-foreground truncate">{title}</h4>
            {url && (
              <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
          {excerpt && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{excerpt}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <div className="confidence-bar flex-1 max-w-[100px]">
              <div
                className={cn(
                  "confidence-fill",
                  reliability >= 80 ? "bg-verified" : reliability >= 50 ? "bg-partial" : "bg-unverified"
                )}
                style={{ width: `${reliability}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{reliability}% match</span>
          </div>
        </div>
      </div>
    </div>
  );
};
