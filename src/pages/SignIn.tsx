import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Copy, ShieldCheck, Sparkles } from "lucide-react";
import { Logo } from "@/components/landing/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

const DEMO_EMAIL = "admin@necub.ai";
const DEMO_PASSWORD = "NecubAdmin2025!";

const SignIn = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) setError(error);
    else navigate("/dashboard", { replace: true });
  };

  const useDemo = async () => {
    setError("");
    setDemoLoading(true);
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    let result = await signIn(DEMO_EMAIL, DEMO_PASSWORD);
    if (result.error) {
      // Auto-provision the demo account on first use
      const { error: signUpErr } = await supabase.auth.signUp({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      });
      if (signUpErr && !signUpErr.message.toLowerCase().includes("registered")) {
        setDemoLoading(false);
        setError(signUpErr.message);
        return;
      }
      result = await signIn(DEMO_EMAIL, DEMO_PASSWORD);
    }
    setDemoLoading(false);
    if (result.error) {
      setError(
        "Demo account is provisioning. If your project requires email confirmation, disable it in Auth settings or try again in a moment.",
      );
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[400px] glow pointer-events-none" />
      <div className="relative w-full max-w-md panel p-8">
        <Link to="/" className="inline-flex"><Logo /></Link>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to your Necub workspace.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-card/60" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-card/60" />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-glow text-white"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        {/* Demo Access */}
        <div className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold">Demo Access</h2>
            <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
              Reviewer
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Use the credentials below to explore the full administrator dashboard.
          </p>
          <div className="mt-3 space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-md border border-border/60 bg-background/40 px-2.5 py-1.5">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</div>
                <div className="font-mono">{DEMO_EMAIL}</div>
              </div>
              <button onClick={() => copy(DEMO_EMAIL)} className="text-muted-foreground hover:text-foreground" aria-label="Copy email">
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md border border-border/60 bg-background/40 px-2.5 py-1.5">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Password</div>
                <div className="font-mono">{DEMO_PASSWORD}</div>
              </div>
              <button onClick={() => copy(DEMO_PASSWORD)} className="text-muted-foreground hover:text-foreground" aria-label="Copy password">
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <Button
            type="button"
            onClick={useDemo}
            disabled={demoLoading}
            variant="outline"
            className="mt-3 w-full border-primary/40"
          >
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            {demoLoading ? "Preparing demo…" : "Sign in with demo account"}
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          New to Necub?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Join early access
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;
