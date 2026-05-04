import { Hexagon } from "lucide-react";

export const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-primary-glow shadow-[0_0_24px_-4px_hsl(var(--primary)/0.6)]">
      <Hexagon className="h-4 w-4 text-white" strokeWidth={2.5} />
    </div>
    <span className="text-lg font-semibold tracking-tight">Necub</span>
  </div>
);
