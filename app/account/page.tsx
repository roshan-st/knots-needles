"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setError(null);
      setLoading(true);
      const { data, error: userError } = await supabase.auth.getUser();
      if (!mounted) return;

      if (userError) {
        setError(userError.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        router.replace("/login?next=/account");
        return;
      }

      setUser(data.user);
      setLoading(false);
    }

    load();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (!session?.user) router.replace("/login?next=/account");
      else setUser(session.user);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  async function logout() {
    setError(null);
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError(signOutError.message);
    router.replace("/login");
  }

  return (
    <main className="min-h-screen bg-[#f6f4f0] text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
        <header className="mb-8 flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-2xl font-light tracking-tight text-slate-900">
              Account
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Your profile and sign-in details.
            </p>
          </div>
          <Link href="/shop" className="text-xs text-slate-700 hover:text-slate-900">
            Back to shop
          </Link>
        </header>

        <section className="rounded-md bg-[#f0e8dd] px-4 py-5 shadow-sm shadow-slate-900/10">
          {loading ? (
            <p className="text-sm text-slate-700">Loading…</p>
          ) : error ? (
            <p className="text-sm text-slate-700">{error}</p>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
                  Signed in as
                </p>
                <p className="text-sm text-slate-900">{user?.email ?? "—"}</p>
              </div>
              <button
                onClick={logout}
                className="rounded-md bg-slate-900 px-4 py-2.5 text-xs font-medium tracking-wide text-[#f6f4f0] shadow-sm shadow-slate-900/20 hover:bg-slate-800"
              >
                Log out
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

