import { resumeData } from "@/data/resume";
import SectionReveal from "@/components/SectionReveal";
import { motion } from "framer-motion";

export default function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <SectionReveal>
        <h2 className="mb-4 text-center font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Skills & <span className="text-gradient">Tools</span>
        </h2>
        <p className="mx-auto mb-14 max-w-lg text-center text-muted-foreground">
          Technologies I work with daily to build production-ready applications.
        </p>
      </SectionReveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {resumeData.skillCategories.map((cat, catIdx) => (
          <SectionReveal key={cat.category} delay={catIdx * 0.1}>
            <div className="glass glow-border rounded-xl p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-heading text-lg font-semibold text-foreground">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.08, borderColor: "var(--color-primary)" }}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
