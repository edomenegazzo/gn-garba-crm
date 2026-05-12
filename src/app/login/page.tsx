"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({
        type: "success",
        text: "Link di accesso inviato. Controlla la tua casella email.",
      });
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-10 text-center">
          <div className="font-display font-black text-4xl leading-none tracking-tight text-ink">
            NUCLEO
          </div>
          <div className="font-display font-black text-4xl leading-none tracking-tight text-red">
            GARBATELLA
          </div>
          <div className="font-body text-[10px] uppercase tracking-[0.2em] text-graymid mt-3">
            CRM Territoriale · Accesso
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-[13px] font-medium text-ink-soft mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@dominio.it"
              disabled={loading}
              className="w-full h-12 px-4 bg-white border-[1.5px] border-grayline text-ink-soft focus:border-red focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading || !email}
            className="w-full"
          >
            {loading ? "Invio in corso..." : "Invia link di accesso"}
          </Button>
        </form>

        {/* Feedback */}
        {message && (
          <div
            className={`mt-6 px-4 py-3 border-l-[3px] text-sm ${
              message.type === "success"
                ? "bg-green/5 border-green text-ink-soft"
                : "bg-red/5 border-red text-ink-soft"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-[10px] uppercase tracking-[0.2em] text-graymid">
          Accesso riservato · v0.1 sviluppo
        </div>
      </div>
    </div>
  );
}
