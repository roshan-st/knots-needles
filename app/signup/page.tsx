"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function checkSession() {
      const { data } = await supabase.auth.getUser();
      if (!cancelled && data.user) {
        router.replace("/account");
      }
    }
    checkSession();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/account`,
        },
      });
      if (signUpError) throw signUpError;

      if (data.user && !data.session) {
        setSuccess(
          "Account created. Check your email to confirm your address, then sign in."
        );
      } else {
        router.replace("/account");
      }
    } catch (err) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Couldn’t create your account. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f4f0] text-slate-900">
      <div className="w-full max-w-sm px-4">
        <header className="mb-6 text-center">
          <h1 className="text-xl font-light tracking-tight text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-xs text-slate-600">
            Save your projects, track orders, and keep a quiet wishlist.
          </p>
        </header>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-md bg-[#f0e8dd] px-4 py-5 shadow-sm shadow-slate-900/10"
        >
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
              placeholder="At least 6 characters"
              autoComplete="new-password"
              minLength={6}
              required
            />
          </div>

          {error ? <p className="text-xs text-slate-700">{error}</p> : null}
          {success ? (
            <p className="text-xs text-slate-700">{success}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md bg-slate-900 px-4 py-2.5 text-xs font-medium tracking-wide text-[#f6f4f0] shadow-sm shadow-slate-900/20 hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Creating…" : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-slate-900 underline-offset-2 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

