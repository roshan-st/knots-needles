import { Suspense } from "react";
import AuthCallbackClient from "./AuthCallbackClient";

export const dynamic = "force-dynamic";

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f6f4f0] text-slate-900">
          <div className="w-full max-w-sm px-4 text-center">
            <p className="text-sm text-slate-700">Signing you in…</p>
          </div>
        </main>
      }
    >
      <AuthCallbackClient />
    </Suspense>
  );
}

