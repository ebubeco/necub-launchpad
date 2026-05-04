import { Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo";

const stats = [
  { value: "120+", label: "Early Access Teams" },
  { value: "2.4TB+", label: "Data Processed Every Week" },
  { value: "1.2M+", label: "Automations Executed" },
  { value: "99.99%", label: "System Reliability" },
];

const cols = [
  { title: "Product", links: ["Overview", "Features", "Integrations", "Pricing"] },
  { title: "Resources", links: ["Docs", "Blog", "Guides", "API Reference"] },
  { title: "Company", links: ["About Us", "Careers", "Contact"] },
];

export const StatsFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="container-x py-14">
        {/* Top: about + stats */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Necub is an AI-powered platform that enables businesses to automate
              workflows, process large-scale data, and make intelligent decisions
              using scalable cloud infrastructure. We are building a cloud-native
              system designed to support high-volume data processing and real-time
              analytics.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Integrates with databases, APIs, and cloud storage systems.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:col-span-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-semibold tracking-tight md:text-3xl">
                  <span className="gradient-text">{s.value}</span>
                </div>
                <div className="mt-1 text-xs leading-tight text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-border/70" />

        {/* Footer cols */}
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-5">
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold">{c.title}</div>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-2">
            <div className="text-sm font-semibold">Contact</div>
            <a href="mailto:hello@necub.ai" className="mt-3 block text-sm text-muted-foreground transition-colors hover:text-foreground">
              hello@necub.ai
            </a>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Designed to support high-volume data processing and scalable AI workloads.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Necub, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <span className="mx-1 h-4 w-px bg-border" />
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="X" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
