import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const links = [
  { label: "Product", to: "/product" },
  { label: "Solutions", to: "/solutions" },
  { label: "Resources", to: "/resources" },
  { label: "Company", to: "/company" },
  { label: "Pricing", to: "/pricing" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" aria-label="Necub home"><Logo /></Link>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <Link
              to="/dashboard"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:inline"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/signin"
              className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground md:inline"
            >
              Sign in
            </Link>
          )}
          <Button
            asChild
            size="sm"
            className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)] hover:opacity-95"
          >
            <Link to="/signup">
              Join Early Access
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-1 grid h-9 w-9 place-items-center rounded-md border border-border md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background/95 md:hidden">
          <div className="container-x flex flex-col gap-3 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/signin" onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
              Sign in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
