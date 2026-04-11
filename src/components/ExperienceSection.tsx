import { Briefcase } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function ExperienceSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
        Experience
      </h2>

      <div className="relative space-y-8 border-l-2 border-border pl-8">
        {resumeData.experience.map((exp, i) => (
          <div key={i} className="group relative">
            <div className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background transition-colors group-hover:bg-primary">
              <Briefcase size={12} className="text-primary group-hover:text-primary-foreground" />
            </div>
            <div className="glow-border card-hover rounded-xl bg-card p-6">
              <div className="mb-1 font-mono text-xs text-primary">{exp.period}</div>
              <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{exp.company}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
