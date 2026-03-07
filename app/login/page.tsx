export default function LoginPage() {
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

        <form className="space-y-4 rounded-md bg-[#f0e8dd] px-4 py-5 shadow-sm shadow-slate-900/10">
          <div className="space-y-1 text-xs">
            <label htmlFor="email" className="block text-slate-800">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border-0 bg-[#f6f0e6] px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-500"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1 text-xs">
            <label htmlFor="password" className="block text-slate-800">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border-0 bg-[#f6f0e6] px-3 py-2 text-xs text-slate-900 outline-none placeholder:text-slate-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-slate-900 px-4 py-2.5 text-xs font-medium tracking-wide text-[#f6f4f0] shadow-sm shadow-slate-900/20 hover:bg-slate-800"
          >
            Log in
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-600">
          New here? Checkout is available without an account.
        </p>
      </div>
    </main>
  );
}

