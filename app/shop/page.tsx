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

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#f6f4f0] text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-light tracking-tight text-slate-900">
            Shop all supplies
          </h1>
          <p className="mt-2 max-w-md text-sm text-slate-600">
            Yarns, fabrics, tools and quiet essentials for a considered craft
            space.
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="flex flex-col gap-3">
              <div
                className={`aspect-[4/3] w-full rounded-md ${product.swatchColor} shadow-sm shadow-slate-900/10`}
              />
              <div className="space-y-1 text-sm">
                <h2 className="text-slate-900">{product.name}</h2>
                <p className="text-xs leading-relaxed text-slate-600">
                  {product.description}
                </p>
                <p className="pt-1 text-xs font-medium text-slate-800">
                  {product.price}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

