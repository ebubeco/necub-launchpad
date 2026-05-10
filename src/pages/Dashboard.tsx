import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  Boxes,
  Cloud,
  Database,
  Gauge,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  // Users icon removed (Team nav item dropped)
  Workflow,
  Zap,
  Radio,
  CheckCircle2,
  Loader2,
  Clock,
  Server,
  HardDrive,
  Cpu,
  Webhook,
  Network,
  Globe,
} from "lucide-react";
import {
  BarChart3,
  Brain,
  GitBranch,
  Layers,
  PieChart,
  Rocket,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Logo";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

const operationalUseCases = [
  { icon: Brain, title: "AI analytics pipelines", desc: "End-to-end model scoring on streaming data, persisted to your warehouse." },
  { icon: Radio, title: "Real-time event processing", desc: "Sub-second ingestion from APIs, queues, and webhooks at scale." },
  { icon: GitBranch, title: "Workflow orchestration", desc: "DAG-based scheduling with retries, fan-out, and dependency tracking." },
  { icon: PieChart, title: "Business intelligence automation", desc: "Auto-refresh dashboards, KPI alerts, and scheduled reporting." },
  { icon: Layers, title: "Distributed data ingestion", desc: "Multi-source replication into your lake with schema evolution." },
];

const exampleWorkloads = [
  { icon: BarChart3, title: "Processing customer analytics pipelines", desc: "Aggregating event streams into warehouse-ready feature tables.", status: "Running" },
  { icon: Radio, title: "Synchronizing distributed event streams", desc: "Cross-region replication with exactly-once delivery guarantees.", status: "Streaming" },
  { icon: PieChart, title: "Automating business intelligence workflows", desc: "Scheduled refreshes, KPI snapshots, and downstream notifications.", status: "Scheduled" },
  { icon: Brain, title: "Scaling AI inference operations", desc: "Autoscaled model serving across a distributed GPU pool.", status: "Operational" },
  { icon: GitBranch, title: "Real-time data orchestration", desc: "DAG execution coordinating ingest, transform, and inference stages.", status: "Running" },
];

const seedDeployments = [
  { name: "Workflow engine updated", status: "Success", minutesAgo: 4 },
  { name: "Analytics pipeline deployed", status: "Success", minutesAgo: 22 },
  { name: "Infrastructure sync completed", status: "Success", minutesAgo: 58 },
  { name: "Processing node optimized", status: "Success", minutesAgo: 142 },
];

const sources = [
  { name: "Postgres — production", status: "Connected", icon: Database, throughput: "1.2k rows/s" },
  { name: "S3 — events-archive", status: "Connected", icon: Cloud, throughput: "480 obj/min" },
  { name: "Stripe API", status: "Syncing", icon: Zap, throughput: "92 events/s" },
  { name: "Snowflake — analytics", status: "Connected", icon: Boxes, throughput: "640 rows/s" },
];

const pipelineStages = [
  { name: "Ingest", icon: Radio, detail: "API + DB streams" },
  { name: "Transform", icon: Workflow, detail: "Schema mapping" },
  { name: "AI Inference", icon: Zap, detail: "Model serving" },
  { name: "Output", icon: CheckCircle2, detail: "Write to sinks" },
];

const initialWorkflows = [
  { name: "Real-time fraud scoring", runs: 12481, status: "Running" },
  { name: "Daily revenue summary", runs: 365, status: "Completed" },
  { name: "Customer churn prediction", runs: 1204, status: "Running" },
  { name: "Inventory forecasting", runs: 8732, status: "Queued" },
];

const seedActivity = [
  "Workflow real-time-fraud-scoring processed 412 events",
  "Postgres connector synced 12,400 rows",
  "Model inference latency p95 = 84ms",
  "Snowflake connector authenticated successfully",
  "API ingestion: 9,823 events from /v1/webhooks",
  "Pipeline transform stage completed in 1.2s",
  "S3 archive flushed 240 objects",
  "Churn model retrained (auc=0.91)",
];

const useNow = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
};

