import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Download } from "lucide-react";
import { motion } from "framer-motion";
import { resumeData } from "@/data/resume";
import profileImg from "@/assets/profile.jpeg";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        {/* Floating Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative animate-[float_6s_ease-in-out_infinite]">
            {/* Outer orbit ring */}
            <div className="absolute -inset-6 rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]">
              <div className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-primary/60 shadow-[0_0_10px_2px_rgba(99,102,241,0.4)]" />
            </div>
            {/* Inner orbit ring */}
            <div className="absolute -inset-3 rounded-full border border-accent/15 animate-[spin_12s_linear_infinite_reverse]">
              <div className="absolute top-1/2 -right-1 h-2 w-2 rounded-full bg-accent/50 shadow-[0_0_8px_2px_rgba(168,85,247,0.3)]" />
            </div>
            {/* Glow behind image */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 blur-xl animate-[pulse_4s_ease-in-out_infinite]" />
            <img
              src={profileImg}
              alt={resumeData.name}
              className="relative h-36 w-36 rounded-full border-2 border-primary/40 object-cover shadow-[0_0_40px_8px_rgba(99,102,241,0.15)] md:h-44 md:w-44"
            />
          </div>
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground">
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
            href="/Manthan_Jain_Resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/20"
          >
            <Download size={16} /> Download Resume
          </a>
          <a
            href={`mailto:${resumeData.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-surface-hover"
          >
            Get in Touch
          </a>
        </div>
      </motion.div>
    </section>
  );
}
