import { useState, useRef } from "react";
import { Send, Loader2, Shield, AlertTriangle, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfidenceGauge } from "./ConfidenceGauge";
import { TrustBadge } from "./TrustBadge";
import { SourceCard } from "./SourceCard";
import { supabase } from "@/integrations/supabase/client";

const mockResponses = [
  {
    query: "What is the capital of France?",
    answer: "The capital of France is Paris. Paris is located in northern central France and is the country's largest city and main cultural and economic center.",
    score: 98,
    sources: [
      { title: "Wikipedia - Paris", type: "web" as const, reliability: 99, excerpt: "Paris is the capital and largest city of France..." },
      { title: "World Atlas", type: "knowledge" as const, reliability: 97, excerpt: "France's capital city Paris..." },
    ],
    warnings: [],
  },
  {
    query: "latest legal precedent for AI misuse",
    answer: "Based on available verified sources, there are emerging legal frameworks around AI misuse, but specific precedent cases vary by jurisdiction. The EU AI Act (2024) provides regulatory guidelines.",
    score: 42,
    sources: [
      { title: "EU AI Act Summary", type: "document" as const, reliability: 85, excerpt: "The AI Act establishes rules for AI systems..." },
    ],
    warnings: ["Limited verified legal precedents found", "Information may be jurisdiction-specific", "Recommend consulting legal databases"],
  },
];

export const DemoSection = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<typeof mockResponses[0] | null>(null);
  const [uploadedImages, setUploadedImages] = useState<{ file: File; preview: string; url?: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newImages: { file: File; preview: string; url?: string }[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;
      
      const preview = URL.createObjectURL(file);
      const fileName = `${Date.now()}-${file.name}`;
      
      try {
        const { data, error } = await supabase.storage
          .from('uploads')
          .upload(fileName, file);

        if (error) {
          console.error('Upload error:', error);
          newImages.push({ file, preview });
        } else {
          const { data: urlData } = supabase.storage
            .from('uploads')
            .getPublicUrl(fileName);
          newImages.push({ file, preview, url: urlData.publicUrl });
        }
      } catch (err) {
        console.error('Upload error:', err);
        newImages.push({ file, preview });
      }
    }

    setUploadedImages(prev => [...prev, ...newImages]);
    setIsUploading(false);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() && uploadedImages.length === 0) return;

    setIsLoading(true);
    setResult(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check if query matches any mock response (simplified matching)
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("capital") || lowerQuery.includes("france") || lowerQuery.includes("paris")) {
      setResult(mockResponses[0]);
    } else {
      setResult(mockResponses[1]);
    }

    setIsLoading(false);
  };

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };

  return (
    <section id="demo" className="py-24 px-4 relative">
      <div className="absolute inset-0 gradient-glow opacity-30" />
      
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Try the <span className="text-gradient-primary">Trust Layer</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ask any question and see how our verification system analyzes the AI response for reliability.
          </p>
        </div>

        {/* Query Input */}
        <form onSubmit={handleSubmit} className="glass-card-elevated p-6 mb-8">
          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {uploadedImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.preview}
                    alt={`Upload ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            
            {/* Image upload button */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="shrink-0"
            >
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ImagePlus className="w-5 h-5" />
              )}
            </Button>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question to verify..."
              className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <Button type="submit" variant="hero" size="lg" disabled={isLoading || (!query.trim() && uploadedImages.length === 0)}>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Verify
                </>
              )}
            </Button>
          </div>
          
          {/* Example queries */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Try:</span>
            <button
              type="button"
              onClick={() => handleExampleClick("What is the capital of France?")}
              className="text-sm text-primary hover:underline"
            >
              "What is the capital of France?"
            </button>
            <span className="text-muted-foreground">or</span>
            <button
              type="button"
              onClick={() => handleExampleClick("Give latest legal precedent for AI misuse in India")}
              className="text-sm text-primary hover:underline"
            >
              "Latest legal precedent for AI misuse"
            </button>
          </div>
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className="glass-card p-12 text-center animate-fade-in">
            <div className="inline-flex items-center gap-3 text-muted-foreground">
              <Shield className="w-6 h-6 animate-pulse text-primary" />
              <span>Analyzing response and verifying sources...</span>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <div className="space-y-6 animate-slide-up">
            {/* Main Result Card */}
            <div className="glass-card-elevated p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Confidence Gauge */}
                <div className="flex flex-col items-center gap-4">
                  <ConfidenceGauge score={result.score} size="lg" />
                  <TrustBadge
                    type={result.score >= 80 ? "verified" : result.score >= 50 ? "partial" : "unverified"}
                  />
                </div>

                {/* Answer Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-3 font-display">AI Response</h3>
                  <p className="text-foreground/90 leading-relaxed">{result.answer}</p>
                  
                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <div className="mt-4 p-4 rounded-lg bg-partial/10 border border-partial/20">
                      <div className="flex items-center gap-2 text-partial mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="font-medium text-sm">Verification Warnings</span>
                      </div>
                      <ul className="space-y-1">
                        {result.warnings.map((warning, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-partial">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4 font-display">Verified Sources</h3>
              <div className="grid gap-3">
                {result.sources.map((source, index) => (
                  <SourceCard key={index} {...source} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
