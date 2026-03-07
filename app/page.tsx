"use client";

const categories = ["Yarn", "Fabric", "Tools", "Kits", "Accessories"] as const;

const bestSellers = [
  {
    name: "Cloudsoft Merino Bundle",
    price: "$38",
    badge: "Bestseller",
    color: "from-rose-100 to-rose-200",
  },
  {
    name: "Everyday Embroidery Kit",
    price: "$29",
    badge: "New",
    color: "from-amber-100 to-amber-200",
  },
  {
    name: "Essentials Needle Set",
    price: "$24",
    badge: "Staff pick",
    color: "from-sky-100 to-sky-200",
  },
] as const;

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-6 md:px-8 md:py-10">
        {/* Top navigation */}
        <header className="flex items-center justify-between gap-4 rounded-full border border-slate-100 bg-white/80 px-4 py-3 shadow-sm shadow-slate-100/80 backdrop-blur-md md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold tracking-tight text-white">
              KN
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight">
                Knots &amp; Needles
              </span>
              <span className="text-[11px] text-slate-500">
                Premium craft supplies
              </span>
            </div>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-2 md:flex">
            {categories.map((item) => (
              <button
                key={item}
                className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-[0_1px_0_rgba(148,163,184,0.4)] transition hover:bg-white"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1.5 text-[11px] text-slate-500 md:flex">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-semibold text-slate-500 shadow">
                /
              </span>
              <span>Search yarn, kits, tools…</span>
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-100 bg-white text-[11px] font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              🛒
            </button>
          </div>
        </header>

        {/* Hero bento grid */}
        <section className="grid gap-6 lg:grid-cols-3 lg:auto-rows-[minmax(190px,auto)]">
          {/* Main hero card */}
          <article className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm lg:row-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  New Season Edit
                </p>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  Build your dream
                  <span className="block text-slate-500">
                    knitting &amp; quilting studio.
                  </span>
                </h1>
                <p className="mt-3 max-w-xs text-sm text-slate-500">
                  Curated yarn, fabrics, tools and step-by-step kits picked by
                  makers, for makers.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-md shadow-slate-400/40">
                    Shop featured bundles
                  </button>
                  <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700">
                    Browse by craft
                  </button>
                </div>
              </div>
              <div className="hidden text-right text-[11px] text-slate-500 sm:block">
                <div className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>In stock</span>
                </div>
                <p className="mt-2">4.9 · 3,200+ reviews</p>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <div className="h-32 flex-1 rounded-3xl bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200" />
              <div className="hidden h-32 flex-1 rounded-3xl bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 sm:block" />
            </div>
          </article>

          {/* Yarn feature card */}
          <article className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Yarn
                </p>
                <h2 className="mt-2 text-sm font-semibold tracking-tight">
                  Hand-dyed cloud yarns
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Soft merinos in layered neutrals and muted brights.
                </p>
              </div>
              <p className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                from $9
              </p>
            </div>
            <div className="mt-4 h-24 rounded-3xl bg-gradient-to-br from-rose-50 via-rose-100 to-rose-200" />
          </article>

          {/* Fabric feature card */}
          <article className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-4 shadow-sm lg:row-span-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Fabric
                </p>
                <h2 className="mt-2 text-sm font-semibold tracking-tight">
                  Linen &amp; cotton bundles
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Pre-cut fat quarters and yardage in calm, modern palettes.
                </p>
              </div>
              <p className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                Quilt-ready
              </p>
            </div>
            <div className="mt-4 flex flex-1 gap-3">
              <div className="flex-1 rounded-3xl bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200" />
              <div className="flex-1 rounded-3xl bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200" />
            </div>
          </article>

          {/* Kits card */}
          <article className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Kits
                </p>
                <h2 className="mt-2 text-sm font-semibold tracking-tight">
                  Weekend-ready project boxes
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Yarn, needles, pattern &amp; notions perfectly packed.
                </p>
              </div>
              <p className="rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                Save 20%
              </p>
            </div>
            <div className="mt-4 h-24 rounded-3xl bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200" />
          </article>

          {/* Subscribe card */}
          <article className="flex flex-col justify-between rounded-3xl border border-slate-900/70 bg-slate-900 px-4 py-5 text-slate-50 shadow-sm lg:col-span-1">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Studio Notes
              </p>
              <h2 className="mt-2 text-sm font-semibold tracking-tight">
                Get drops, patterns &amp; class invites first.
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                A short, thoughtful email for knitters, sewists and makers.
              </p>
            </div>
            <form className="mt-4 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1.5">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-900 shadow-sm"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                No spam. Just craft inspiration.
              </p>
            </form>
          </article>
        </section>

        {/* Best sellers row */}
        <section className="space-y-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm md:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold tracking-tight">
                Bestsellers from Knots &amp; Needles
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Kits and tools our community reaches for every week.
              </p>
            </div>
            <button className="hidden text-[11px] font-medium text-slate-600 underline-offset-2 hover:underline md:inline">
              View all products
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {bestSellers.map((product) => (
              <div
                key={product.name}
                className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3"
              >
                <div
                  className={`h-28 rounded-2xl bg-gradient-to-br ${product.color}`}
                />
                <div className="flex items-start justify-between gap-2 text-xs">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                      {product.badge}
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug text-slate-900">
                      {product.name}
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}