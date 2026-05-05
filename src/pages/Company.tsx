import { PageShell } from "@/components/PageShell";

const values = [
  { title: "Reliability over hype", desc: "We invest in the boring work that makes systems trustworthy at 3am." },
  { title: "Composable by default", desc: "Every primitive is typed, versioned, and inspectable." },
  { title: "Customer-driven roadmap", desc: "Early teams shape what we ship — directly." },
];

const Company = () => (
  <PageShell
    eyebrow="Company"
    title="We're building the AI infrastructure layer for modern businesses."
    subtitle="Founded May 20, 2025 — building in the open with our early access community."
  >
    <div className="panel p-8">
      <h2 className="text-xl font-semibold">About Necub</h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Necub is a cloud-native AI platform that enables businesses to automate workflows
        and process large-scale datasets in real time. We are currently onboarding early
        teams and scaling infrastructure to support increasing workloads, integrating
        multiple data sources to deliver reliable, high-performance analytics.
      </p>
    </div>

    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      {values.map((v) => (
        <div key={v.title} className="panel p-6">
          <div className="text-sm font-semibold">{v.title}</div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
      {[
        { k: "Founded", v: "May 20, 2025" },
        { k: "Headquarters", v: "Remote-first" },
        { k: "Stage", v: "Early Access" },
        { k: "Hiring", v: "Yes — selectively" },
      ].map((f) => (
        <div key={f.k} className="rounded-xl border border-border bg-card/40 p-5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{f.k}</div>
          <div className="mt-2 text-sm font-semibold">{f.v}</div>
        </div>
      ))}
    </div>
  </PageShell>
);

export default Company;
