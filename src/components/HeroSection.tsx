import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Download } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[300px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted-foreground">
          <MapPin size={14} className="text-primary" />
          {resumeData.location}
        </div>

        <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Hi, I'm{" "}
          <span className="text-gradient">{resumeData.name.split(" ")[0]}</span>
        </h1>

        <p className="mb-3 font-mono text-lg text-primary md:text-xl">
          {resumeData.role}
        </p>

        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground">
          {resumeData.summary}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
          >
            View Projects <ArrowRight size={16} />
          </Link>
          <a
            href={`mailto:${resumeData.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-surface-hover"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
