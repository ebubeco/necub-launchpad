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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Logo";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

const sources = [
  { name: "Postgres — production", status: "Connected", icon: Database },
  { name: "S3 — events-archive", status: "Connected", icon: Cloud },
  { name: "Stripe API", status: "Syncing", icon: Zap },
  { name: "Snowflake — analytics", status: "Connected", icon: Boxes },
];

const workflows = [
  { name: "Real-time fraud scoring", runs: "12,481", status: "Healthy" },
  { name: "Daily revenue summary", runs: "365", status: "Healthy" },
  { name: "Customer churn prediction", runs: "1,204", status: "Degraded" },
];

const useNow = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const now = useNow();
  const [signups, setSignups] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from("early_access_emails")
      .select("*", { count: "exact", head: true })
      .then(({ count }) => setSignups(count ?? null));
  }, []);

  const activity = useMemo(
    () => [
      { t: "2m ago", text: "Workflow real-time-fraud-scoring completed (412 events)" },
      { t: "14m ago", text: "Postgres connector synced 12,400 rows" },
      { t: "1h ago", text: "New API key issued for production environment" },
      { t: "3h ago", text: "Model inference latency p95 improved to 84ms" },
      { t: "Yesterday", text: "Snowflake connector authenticated successfully" },
    ],
    [],
  );

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
        </aside>

        {/* Main */}
        <main className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/70 px-6 backdrop-blur-xl">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Workspace</div>
              <div className="text-sm font-semibold">{user?.email}</div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{now.toLocaleString()}</span>
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
                  Last login: {now.toLocaleString()} · Currently onboarding early teams and scaling infrastructure.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-primary-glow text-white">
                <Plus className="mr-1 h-4 w-4" /> Connect a data source
              </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Gauge, label: "Events processed (24h)", value: "1,284,302" },
                { icon: Workflow, label: "Active workflows", value: "12" },
                { icon: Database, label: "Connected sources", value: "4" },
                { icon: Users, label: "Early access signups", value: signups?.toLocaleString() ?? "—" },
              ].map((m) => (
                <div key={m.label} className="panel p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.label}</div>
                    <m.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Activity */}
              <div className="panel p-6 lg:col-span-2">
                <h2 className="text-base font-semibold">Recent activity</h2>
                <ul className="mt-4 divide-y divide-border/60">
                  {activity.map((a) => (
                    <li key={a.text} className="flex items-start justify-between gap-4 py-3 text-sm">
                      <span className="text-muted-foreground">{a.text}</span>
                      <span className="shrink-0 text-xs text-muted-foreground/70">{a.t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sources */}
              <div className="panel p-6">
                <h2 className="text-base font-semibold">Connected data sources</h2>
                <ul className="mt-4 space-y-3">
                  {sources.map((s) => (
                    <li key={s.name} className="flex items-center justify-between rounded-lg border border-border bg-muted/20 p-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                          <s.icon className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-medium">{s.name}</div>
                      </div>
                      <span
                        className={`text-[11px] uppercase tracking-widest ${
                          s.status === "Connected" ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {s.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Workflows */}
            <div className="panel p-6">
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
                    {workflows.map((w) => (
                      <tr key={w.name} className="border-t border-border">
                        <td className="px-4 py-3">{w.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{w.runs}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-[11px] uppercase tracking-widest ${
                              w.status === "Healthy" ? "text-emerald-400" : "text-amber-400"
                            }`}
                          >
                            {w.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
