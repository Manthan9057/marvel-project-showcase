import { Link, useLocation } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-mono text-lg font-semibold tracking-tight text-primary">
          {"<MJ />"}
        </Link>

        <div className="flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <Github size={18} />
            </a>
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${resumeData.email}`} className="text-muted-foreground transition-colors hover:text-foreground">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
