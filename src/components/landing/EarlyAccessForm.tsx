import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const EarlyAccessForm = ({ compact = false }: { compact?: boolean }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    const { error: insertError } = await supabase
      .from("early_access_emails")
      .insert([{ email }]);
    setLoading(false);
    if (insertError) {
      if (insertError.code === "23505") {
        setSuccess(true);
        setEmail("");
      } else {
        setError(insertError.message || "Something went wrong. Please try again.");
      }
      return;
    }
    setSuccess(true);
    setEmail("");
  };

  return (
    <form onSubmit={onSubmit} className={compact ? "flex flex-col gap-2 sm:flex-row" : "space-y-3"}>
      <Input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-card/60"
      />
      <Button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-[0_0_24px_-6px_hsl(var(--primary)/0.6)] hover:opacity-95"
      >
        {loading ? "Submitting…" : "Join Early Access"}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
      {success && (
        <p className="text-xs text-emerald-400 sm:basis-full">
          You're on the list. We'll be in touch shortly. 🚀
        </p>
      )}
      {error && <p className="text-xs text-destructive sm:basis-full">{error}</p>}
    </form>
  );
};
