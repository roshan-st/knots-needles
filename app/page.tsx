"use client";

import Link from "next/link";

const categories = ["Yarn", "Fabric", "Tools", "Kits", "Accessories"] as const;

const products = [
  {
    name: "Undyed Wool Skein Set",
    description: "Soft aran-weight wool for quiet winter projects.",
    price: "$24",
    swatchColor: "bg-[#d9d1c3]",
  },
  {
    name: "Everyday Linen Fat Quarters",
    description: "Muted neutrals for quilting and small sewing.",
    price: "$32",
    swatchColor: "bg-[#d0d8cc]",
  },
  {
    name: "Oak Handle Scissors",
    description: "Precise stainless blades with warm wooden grip.",
    price: "$28",
    swatchColor: "bg-[#c7c0b5]",
  },
  {
    name: "Starter Embroidery Bundle",
    description: "Hoop, threads and fabric for simple motifs.",
    price: "$36",
    swatchColor: "bg-[#ddd4c7]",
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f4f0] text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-10">
        {/* Navbar */}
        <header className="flex items-center justify-between py-4 md:py-6">
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-[0.18em] text-slate-700">
              KNOTS &amp; NEEDLES
            </span>
            <span className="mt-1 text-xs text-slate-500">
              Craft supplies, kept quiet and considered.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6 text-xs text-slate-700 md:text-sm">
              <Link href="/shop" className="hover:text-slate-900">
                Shop
              </Link>
              <button className="hidden text-slate-700 hover:text-slate-900 md:inline">
                New
              </button>
              <button className="hidden text-slate-700 hover:text-slate-900 md:inline">
                Workshops
              </button>
              <button className="hidden text-slate-700 hover:text-slate-900 md:inline">
                Journal
              </button>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                aria-label="Open cart"
                className="text-slate-700 hover:text-slate-900"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="19" r="1.2" />
                  <circle cx="17" cy="19" r="1.2" />
                  <path d="M4 5h2l1.2 8.4A1.4 1.4 0 0 0 8.6 15h8.3a1.4 1.4 0 0 0 1.4-1.2L19.5 9H7.2" />
                </svg>
              </Link>
              <Link
                href="/login"
                aria-label="Log in"
                className="text-slate-700 hover:text-slate-900"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="9" r="3.1" />
                  <path d="M6.5 18.4C7.7 16.4 9.7 15.2 12 15.2s4.3 1.2 5.5 3.2" />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="grid gap-8 py-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-slate-900 md:text-4xl">
              Quiet tools and materials
              <span className="block text-slate-700">
                for your everyday making.
              </span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Knots &amp; Needles gathers yarns, fabrics and tools in muted,
              grounded palettes so your workspace feels as calm as the projects
              you bring to life.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <button className="rounded-md bg-slate-900 px-5 py-2.5 text-xs font-medium tracking-wide text-[#f6f4f0] shadow-sm shadow-slate-900/20 hover:bg-slate-800">
                Shop all craft supplies
              </button>
              <span className="text-xs text-slate-500">
                Free shipping on orders over $65.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="h-40 w-full rounded-md bg-[#e0d7c8] shadow-sm shadow-slate-900/10 md:h-48" />
            <div className="flex gap-4">
              <div className="h-24 flex-1 rounded-md bg-[#d0d8cc] shadow-sm shadow-slate-900/10" />
              <div className="h-24 flex-1 rounded-md bg-[#c7c0b5] shadow-sm shadow-slate-900/10" />
            </div>
          </div>
        </section>

        {/* Category strip */}
        <section className="py-6">
          <div className="flex gap-6 overflow-x-auto text-[11px] uppercase tracking-[0.25em] text-slate-500 md:text-xs">
            {categories.map((category) => (
              <button
                key={category}
                className="whitespace-nowrap hover:text-slate-800"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section className="py-6">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-sm font-medium tracking-tight text-slate-900 md:text-base">
              Everyday pieces for the worktable
            </h2>
            <button className="text-xs text-slate-600 hover:text-slate-900">
              View all
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product) => (
              <article key={product.name} className="flex flex-col gap-3">
                <div
                  className={`aspect-[4/3] w-full rounded-md ${product.swatchColor} shadow-sm shadow-slate-900/10`}
                />
                <div className="space-y-1 text-sm">
                  <h3 className="text-slate-900">{product.name}</h3>
                  <p className="text-xs leading-relaxed text-slate-600">
                    {product.description}
                  </p>
                  <p className="pt-1 text-xs font-medium text-slate-800">
                    {product.price}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}