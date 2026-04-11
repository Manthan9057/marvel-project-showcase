import { resumeData } from "@/data/resume";

export default function SkillsSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
        Skills & Tools
      </h2>

      <div className="flex flex-wrap justify-center gap-3">
        {resumeData.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground transition-all hover:border-primary hover:text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