const relTime = (date: Date, now: Date) => {
  const s = Math.max(1, Math.floor((now.getTime() - date.getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const now = useNow();
  const [signups, setSignups] = useState<number | null>(null);
  const isAdmin = user?.email === "admin@necub.ai";
  const [lastSync, setLastSync] = useState(() => new Date());
  const [workflows, setWorkflows] = useState(initialWorkflows);
  const [infra, setInfra] = useState(() => ({
    apiRequests: 184_320 + Math.floor(Math.random() * 4000),
    integrations: 14,
    throughput: 2.3,
    storage: 62,
    responseMs: 142,
  }));

  // Live, slowly-incrementing metrics — dashboard "loads differently" each time
  const [metrics, setMetrics] = useState(() => ({
    events: 1_280_000 + Math.floor(Math.random() * 20000),
    jobs: 48230 + Math.floor(Math.random() * 400),
    workflows: 12,
    latency: 80 + Math.floor(Math.random() * 12),
  }));

  const [activity, setActivity] = useState(() => {
    const start = Date.now();
    return seedActivity.slice(0, 6).map((text, i) => ({
      id: `${start}-${i}`,
      text,
      at: new Date(start - i * 1000 * 60 * (1 + Math.random() * 4)),
    }));
  });

  useEffect(() => {
    supabase
      .from("early_access_emails")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => setSignups(count ?? null));
  }, []);

  // Live updates every 4s: bump metrics + push new activity item
  useEffect(() => {
    const id = setInterval(() => {
      setMetrics((m) => ({
        events: m.events + Math.floor(40 + Math.random() * 220),
        jobs: m.jobs + Math.floor(1 + Math.random() * 6),
        workflows: m.workflows,
        latency: Math.max(62, Math.min(112, m.latency + (Math.random() > 0.5 ? 1 : -1))),
      }));
      setActivity((prev) => {
        const next = {
          id: `${Date.now()}`,
          text: seedActivity[Math.floor(Math.random() * seedActivity.length)],
          at: new Date(),
        };
        return [next, ...prev].slice(0, 7);
      });
      setInfra((p) => ({
        apiRequests: p.apiRequests + Math.floor(40 + Math.random() * 180),
        integrations: p.integrations,
        throughput: Math.max(1.4, Math.min(4.2, p.throughput + (Math.random() - 0.5) * 0.2)),
        storage: Math.max(48, Math.min(82, p.storage + (Math.random() > 0.5 ? 1 : -1))),
        responseMs: Math.max(110, Math.min(190, p.responseMs + Math.floor((Math.random() - 0.5) * 8))),
      }));
      setWorkflows((ws) =>
        ws.map((w, i) => {
          if (Math.random() > 0.6) {
            const order = ["Running", "Queued", "Completed"] as const;
            const idx = order.indexOf(w.status as (typeof order)[number]);
            return { ...w, status: order[(idx + 1) % order.length], runs: w.runs + Math.floor(Math.random() * 5) };
          }
          return { ...w, runs: w.runs + (i % 2) };
        }),
      );
      setLastSync(new Date());
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const fmt = (n: number) => n.toLocaleString();

  const onLogout = async () => {
    await signOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-border/60 bg-card/30 md:block">
          <div className="p-5"><Link to="/"><Logo /></Link></div>
          <nav className="px-3 space-y-1 text-sm">
            {[
              { icon: LayoutDashboard, label: "Overview", to: "#overview" },
              { icon: Workflow, label: "Workflows", to: "#workflows" },
              { icon: Database, label: "Data Sources", to: "#integrations" },
              { icon: Activity, label: "Activity", to: "#activity" },
              { icon: Settings, label: "Settings", to: "/settings", route: true },
            ].map((i) =>
              i.route ? (
                <Link
                  key={i.label}
                  to={i.to}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                >
                  <i.icon className="h-4 w-4" /> {i.label}
                </Link>
              ) : (
                <a
                  key={i.label}
                  href={i.to}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left ${
                    i.label === "Overview"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  <i.icon className="h-4 w-4" /> {i.label}
                </a>
              ),
            )}
          </nav>
          <div className="mt-6 mx-3 rounded-lg border border-border/60 bg-muted/20 p-3 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2 text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Real-time processing
            </div>
            <p className="mt-2 leading-relaxed">
              Streaming ingestion from APIs, databases & cloud storage.
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/70 px-6 backdrop-blur-xl">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Workspace</div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                {user?.email}
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
                    <ShieldCheck className="h-3 w-3" /> Administrator
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live · {now.toLocaleTimeString()}
              </span>
              <span className="hidden md:inline text-[11px]">
                Last sync: {relTime(lastSync, now)}
              </span>
              <Button asChild variant="outline" size="sm">
                <Link to="/settings"><Settings className="mr-1 h-3.5 w-3.5" /> Settings</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="mr-1 h-3.5 w-3.5" /> Logout
              </Button>
            </div>
          </header>

          <div className="container-x py-8 space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Welcome to Necub</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Last login: {now.toLocaleString()} · Currently onboarding early teams and scaling
                  infrastructure to support increasing data workloads.
                </p>
                <p className="mt-2 max-w-3xl text-sm font-medium text-foreground/90">
                  Processing high-volume datasets and scaling AI workloads across distributed cloud infrastructure.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="mr-1 h-4 w-4" /> New workflow
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow text-white">
                  <Database className="mr-1 h-4 w-4" /> Connect a data source
                </Button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Gauge, label: "Events processed (24h)", value: fmt(metrics.events), accent: "text-primary" },
                { icon: Zap, label: "Jobs executed", value: fmt(metrics.jobs), accent: "text-emerald-400" },
                { icon: Workflow, label: "Active workflows", value: fmt(metrics.workflows), accent: "text-primary-glow" },
                { icon: Clock, label: "Inference latency p95", value: `${metrics.latency}ms`, accent: "text-amber-400" },
              ].map((m) => (
                <div key={m.label} className="panel p-5 animate-fade-up">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.label}</div>
                    <m.icon className={`h-4 w-4 ${m.accent}`} />
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{m.value}</div>
                </div>
              ))}
            </div>

            {/* Infrastructure positioning */}
            <div className="panel p-5 border-primary/20">
              <p className="text-sm font-medium text-foreground/90">
                Necub is designed to support scalable AI operations, distributed processing, and high-volume cloud-native workloads.
              </p>
            </div>

            {/* API & Infrastructure Overview */}
            {isAdmin && (
              <div className="panel p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold">API & Infrastructure Overview</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Live operational telemetry across the Necub control plane.
                    </p>
                  </div>
                  <span className="text-[11px] text-muted-foreground">System health updated: just now</span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
                  {[
                    { icon: Globe, label: "API requests today", value: fmt(infra.apiRequests), badge: "Healthy" },
                    { icon: Network, label: "Active integrations", value: `${infra.integrations}`, badge: "Connected" },
                    { icon: Cpu, label: "Throughput", value: `${infra.throughput.toFixed(1)}K/s`, badge: "Streaming" },
                    { icon: HardDrive, label: "Storage utilization", value: `${infra.storage}%`, badge: "Nominal" },
                    { icon: Timer, label: "Avg response time", value: `${infra.responseMs}ms`, badge: "Operational" },
                  ].map((m) => (
                    <div key={m.label} className="rounded-lg border border-border/70 bg-muted/20 p-3 transition-colors hover:border-primary/40">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <m.icon className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[10px] uppercase tracking-widest">{m.label}</span>
                      </div>
                      <div className="mt-2 text-lg font-semibold tabular-nums">{m.value}</div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-700"
                          style={{ width: `${40 + (m.value.length * 7) % 55}%` }}
                        />
                      </div>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] text-emerald-400">
                        <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                        {m.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Operational Use Cases */}
            <div className="panel p-6">
              <div>
                <h2 className="text-base font-semibold">Operational Use Cases</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  How enterprise teams deploy Necub across their AI infrastructure.
                </p>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {operationalUseCases.map((u) => (
                  <div
                    key={u.title}
                    className="group rounded-lg border border-border/70 bg-muted/20 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted/30"
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <u.icon className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-medium">{u.title}</div>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{u.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Workloads */}
            <div className="panel p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Example Workloads</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Necub orchestrates AI workflows, real-time analytics, and distributed data processing across cloud-native infrastructure.
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  All systems nominal
                </span>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {exampleWorkloads.map((w) => {
                  const tone =
                    w.status === "Running" || w.status === "Streaming" || w.status === "Operational"
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                      : "border-amber-400/30 bg-amber-400/10 text-amber-400";
                  return (
                    <div
                      key={w.title}
                      className="group rounded-lg border border-border/70 bg-muted/20 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted/30 hover:shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.4)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                            <w.icon className="h-4 w-4" />
                          </div>
                          <div className="text-sm font-medium leading-tight">{w.title}</div>
                        </div>
                        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] uppercase tracking-widest ${tone}`}>
                          <span className="h-1 w-1 rounded-full bg-current animate-pulse" />
                          {w.status}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  { label: "Last infrastructure sync", value: relTime(lastSync, now) },
                  { label: "Processing queue", value: `${12 + (metrics.jobs % 8)} active · healthy` },
                  { label: "Realtime throughput", value: `${infra.throughput.toFixed(1)}K events/s` },
                  { label: "Node health", value: `${10 + (metrics.workflows % 5)}/12 nominal` },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg border border-border/70 bg-muted/20 p-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>
                      {s.label}
                    </div>
                    <div className="mt-2 text-sm font-semibold tabular-nums">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>


            <div className="panel p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Recent Deployments</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Continuous delivery across infrastructure services.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <Rocket className="h-3 w-3" /> Auto-deploy enabled
                </span>
              </div>
              <ul className="mt-4 divide-y divide-border/60">
                {seedDeployments.map((d) => (
                  <li key={d.name} className="flex items-center justify-between py-3 text-sm animate-fade-up">
                    <div className="flex items-center gap-3">
                      <div className="grid h-7 w-7 place-items-center rounded-md bg-emerald-400/10 text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="font-medium">{d.name}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {relTime(new Date(now.getTime() - d.minutesAgo * 60_000), now)}
                        </div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-emerald-400">
                      {d.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="panel p-6 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold">Pipeline Status</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Distributed compute fleet, ingestion queue & API surface.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Operational
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
                  {[
                    { icon: Server, label: "Active Nodes", value: `${10 + (metrics.workflows % 5)}`, badge: "Synced" },
                    { icon: Clock, label: "Queue Latency", value: `${Math.max(28, metrics.latency - 40)}ms`, badge: "Operational" },
                    { icon: Cpu, label: "Jobs Running", value: `${12 + (metrics.jobs % 6)}`, badge: "Processing" },
                    { icon: Globe, label: "API Uptime", value: "99.99%", badge: "Operational" },
                    { icon: Radio, label: "Ingestion", value: "2.3K/min", badge: "Synced" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-border/70 bg-muted/20 p-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <s.icon className="h-3.5 w-3.5 text-primary" />
                        <span className="text-[10px] uppercase tracking-widest">{s.label}</span>
                      </div>
                      <div className="mt-2 text-lg font-semibold tabular-nums">{s.value}</div>
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[10px] text-emerald-400">
                        <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                        {s.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel p-6">
                <h2 className="text-base font-semibold">System Health</h2>
                <p className="mt-1 text-[11px] text-muted-foreground">Live utilization across the cluster.</p>
                <div className="mt-4 space-y-4">
                  {[
                    { label: "Compute Load", value: 58 + (metrics.jobs % 18) },
                    { label: "Storage Utilization", value: 42 + (metrics.events % 13) },
                    { label: "Queue Activity", value: 30 + (metrics.latency % 25) },
                    { label: "Active Workflows", value: 70 + ((metrics.workflows * 2) % 18) },
                  ].map((h) => {
                    const pct = Math.min(96, Math.max(8, h.value));
                    return (
                      <div key={h.label}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{h.label}</span>
                          <span className="tabular-nums">{pct}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Integrations */}
            <div className="panel p-6">
              <div>
                <h2 className="text-base font-semibold">Integrations</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Necub integrates with databases, APIs, and cloud storage systems to orchestrate scalable AI workflows.
                </p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
                {[
                  { icon: Database, name: "PostgreSQL", status: "Connected" },
                  { icon: Network, name: "REST APIs", status: "Connected" },
                  { icon: Cloud, name: "Cloud Storage", status: "Connected" },
                  { icon: Webhook, name: "Webhooks", status: "Connected" },
                  { icon: Radio, name: "Event Streams", status: "Streaming" },
                ].map((i) => (
                  <div key={i.name} className="flex items-center gap-3 rounded-lg border border-border/70 bg-muted/20 p-3">
                    <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                      <i.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium">{i.name}</div>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
                        <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                        {i.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Processing pipeline */}
            <div className="panel p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Processing pipeline</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Real-time data ingestion from APIs, databases & cloud storage → AI inference → sinks.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                  <Loader2 className="h-3 w-3 animate-spin" /> Streaming
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                {pipelineStages.map((s, i) => (
                  <div
                    key={s.name}
                    className="relative rounded-lg border border-border/70 bg-muted/20 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/10 text-primary">
                        <s.icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="text-sm font-medium">{s.name}</div>
                    </div>
                    <div className="mt-2 text-[11px] text-muted-foreground">{s.detail}</div>
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-glow"
                        style={{
                          width: `${60 + ((Math.sin(now.getTime() / 800 + i) + 1) / 2) * 35}%`,
                          transition: "width 600ms ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Activity (live) */}
              <div className="panel p-6 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Recent activity</h2>
                  <span className="text-[11px] text-muted-foreground">Updated live</span>
                </div>
                <ul className="mt-4 divide-y divide-border/60">
                  {activity.map((a) => (
                    <li
                      key={a.id}
                      className="flex items-start justify-between gap-4 py-3 text-sm animate-fade-up"
                    >
                      <span className="flex items-start gap-2 text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {a.text}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground/70 tabular-nums">
                        {relTime(a.at, now)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sources / data ingestion */}
              <div className="panel p-6">
                <h2 className="text-base font-semibold">Data ingestion</h2>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  External integrations streaming into Necub.
                </p>
                <ul className="mt-4 space-y-3">
                  {sources.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                          <s.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{s.name}</div>
                          <div className="text-[11px] text-muted-foreground">{s.throughput}</div>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-widest ${
                          s.status === "Connected" ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        <span className="relative flex h-1.5 w-1.5">
                          <span
                            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                              s.status === "Connected" ? "bg-emerald-400" : "bg-amber-400"
                            }`}
                          />
                          <span
                            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                              s.status === "Connected" ? "bg-emerald-400" : "bg-amber-400"
                            }`}
                          />
                        </span>
                        {s.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Workflows */}
              <div className="panel p-6 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">Workflows</h2>
                  <Button size="sm" variant="outline">
                    <Plus className="mr-1 h-3.5 w-3.5" /> New workflow
                  </Button>
                </div>
                <div className="mt-4 overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/30 text-left text-xs uppercase tracking-widest text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2 font-medium">Name</th>
                        <th className="px-4 py-2 font-medium">Runs (30d)</th>
                        <th className="px-4 py-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workflows.map((w) => {
                        const color =
                          w.status === "Running"
                            ? "text-emerald-400"
                            : w.status === "Queued"
                              ? "text-amber-400"
                              : "text-muted-foreground";
                        return (
                          <tr key={w.name} className="border-t border-border">
                            <td className="px-4 py-3">{w.name}</td>
                            <td className="px-4 py-3 text-muted-foreground tabular-nums">
                              {w.runs.toLocaleString()}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest ${color}`}
                              >
                                {w.status === "Running" && (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                )}
                                {w.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* System status */}
              <div className="panel p-6">
                <h2 className="text-base font-semibold">System status</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {[
                    { label: "API", value: "Operational" },
                    { label: "Database", value: "Connected" },
                    { label: "Processing queue", value: "Active" },
                    { label: "Inference cluster", value: "Healthy" },
                  ].map((s) => (
                    <li
                      key={s.label}
                      className="flex items-center justify-between rounded-md border border-border/60 bg-muted/20 px-3 py-2"
                    >
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px] uppercase tracking-widest">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        {s.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-[11px] text-muted-foreground">
                  Early access signups:{" "}
                  <span className="text-foreground tabular-nums">
                    {signups?.toLocaleString() ?? "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
