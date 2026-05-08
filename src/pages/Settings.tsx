import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, KeyRound, Mail, ShieldCheck, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/landing/Logo";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [resetting, setResetting] = useState(false);
  const [prefs, setPrefs] = useState({ deployments: true, alerts: true, weekly: false });

  const onResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    setResetting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/signin`,
    });
    setResetting(false);
    if (error) {
      toast({ title: "Could not send reset email", description: error.message });
    } else {
      toast({ title: "Password reset email sent", description: `Check ${user.email}` });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-background/70 px-6 backdrop-blur-xl">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <Link to="/"><Logo /></Link>
      </header>
      <main className="container-x py-10 max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your Necub workspace profile and preferences.</p>
        </div>

        <section className="panel p-6">
          <h2 className="text-base font-semibold">Profile</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Account email</Label>
              <Input value={user?.email ?? ""} readOnly className="bg-card/60" />
            </div>
            <div className="space-y-1.5">
              <Label>User ID</Label>
              <Input value={user?.id ?? ""} readOnly className="bg-card/60 font-mono text-xs" />
            </div>
          </div>
        </section>

        <section className="panel p-6">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold">Password & security</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Send a reset link to your account email.</p>
          <form onSubmit={onResetPassword} className="mt-4 flex items-center gap-2">
            <Input value={user?.email ?? ""} readOnly className="bg-card/60 max-w-sm" />
            <Button type="submit" variant="outline" disabled={resetting}>
              <Mail className="mr-1 h-3.5 w-3.5" /> {resetting ? "Sending…" : "Send reset link"}
            </Button>
          </form>
        </section>

        <section className="panel p-6">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold">Notification preferences</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              { key: "deployments", label: "Deployment notifications" },
              { key: "alerts", label: "Infrastructure alerts" },
              { key: "weekly", label: "Weekly usage summary" },
            ].map((p) => (
              <li key={p.key} className="flex items-center justify-between rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-sm">
                <span>{p.label}</span>
                <button
                  type="button"
                  onClick={() => setPrefs((s) => ({ ...s, [p.key]: !(s as Record<string, boolean>)[p.key] }))}
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    (prefs as Record<string, boolean>)[p.key] ? "bg-primary" : "bg-border"
                  }`}
                  aria-pressed={(prefs as Record<string, boolean>)[p.key]}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      (prefs as Record<string, boolean>)[p.key] ? "left-4" : "left-0.5"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {user?.email === "admin@necub.ai" && (
          <section className="panel p-6 border-primary/30">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <h2 className="text-base font-semibold">Administrator access</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              You have access to infrastructure overviews and all operational metrics.
            </p>
          </section>
        )}

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={async () => {
              await signOut();
              navigate("/", { replace: true });
            }}
          >
            Sign out
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
