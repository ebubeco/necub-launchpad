import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/landing/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page not found · Necub";
    // eslint-disable-next-line no-console
    console.warn("404:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="relative grid min-h-screen place-items-center bg-background p-6 text-foreground">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[400px] glow pointer-events-none" />
      <div className="relative panel mx-auto w-full max-w-lg p-10 text-center">
        <div className="mb-6 inline-flex"><Logo /></div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-widest text-primary">
          <Compass className="h-3 w-3" /> 404
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page <span className="font-mono text-foreground/80">{location.pathname}</span> doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Button asChild className="bg-gradient-to-r from-primary to-primary-glow text-white">
            <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> Back to homepage</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
