import { ArrowRight, Boxes, Layers, Cloud, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DashboardMock } from "./DashboardMock";
import { EarlyAccessForm } from "./EarlyAccessForm";
import heroCloud from "@/assets/hero-cloud.png";

const credibility = [
  { icon: Layers, label: "Built for scalability" },
  { icon: Boxes, label: "Designed for high-growth teams" },
  { icon: Cloud, label: "Powered by modern cloud infrastructure" },
  { icon: ShieldCheck, label: "Secure by design and privacy-first" },
];

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[600px] glow" />

      <div className="container-x relative grid grid-cols-1 gap-10 pb-16 pt-16 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-20">
        {/* Left */}
        <div className="lg:col-span-5 animate-fade-up">
          <div className="inline-flex items-center rounded-full border border-border bg-card/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            AI-Infrastructure for modern businesses
          </div>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-[56px]">
            AI Infrastructure for{" "}
            <span className="gradient-text">Smarter, Scalable</span> Businesses
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Necub helps teams automate workflows, process large-scale data, and make
            intelligent decisions using modern cloud architecture.
          </p>
          <p className="mt-3 max-w-xl text-sm font-medium text-foreground/90">
            Processing high-volume datasets and scaling AI workloads across distributed cloud infrastructure.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-[0_0_32px_-8px_hsl(var(--primary)/0.6)] hover:opacity-95"
            >
              <Link to="/signup">
                Join Early Access (Limited Availability) <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border bg-card/50">
              <Link to="/resources">Book a Demo</Link>
            </Button>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Limited early access available
            </div>
          </div>

          <div className="mt-5 max-w-md">
            <EarlyAccessForm compact />
          </div>

          <div className="mt-7 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                "from-fuchsia-400 to-purple-600",
                "from-blue-400 to-indigo-600",
                "from-emerald-400 to-teal-600",
                "from-amber-300 to-orange-500",
              ].map((g, i) => (
                <div
                  key={i}
                  className={`h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br ${g}`}
                />
              ))}
            </div>
            <div className="text-sm leading-tight">
              <div className="font-medium">Join 120+ early teams</div>
              <div className="text-muted-foreground">
                Usage is growing as more teams adopt Necub for data processing and automation.
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 lg:max-w-xl">
            {credibility.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-card/50 px-3 py-2.5 hover-lift"
              >
                <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <c.icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs leading-tight text-muted-foreground">{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - dashboard */}
        <div className="lg:col-span-7 animate-fade-in">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[28px] bg-gradient-to-br from-primary/30 via-primary-glow/20 to-transparent blur-2xl"
            />
            <div className="relative">
              <DashboardMock />
            </div>
          </div>

          {/* Built for Scale card */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="panel p-5 hover-lift">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Built for Scale</h3>
                <Cloud className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-3 grid place-items-center rounded-lg border border-border/70 bg-muted/20 p-3">
                <img
                  src={heroCloud}
                  alt="Cloud infrastructure illustration"
                  width={220}
                  height={220}
                  className="h-32 w-auto object-contain"
                />
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Handles large datasets</li>
                <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Supports real-time processing</li>
                <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> Designed for cloud-native environments</li>
              </ul>
            </div>

            <div className="gradient-border rounded-2xl p-5">
              <div className="text-sm font-semibold">Designed to support</div>
              <p className="mt-1 text-sm text-muted-foreground">
                high-volume data processing and scalable AI workloads.
              </p>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
              <p className="mt-4 text-xs text-muted-foreground">
                Integrates with databases, APIs, and cloud storage systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
