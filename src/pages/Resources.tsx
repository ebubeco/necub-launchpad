import { useState } from "react";
import { BookOpen, FileText, Newspaper, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageShell } from "@/components/PageShell";

const FORMSPREE = "https://formspree.io/f/mbdwgdpa";

const docs = [
  { icon: BookOpen, title: "Getting Started", desc: "Set up your first Necub workspace and connect a data source in under 10 minutes." },
  { icon: FileText, title: "API Reference", desc: "Typed API for ingest, transform, and decision endpoints." },
  { icon: PlayCircle, title: "Quickstart Video", desc: "Walkthrough: build a real-time scoring pipeline." },
  { icon: Newspaper, title: "Engineering Blog", desc: "How we approach scale, latency, and observability." },
];

const ContactForm = ({ topic }: { topic: string }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    data.append("_topic", topic);
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        e.currentTarget.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input name="name" required placeholder="Your name" className="bg-card/60" />
        <Input name="email" type="email" required placeholder="Work email" className="bg-card/60" />
      </div>
      <Input name="company" placeholder="Company" className="bg-card/60" />
      <Textarea name="message" required placeholder="How can we help?" className="bg-card/60 min-h-[120px]" />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="bg-gradient-to-r from-primary to-primary-glow text-white"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
      {status === "success" && <p className="text-xs text-emerald-400">Thanks — we'll be in touch within one business day.</p>}
      {status === "error" && <p className="text-xs text-destructive">Something went wrong. Please email hello@necub.ai.</p>}
    </form>
  );
};

const Resources = () => (
  <PageShell
    eyebrow="Resources"
    title="Documentation, guides, and a way to talk to us."
    subtitle="Everything you need to evaluate Necub and ship your first workload."
  >
    <h2 className="text-xl font-semibold">Documentation & Guides</h2>
    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
      {docs.map((d) => (
        <div key={d.title} className="panel p-6 hover-lift">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
            <d.icon className="h-4 w-4" />
          </div>
          <h3 className="mt-4 text-sm font-semibold">{d.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div id="demo" className="panel p-6">
        <h3 className="text-base font-semibold">Book a demo</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us about your use case and we'll schedule a 30-minute walkthrough with an engineer.
        </p>
        <div className="mt-5">
          <ContactForm topic="demo" />
        </div>
      </div>
      <div className="panel p-6">
        <h3 className="text-base font-semibold">Contact us</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Questions about pricing, security, or integrations? Drop us a message.
        </p>
        <div className="mt-5">
          <ContactForm topic="contact" />
        </div>
      </div>
    </div>
  </PageShell>
);

export default Resources;
