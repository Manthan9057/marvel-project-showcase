import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import ScrollProgress from "@/components/ScrollProgress";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Manthan Jain" },
      { name: "description", content: "Get in touch with Manthan Jain for collaboration, freelance work, or job opportunities." },
    ],
  }),
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatedBackground />
      <ScrollProgress />
      <Navbar />
      <div className="pt-16">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
