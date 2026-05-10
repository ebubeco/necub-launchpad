import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/landing/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

const SignUp = () => {
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    setSuccess(false);
    const trimmed = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const { error } = await signUp(trimmed, password);
    if (!error) {
      // best-effort early-access record; unique constraint handles duplicates
      await supabase.from("early_access_emails").insert([{ email: trimmed }]).then(() => {});
    }
    setLoading(false);
    if (error) {
      const msg = error.toLowerCase();
      if (msg.includes("registered") || msg.includes("already") || msg.includes("exists")) {
        setError("This email is already registered. Please sign in instead.");
      } else {
        setError(error);
      }
    } else setSuccess(true);
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background p-6">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[400px] glow pointer-events-none" />
      <div className="relative w-full max-w-md panel p-8">
        <Link to="/" className="inline-flex"><Logo /></Link>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-primary">
          Limited Availability
        </div>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">Join Early Access</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create your Necub workspace. We're currently onboarding early teams.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-card/60" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-card/60" />
            <p className="text-[11px] text-muted-foreground">At least 6 characters.</p>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          {success && (
            <p className="text-xs text-emerald-400">
              Account created. Check your email to confirm, then sign in.
            </p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-glow text-white"
          >
            {loading ? "Creating account…" : "Join Early Access (Limited Availability)"}
          </Button>
        </form>
        <p className="mt-6 text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
