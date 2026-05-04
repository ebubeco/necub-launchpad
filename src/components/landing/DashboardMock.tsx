import {
  Activity,
  Bell,
  Boxes,
  Database,
  LayoutGrid,
  Search,
  Settings,
  Sparkles,
  Workflow,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Logo } from "./Logo";

const stats = [
  { label: "Data Processed", value: "2.4 TB", delta: "+18.7%" },
  { label: "Events Processed", value: "98.6%", delta: "+12.4%" },
  { label: "Automation Runs", value: "1.2M", delta: "+24.5%" },
  { label: "Active Workflows", value: "156", delta: "+9.8%" },
];

const sidebar = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: Workflow, label: "Workflows" },
  { icon: Activity, label: "Analytics" },
  { icon: Database, label: "Data Sources" },
  { icon: Sparkles, label: "Automations" },
  { icon: Boxes, label: "Models" },
  { icon: Bell, label: "Alerts" },
  { icon: Settings, label: "Settings" },
];

const workflows = [
  { name: "Customer Onboarding", runs: "12,540" },
  { name: "Inventory Forecasting", runs: "8,732" },
  { name: "Fraud Detection", runs: "6,421" },
];

const activity = [
  { dot: "bg-primary", title: 'Workflow "Order Processing" completed', time: "2 min ago" },
  { dot: "bg-primary-glow", title: 'Model "Churn Predictor" retrained', time: "15 min ago" },
  { dot: "bg-emerald-400", title: 'Data source "Sales DB" synced', time: "28 min ago" },
];

const sources = [
  { label: "Databases", value: 45, color: "bg-primary" },
  { label: "APIs", value: 25, color: "bg-primary-glow" },
  { label: "Files", value: 20, color: "bg-fuchsia-400" },
  { label: "Streams", value: 10, color: "bg-emerald-400" },
];

const Spark = () => (
  <svg viewBox="0 0 320 90" className="h-24 w-full">
    <defs>
      <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="hsl(263 85% 66%)" stopOpacity="0.45" />
        <stop offset="100%" stopColor="hsl(263 85% 66%)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,70 C30,60 50,55 70,58 C100,62 120,30 150,32 C180,34 200,55 230,48 C260,42 280,18 320,14 L320,90 L0,90 Z"
      fill="url(#sg)"
    />
    <path
      d="M0,70 C30,60 50,55 70,58 C100,62 120,30 150,32 C180,34 200,55 230,48 C260,42 280,18 320,14"
      fill="none"
      stroke="hsl(263 85% 70%)"
      strokeWidth="2"
    />
  </svg>
);

const Donut = () => {
  const total = sources.reduce((a, s) => a + s.value, 0);
  let acc = 0;
  const r = 28;
  const c = 2 * Math.PI * r;
  const colors = ["hsl(263 85% 66%)", "hsl(220 90% 65%)", "hsl(300 85% 70%)", "hsl(160 75% 55%)"];
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
      <circle cx="40" cy="40" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
      {sources.map((s, i) => {
        const len = (s.value / total) * c;
        const dash = `${len} ${c - len}`;
        const offset = -((acc / total) * c);
        acc += s.value;
        return (
          <circle
            key={s.label}
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke={colors[i]}
            strokeWidth="10"
            strokeDasharray={dash}
            strokeDashoffset={offset}
          />
        );
      })}
    </svg>
  );
};

export const DashboardMock = () => {
  return (
    <div className="panel-strong overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
        <Logo />
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground sm:flex">
            Last 7 days <ChevronDown className="h-3 w-3" />
          </div>
          <Search className="hidden h-4 w-4 text-muted-foreground sm:block" />
          <Bell className="hidden h-4 w-4 text-muted-foreground sm:block" />
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary-glow" />
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-3 hidden border-r border-border/70 p-3 md:block">
          <ul className="space-y-1">
            {sidebar.map((s) => (
              <li
                key={s.label}
                className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-xs ${
                  s.active
                    ? "bg-gradient-to-r from-primary/15 to-transparent text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <s.icon className="h-3.5 w-3.5" />
                {s.label}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main */}
        <main className="col-span-12 space-y-3 p-4 md:col-span-9">
          <div>
            <h3 className="text-base font-semibold">Overview</h3>
            <p className="text-xs text-muted-foreground">
              Real-time overview of your data, workflows and system performance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border/70 bg-muted/20 p-3">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{s.label}</div>
                <div className="mt-1 text-lg font-semibold">{s.value}</div>
                <div className="mt-0.5 flex items-center gap-1 text-[10px] text-emerald-400">
                  <TrendingUp className="h-3 w-3" /> {s.delta} vs last week
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="rounded-lg border border-border/70 bg-muted/20 p-3 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium">Data Processing</div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  View analytics <ChevronDown className="h-3 w-3" />
                </div>
              </div>
              <Spark />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                {["May 12", "May 13", "May 14", "May 15", "May 16", "May 17", "May 18"].map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
              <div className="text-xs font-medium">Top Workflows</div>
              <ul className="mt-2 space-y-2">
                {workflows.map((w) => (
                  <li key={w.name} className="text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground/90">{w.name}</span>
                      <span className="text-muted-foreground">{w.runs} runs</span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded-full bg-border">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-glow"
                        style={{ width: `${Math.min(100, parseInt(w.runs.replace(/,/g, "")) / 130)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
              <div className="text-xs font-medium">System Status</div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>All systems operational</span>
                <span className="ml-auto text-muted-foreground">100%</span>
              </div>
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
              <div className="text-xs font-medium">Recent Activity</div>
              <ul className="mt-2 space-y-2">
                {activity.map((a) => (
                  <li key={a.title} className="flex items-start gap-2 text-[11px]">
                    <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
                    <div>
                      <div className="text-foreground/90">{a.title}</div>
                      <div className="text-muted-foreground">{a.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-border/70 bg-muted/20 p-3">
              <div className="text-xs font-medium">Data Sources</div>
              <div className="mt-1 flex items-center gap-3">
                <Donut />
                <ul className="flex-1 space-y-1 text-[11px]">
                  {sources.map((s) => (
                    <li key={s.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className={`h-1.5 w-1.5 rounded-full ${s.color}`} /> {s.label}
                      </span>
                      <span>{s.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
