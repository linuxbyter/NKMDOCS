"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/orders");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-brand-navy mb-4">
            <Shield className="h-7 w-7 text-brand-gold" />
          </div>
          <h1 className="text-2xl font-bold text-brand-navy">Admin Login</h1>
          <p className="text-sm text-brand-muted mt-1">LegalDocsKE operator area</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-brand-border bg-white p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-brand-border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs text-brand-danger flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg bg-brand-navy py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-light transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
