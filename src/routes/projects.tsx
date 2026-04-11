import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { resumeData } from "@/data/resume";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects — Manthan Jain" },
      { name: "description", content: "Explore projects built by Manthan Jain including full-stack apps, e-commerce platforms, and enterprise systems." },
    ],
  }),
});

function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-28 pb-12">
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tight md:text-5xl">
          <span className="text-gradient">Projects</span>
        </h1>
        <p className="mx-auto mb-16 max-w-xl text-center text-muted-foreground">
          A selection of things I've built — from enterprise systems to full-stack apps.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resumeData.projects.map((project) => (
            <div
              key={project.name}
              className="glow-border card-hover group flex flex-col justify-between rounded-xl bg-card p-6"
            >
              <div>
                <div className="mb-3 text-3xl">{project.emoji}</div>
                <h2 className="mb-2 text-lg font-semibold text-foreground">{project.name}</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
              </div>

              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/20"
                >
                  View Live <ExternalLink size={14} />
                </a>
              ) : (
                <span className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm text-muted-foreground">
                  Enterprise / Private
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
