export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#f6f4f0] text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-light tracking-tight text-slate-900">
            Cart
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Review the pieces you&apos;ve set aside before you check out.
          </p>
        </header>

        <section className="space-y-6">
          <div className="rounded-md bg-[#e0d7c8] px-4 py-6 text-sm text-slate-800 shadow-sm shadow-slate-900/10">
            Your cart is currently empty. When you add yarn, fabric or tools,
            they&apos;ll appear here.
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm">
            <p className="text-slate-600">Subtotal will appear once items are added.</p>
            <button className="rounded-md bg-slate-900 px-5 py-2.5 text-xs font-medium tracking-wide text-[#f6f4f0] shadow-sm shadow-slate-900/20 hover:bg-slate-800">
              Continue shopping
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

