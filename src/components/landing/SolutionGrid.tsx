import {
  ArrowRight,
  Brain,
  Cloud,
  Database,
  Gauge,
  Layers,
  LineChart,
  Network,
  ShieldCheck,
  ShoppingCart,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const challenges = [
  { icon: Database, title: "Fragmented Data", desc: "Disconnected systems and silos make it difficult to get a single source of truth." },
  { icon: Workflow, title: "Inefficient Workflows", desc: "Manual processes waste time, increase errors, and slow down growth." },
  { icon: Layers, title: "Scaling Complexity", desc: "Infrastructure that can't scale leads to bottlenecks, downtime, and high costs." },
];

const features = [
  { icon: Brain, title: "AI-Powered Insights", desc: "Turn raw data into actionable intelligence in real time." },
  { icon: LineChart, title: "Real-Time Analytics", desc: "Monitor systems and make decisions instantly." },
  { icon: Cloud, title: "Scalable Architecture", desc: "Handle increasing workloads and high-volume data processing." },
  { icon: ShieldCheck, title: "Secure Infrastructure", desc: "Built with modern security and reliability practices." },
];

const steps = [
  { n: 1, title: "Connect Your Data", desc: "Easily integrate your databases, APIs, files, and streaming sources." },
  { n: 2, title: "Analyze with AI", desc: "Our models process your data and generate deep insights." },
  { n: 3, title: "Automate & Scale", desc: "Automate workflows, optimize operations, and scale seamlessly." },
];

const useCases = [
  { icon: Network, title: "SaaS Platforms", desc: "Automate user workflows, billing, and analytics." },
  { icon: Wallet, title: "FinTech Systems", desc: "Detect fraud, assess risk, and streamline financial operations." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Optimize inventory, personalize experiences, and boost revenue." },
  { icon: Users, title: "Data Teams", desc: "Centralize, analyze, and visualize data at scale." },
];

export const SolutionGrid = () => {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Challenges */}
        <div className="panel p-6 lg:col-span-3">
          <h3 className="text-lg font-semibold">The Challenges</h3>
          <ul className="mt-5 space-y-5">
            {challenges.map((c) => (
              <li key={c.title} className="flex gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-muted/30 text-primary">
                  <c.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{c.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution + features */}
        <div className="panel p-6 lg:col-span-4">
          <h3 className="text-lg font-semibold">Our Solution</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Necub combines AI, intelligent automation, and scalable cloud infrastructure
            to help you move faster, work smarter, and scale without limits.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-muted/20 p-3 hover-lift">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                  <f.icon className="h-4 w-4" />
                </div>
                <div className="mt-2 text-sm font-medium">{f.title}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="panel p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold">How It Works</h3>
          <ol className="mt-5 space-y-5">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-3">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-white">
                  {s.n}
                </div>
                <div>
                  <div className="text-sm font-medium">{s.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Use cases */}
        <div className="panel p-6 lg:col-span-3">
          <h3 className="text-lg font-semibold">Use Cases</h3>
          <ul className="mt-5 space-y-4">
            {useCases.map((u) => (
              <li key={u.title} className="flex gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-muted/30 text-primary">
                  <u.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{u.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{u.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl" />
        <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Start building smarter systems with Necub
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Join early adopters leveraging AI and cloud infrastructure to scale faster
              and achieve more.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground">
              <Gauge className="h-3.5 w-3.5 text-primary" />
              Built on modern cloud infrastructure designed for scalability and performance.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-[0_0_32px_-8px_hsl(var(--primary)/0.6)] hover:opacity-95"
            >
              Request Early Access <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
