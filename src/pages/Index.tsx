import { Hero } from "@/components/landing/Hero";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { Nav } from "@/components/landing/Nav";
import { SolutionGrid } from "@/components/landing/SolutionGrid";
import { StatsFooter } from "@/components/landing/StatsFooter";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Necub — AI Infrastructure for Smarter, Scalable Businesses";
    const desc =
      "Necub helps teams automate workflows, process large-scale data, and make intelligent decisions using modern cloud architecture.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <LogoStrip />
      <SolutionGrid />
      <StatsFooter />
    </main>
  );
};

export default Index;
