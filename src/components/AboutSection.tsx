import { resumeData } from "@/data/resume";
import SectionReveal from "@/components/SectionReveal";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <SectionReveal>
        <h2 className="mb-4 text-center font-heading text-3xl font-bold tracking-tight md:text-4xl">
          About <span className="text-gradient">Me</span>
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-muted-foreground leading-relaxed">
          {resumeData.summary}
        </p>
      </SectionReveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {resumeData.aboutHighlights.map((item, i) => (
          <SectionReveal key={item.title} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass glow-border glow-border-hover rounded-xl p-6"
            >
              <div className="mb-3 text-3xl">{item.icon}</div>
              <h3 className="mb-1 font-heading text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
