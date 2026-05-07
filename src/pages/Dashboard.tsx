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
  Users,
  Workflow,
  Zap,
  Radio,
  CheckCircle2,
  Loader2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Logo";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

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
              { icon: LayoutDashboard, label: "Overview", active: true },
              { icon: Workflow, label: "Workflows" },
              { icon: Database, label: "Data Sources" },
              { icon: Activity, label: "Activity" },
              { icon: Users, label: "Team" },
              { icon: Settings, label: "Settings" },
            ].map((i) => (
              <button
                key={i.label}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left ${
                  i.active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                }`}
              >
                <i.icon className="h-4 w-4" /> {i.label}
              </button>
            ))}
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
              <div className="text-sm font-semibold">{user?.email}</div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="hidden sm:inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Live · {now.toLocaleTimeString()}
              </span>
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
                      {initialWorkflows.map((w) => {
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
