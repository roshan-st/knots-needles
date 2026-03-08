"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Product = {
  id: number;
  name: string | null;
  description: string | null;
  price: number | null;
  image_url: string | null;
  category: string | null;
  stock: number | null;
};

function formatPrice(value: number | null) {
  if (!value) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, image_url, category, stock")
        .eq("id", id)
        .single();

      if (!error && data) setProduct(data as Product);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleAddToCart() {
    setAdding(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login?next=/cart");
      return;
    }

    // Check if item already in cart
    const { data: existing } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", product!.id)
      .single();

    if (existing) {
      // Update quantity
      await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + quantity })
        .eq("id", existing.id);
    } else {
      // Insert new cart item
      await supabase.from("cart_items").insert({
        user_id: user.id,
        product_id: product!.id,
        quantity,
      });
    }

    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f4f0]">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-sm text-slate-600">Loading…</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f6f4f0]">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <p className="text-sm text-slate-600">Product not found.</p>
          <Link href="/shop" className="mt-4 inline-block text-xs text-slate-900 underline">
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f4f0] text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">

        {/* Back link */}
        <Link
          href="/shop"
          className="mb-8 inline-block text-xs text-slate-500 hover:text-slate-900"
        >
          ← Back to shop
        </Link>

        <div className="grid gap-10 md:grid-cols-2">

          {/* Product Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-md bg-[#e0d7c8]">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name ?? "Product"}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            ) : null}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {product.category ?? "Uncategorized"}
              </p>
              <h1 className="mt-2 text-2xl font-light tracking-tight text-slate-900">
                {product.name}
              </h1>
              <p className="mt-3 text-xl font-medium text-slate-900">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm leading-relaxed text-slate-600">
                {product.description ?? "No description available."}
              </p>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${(product.stock ?? 0) > 0 ? "bg-green-500" : "bg-red-400"}`} />
              <p className="text-xs text-slate-600">
                {(product.stock ?? 0) > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <p className="text-xs text-slate-600">Quantity</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-8 w-8 rounded-md bg-[#e0d7c8] text-sm text-slate-800 hover:bg-[#d9d1c3]"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock ?? 99, q + 1))}
                  className="h-8 w-8 rounded-md bg-[#e0d7c8] text-sm text-slate-800 hover:bg-[#d9d1c3]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={adding || (product.stock ?? 0) === 0}
              className="w-full rounded-md bg-slate-900 px-6 py-3 text-sm font-medium text-[#f6f4f0] transition hover:bg-slate-800 disabled:opacity-50"
            >
              {added ? "Added to cart ✓" : adding ? "Adding…" : "Add to cart"}
            </button>

            {/* Delivery Info */}
            <div className="space-y-2 border-t border-slate-900/10 pt-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Delivery
              </p>
              <div className="space-y-1 text-xs text-slate-600">
                <p>🚚 Free shipping on orders over $65</p>
                <p>📦 Ships within 1–3 business days</p>
                <p>↩️ Free returns within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
