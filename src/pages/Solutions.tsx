import { Banknote, Boxes, Factory, HeartPulse, Network, ShoppingBag } from "lucide-react";
import { PageShell } from "@/components/PageShell";

const cases = [
  { icon: Banknote, industry: "FinTech", title: "Real-time fraud detection", desc: "Stream transactions through AI scoring with sub-100ms decisions and full audit trails." },
  { icon: ShoppingBag, industry: "E-commerce", title: "Personalization at scale", desc: "Unify catalog, behavioral and order data to power individualized experiences across channels." },
  { icon: HeartPulse, industry: "Healthcare", title: "Clinical workflow automation", desc: "Automate intake, eligibility, and claims processing with HIPAA-aligned controls." },
  { icon: Factory, industry: "Operations", title: "Supply chain intelligence", desc: "Forecast demand and detect disruptions across multiple data sources in real time." },
  { icon: Network, industry: "SaaS", title: "Internal AI copilots", desc: "Ship internal copilots that read from your data warehouse and act on production systems." },
  { icon: Boxes, industry: "Data Teams", title: "Scalable data processing", desc: "Run high-volume batch and streaming jobs without managing clusters." },
];

const Solutions = () => (
  <PageShell
    eyebrow="Solutions"
    title="Built for teams running real workloads."
    subtitle="From FinTech to SaaS, Necub powers the systems that need to be reliable, fast, and observable. Designed to support high-volume data processing and scalable AI workloads."
  >
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {cases.map((c) => (
        <div key={c.title} className="panel p-6 hover-lift">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
            <c.icon className="h-3.5 w-3.5" /> {c.industry}
          </div>
          <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-16 panel p-8">
      <h2 className="text-xl font-semibold">Why teams choose Necub</h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-2">
        <li>• Cloud-native architecture that scales with your workloads</li>
        <li>• Native connectors for databases, APIs, and cloud storage</li>
        <li>• Real-time streaming and batch processing in one runtime</li>
        <li>• Production-grade observability, RBAC, and audit logs</li>
      </ul>
    </div>
  </PageShell>
);

export default Solutions;
