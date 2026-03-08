"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = useMemo(() => {
    const next = searchParams.get("next");
    return next && next.startsWith("/") ? next : "/account";
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function checkSession() {
      const { data } = await supabase.auth.getUser();
      if (!cancelled && data.user) {
        router.replace(redirectTo);
      }
    }
    checkSession();
    return () => {
      cancelled = true;
    };
  }, [redirectTo, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      router.replace(redirectTo);
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Couldn’t sign in. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function onGoogle() {
    setError(null);
    setLoading(true);
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
            redirectTo
          )}`,
        },
      });
      if (oauthError) throw oauthError;
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Couldn’t start Google sign-in. Please try again.";
      setError(message);
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f4f0] text-slate-900">
      <div className="w-full max-w-sm px-4">
        <header className="mb-6 text-center">
          <h1 className="text-xl font-light tracking-tight text-slate-900">
            Sign in to Knots &amp; Needles
          </h1>
          <p className="mt-2 text-xs text-slate-600">
            Access your saved projects, orders and preferences.
          </p>
        </header>

        <div className="space-y-3 rounded-md bg-[#f0e8dd] px-4 py-5 shadow-sm shadow-slate-900/10">
          <button
            type="button"
            onClick={onGoogle}
            disabled={loading}
            className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-xs font-medium tracking-wide text-[#f6f4f0] shadow-sm shadow-slate-900/20 hover:bg-slate-800 disabled:opacity-60"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-900/10" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              Or
            </span>
            <div className="h-px flex-1 bg-slate-900/10" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1 text-xs">
              <label htmlFor="email" className="block text-slate-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-0 bg-[#f6f0e6] px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-500"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-1 text-xs">
              <label htmlFor="password" className="block text-slate-800">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-0 bg-[#f6f0e6] px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-500"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            {error ? <p className="text-xs text-slate-700">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-md bg-slate-900 px-4 py-2.5 text-xs font-medium tracking-wide text-[#f6f4f0] shadow-sm shadow-slate-900/20 hover:bg-slate-800 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Log in"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-slate-600">
          New here?{" "}
          <Link
            href="/signup"
            className="text-slate-900 underline-offset-2 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}

