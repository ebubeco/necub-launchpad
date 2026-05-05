import { ReactNode } from "react";
import { Nav } from "@/components/landing/Nav";
import { StatsFooter } from "@/components/landing/StatsFooter";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const PageShell = ({ eyebrow, title, subtitle, children }: PageShellProps) => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <section className="relative overflow-hidden border-b border-border/60">
        <div aria-hidden className="absolute inset-0 bg-grid" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-[400px] glow" />
        <div className="container-x relative py-16 lg:py-20">
          {eyebrow && (
            <div className="inline-flex items-center rounded-full border border-border bg-card/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {eyebrow}
            </div>
          )}
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </section>
      <div className="container-x py-14 lg:py-20">{children}</div>
      <StatsFooter />
    </main>
  );
};
