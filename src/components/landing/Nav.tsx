import { ArrowRight, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const links = ["Product", "Solutions", "Resources", "Company", "Pricing"];

export const Nav = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:inline">
            Sign in
          </a>
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)] hover:opacity-95"
          >
            Join Early Access
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <button className="ml-1 grid h-9 w-9 place-items-center rounded-md border border-border md:hidden" aria-label="Menu">
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
