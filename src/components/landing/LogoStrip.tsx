import { Box, CircleDot, Cloud, Hexagon, Sparkles, Triangle } from "lucide-react";

const logos = [
  { name: "Acme Corp", Icon: Hexagon },
  { name: "Finova", Icon: Triangle },
  { name: "Datapeak", Icon: CircleDot },
  { name: "Lumenic", Icon: Sparkles },
  { name: "Stackly", Icon: Box },
  { name: "CloudWave", Icon: Cloud },
];

export const LogoStrip = () => {
  return (
    <section className="border-y border-border/60 bg-card/30 py-6">
      <div className="container-x flex flex-wrap items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          Trusted by innovative teams building the future
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {logos.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex items-center gap-2 text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-semibold tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
