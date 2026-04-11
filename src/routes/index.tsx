import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import HighlightsSection from "@/components/HighlightsSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Manthan Jain — Full Stack Developer" },
      { name: "description", content: "Portfolio of Manthan Jain, a software developer with 2+ years of experience building scalable web applications." },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <HighlightsSection />
      <Footer />
    </div>
  );
}
