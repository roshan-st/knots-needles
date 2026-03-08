import Image from "next/image";
import { supabase } from "@/lib/supabase";

type ProductRow = {
  id?: string | number;
  name: string | null;
  price: number | string | null;
  category: string | null;
  stock: number | null;
  image_url?: string | null;
};

function formatPrice(value: ProductRow["price"]) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "number") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  }
  const trimmed = String(value).trim();
  if (!trimmed) return "—";
  if (/[a-zA-Z$€£]/.test(trimmed)) return trimmed;
  const asNumber = Number(trimmed);
  if (!Number.isFinite(asNumber)) return trimmed;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: asNumber % 1 === 0 ? 0 : 2,
  }).format(asNumber);
}

export default async function ShopPage() {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,category,stock,image_url")
    .order("name", { ascending: true });

  console.log("[ShopPage] Supabase products response", {
    data,
    error,
  });

  const products = (data ?? []) as ProductRow[];

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

        {error ? (
          <section className="rounded-md bg-[#f0e8dd] px-4 py-5 text-sm text-slate-700 shadow-sm shadow-slate-900/10">
            <p className="font-medium text-slate-900">Couldn&apos;t load products.</p>
            <p className="mt-2 text-xs text-slate-600">
              {error.message}
            </p>
          </section>
        ) : products.length === 0 ? (
          <section className="rounded-md bg-[#f0e8dd] px-4 py-5 text-sm text-slate-700 shadow-sm shadow-slate-900/10">
            Your shop is empty right now. Add rows to the{" "}
            <span className="font-medium text-slate-900">products</span> table
            to display them here.
          </section>
        ) : (
          <section className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product, idx) => (
              <article key={String(product.id ?? idx)} className="space-y-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-[#e0d7c8] shadow-sm shadow-slate-900/10">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name ?? "Product image"}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-sm font-medium tracking-tight text-slate-900">
                      {product.name ?? "Untitled product"}
                    </h2>
                    <p className="text-xs font-medium text-slate-800">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                    <p className="uppercase tracking-[0.18em] text-slate-500">
                      {product.category ?? "Uncategorized"}
                    </p>
                    <p className="text-slate-600">
                      Stock:{" "}
                      <span className="text-slate-800">
                        {product.stock ?? "—"}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

