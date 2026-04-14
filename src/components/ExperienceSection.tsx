import { Briefcase } from "lucide-react";
import { resumeData } from "@/data/resume";
import SectionReveal from "@/components/SectionReveal";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-24">
      <SectionReveal>
        <h2 className="mb-4 text-center font-heading text-3xl font-bold tracking-tight md:text-4xl">
          Work <span className="text-gradient">Experience</span>
        </h2>
        <p className="mx-auto mb-14 max-w-lg text-center text-muted-foreground">
          My professional journey building enterprise applications.
        </p>
      </SectionReveal>

      <div className="relative space-y-8 border-l-2 border-border pl-8">
        {resumeData.experience.map((exp, i) => (
          <SectionReveal key={i} delay={i * 0.15}>
            <div className="group relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background transition-colors group-hover:bg-primary"
              >
                <Briefcase size={12} className="text-primary group-hover:text-primary-foreground" />
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass glow-border glow-border-hover rounded-xl p-6"
              >
                <div className="mb-1 font-mono text-xs text-primary">{exp.period}</div>
                <h3 className="font-heading text-lg font-semibold text-foreground">{exp.role}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{exp.company}</p>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                <ul className="space-y-1.5">
                  {exp.achievements.map((ach, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {ach}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
