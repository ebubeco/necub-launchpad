import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";

const tiers = [
  {
    name: "Starter",
    price: "$0",
    period: "/ month",
    desc: "Explore Necub and ship your first workflow.",
    cta: "Join Early Access",
    href: "/signup",
    features: [
      "Up to 10k events / month",
      "3 connected data sources",
      "Community support",
      "Basic observability",
    ],
  },
  {
    name: "Growth",
    price: "$499",
    period: "/ month",
    desc: "For teams running production AI workloads.",
    cta: "Start with Growth",
    href: "/signup",
    highlight: true,
    features: [
      "10M events / month included",
      "Unlimited data sources",
      "SLA-backed uptime",
      "Audit logs & RBAC",
      "Priority email support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Dedicated infrastructure, security, and support.",
    cta: "Talk to us",
    href: "/resources",
    features: [
      "Dedicated tenancy",
      "VPC peering & private link",
      "SOC 2 / HIPAA scope",
      "Solutions engineering",
      "24/7 incident response",
    ],
  },
];

const Pricing = () => (
  <PageShell
    eyebrow="Pricing"
    title="Simple pricing that scales with you."
    subtitle="Start free during early access. Upgrade when your workloads grow. Built on modern cloud infrastructure designed for scalability and performance."
  >
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {tiers.map((t) => (
        <div
          key={t.name}
          className={`relative p-6 ${t.highlight ? "gradient-border rounded-2xl" : "panel"}`}
        >
          {t.highlight && (
            <div className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-gradient-to-r from-primary to-primary-glow px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
              Most Popular
            </div>
          )}
          <div className="text-sm font-semibold">{t.name}</div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-3xl font-semibold tracking-tight">{t.price}</span>
            <span className="text-xs text-muted-foreground">{t.period}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
          <ul className="mt-5 space-y-2">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 text-primary" /> {f}
              </li>
            ))}
          </ul>
          <Button
            asChild
            className={`mt-6 w-full ${t.highlight ? "bg-gradient-to-r from-primary to-primary-glow text-white" : ""}`}
            variant={t.highlight ? "default" : "outline"}
          >
            <Link to={t.href}>{t.cta}</Link>
          </Button>
        </div>
      ))}
    </div>

    <p className="mt-10 text-center text-xs text-muted-foreground">
      Currently onboarding early teams and scaling infrastructure to support increasing workloads.
    </p>
  </PageShell>
);

export default Pricing;
