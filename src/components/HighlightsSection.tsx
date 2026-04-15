import { Zap } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function HighlightsSection() {
  return (
    <section id="highlights" className="mx-auto max-w-4xl px-6 py-24">
      <div className="sticky top-16 z-20 -mx-6 mb-8 bg-background/85 px-6 py-4 backdrop-blur-md">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Key <span className="text-gradient">Highlights</span>
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {resumeData.keyHighlights.map((highlight, i) => (
          <div
            key={i}
            className="glow-border card-hover flex items-start gap-3 rounded-xl bg-card p-5"
          >
            <Zap size={16} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground">{highlight}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
