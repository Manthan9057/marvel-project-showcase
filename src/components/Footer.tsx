import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 px-6 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-5">
          <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
            <Github size={20} />
          </a>
          <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${resumeData.email}`} className="text-muted-foreground transition-colors hover:text-foreground">
            <Mail size={20} />
          </a>
          <a href={resumeData.upwork} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
            <ExternalLink size={20} />
          </a>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} {resumeData.name}. Built with passion.
        </p>
      </div>
    </footer>
  );
}
