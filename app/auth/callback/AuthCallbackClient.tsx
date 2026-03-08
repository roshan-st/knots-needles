"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [message, setMessage] = useState("Signing you in…");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const code = searchParams.get("code");
        if (!code) {
          setMessage("Missing sign-in code. Please try again.");
          return;
        }

        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) throw error;

        const destination = next && next.startsWith("/") ? next : "/account";
        router.replace(destination);
      } catch (err) {
        const msg =
          err && typeof err === "object" && "message" in err
            ? String((err as { message?: unknown }).message)
            : "Couldn’t complete sign-in. Please try again.";
        if (!cancelled) setMessage(msg);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams, next]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f4f0] text-slate-900">
      <div className="w-full max-w-sm px-4 text-center">
        <p className="text-sm text-slate-700">{message}</p>
      </div>
    </main>
  );
}

