import { Brain, Cloud, Database, GitBranch, LineChart, Network, Shield, Workflow, Zap } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const capabilities = [
  { icon: Workflow, title: "Workflow Automation", desc: "Compose multi-step pipelines that orchestrate APIs, databases, and AI models with deterministic retries and observability." },
  { icon: Brain, title: "AI Inference Layer", desc: "Run, route, and cache inference across multiple models with built-in cost and latency controls." },
  { icon: Database, title: "Unified Data Plane", desc: "Connect Postgres, Snowflake, S3, Kafka and REST APIs into a single queryable surface." },
  { icon: LineChart, title: "Real-Time Analytics", desc: "Stream metrics, events, and decisions with sub-second materialized views." },
  { icon: Cloud, title: "Cloud-Native Runtime", desc: "Stateless, autoscaling workers built on managed cloud primitives. No infrastructure to babysit." },
  { icon: Shield, title: "Security & Governance", desc: "Encryption in transit and at rest, RBAC, audit logs, and isolated tenant boundaries by default." },
];

const pillars = [
  { icon: Zap, title: "Real-time", desc: "Event-driven processing with millisecond decisioning." },
  { icon: Network, title: "Multi-source", desc: "Native connectors for databases, APIs and cloud storage systems." },
  { icon: GitBranch, title: "Composable", desc: "Build pipelines from typed primitives — version, branch, and roll back safely." },
];

const Product = () => (
  <PageShell
    eyebrow="Product"
    title="One platform for AI workflows, data, and decisions."
    subtitle="Necub integrates with databases, APIs, and cloud storage systems — and is designed to support high-volume data processing and scalable AI workloads."
  >
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {pillars.map((p) => (
        <div key={p.title} className="panel p-6">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
            <p.icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
        </div>
      ))}
    </div>

    <h2 className="mt-16 text-2xl font-semibold tracking-tight">Capabilities</h2>
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {capabilities.map((c) => (
        <div key={c.title} className="panel p-6 hover-lift">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
            <c.icon className="h-4 w-4" />
          </div>
          <h3 className="mt-4 text-sm font-semibold">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-16 panel p-8">
      <h2 className="text-xl font-semibold">Architecture</h2>
      <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
        Necub is a cloud-native AI platform that enables businesses to automate workflows
        and process large-scale datasets in real time. Built on modern cloud infrastructure
        designed for scalability and performance, Necub keeps state in managed Postgres,
        runs ephemeral workers on autoscaling compute, and exposes a strongly-typed API for
        building custom workflows.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-4">
        {["Ingest", "Transform", "Decide", "Deliver"].map((s, i) => (
          <div key={s} className="rounded-xl border border-border bg-muted/20 p-4 text-center">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Stage {i + 1}</div>
            <div className="mt-2 text-sm font-semibold">{s}</div>
          </div>
        ))}
      </div>
    </div>
  </PageShell>
);

export default Product;
