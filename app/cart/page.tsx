"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type ProductSnapshot = {
  id: number;
  name: string | null;
  price: number | null;
  image_url: string | null;
};

type CartItemRow = {
  id: string;
  product_id: number;
  quantity: number;
  products: ProductSnapshot | ProductSnapshot[] | null;
};

function getProduct(row: CartItemRow): ProductSnapshot | null {
  const p = row.products;
  if (!p) return null;
  return Array.isArray(p) ? p[0] ?? null : p;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

const SHIPPING_THRESHOLD = 65;
const SHIPPING_COST = 5.99;

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItemRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (!cancelled && userError) {
        setLoading(false);
        return;
      }
      if (!cancelled && !user) {
        router.replace("/login?next=/cart");
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .select("id, product_id, quantity, products(id, name, price, image_url)")
        .eq("user_id", user!.id)


      if (!cancelled) {
        if (error) {
          setItems([]);
        } else {
          setItems((data as unknown as CartItemRow[]) ?? []);
        }
        setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function updateQuantity(cartItemId: string, newQty: number) {
    if (newQty < 1) return;
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQty, updated_at: new Date().toISOString() })
      .eq("id", cartItemId);
    if (!error) {
      setItems((prev) =>
        prev.map((i) => (i.id === cartItemId ? { ...i, quantity: newQty } : i))
      );
    }
  }

  async function removeItem(cartItemId: string) {
    const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId);
    if (!error) setItems((prev) => prev.filter((i) => i.id !== cartItemId));
  }

  const subtotal = items.reduce((sum, row) => {
    const p = row.products?.price ?? 0;
    return sum + p * row.quantity;
  }, 0);
  const shipping =
    subtotal >= SHIPPING_THRESHOLD ? 0 : items.length > 0 ? SHIPPING_COST : 0;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f6f4f0] text-slate-900">
        <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
          <p className="text-sm text-slate-600">Loading cart…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f4f0] text-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
        <header className="mb-8 flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-2xl font-light tracking-tight text-slate-900">
              Cart
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review the pieces you&apos;ve set aside before you check out.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs text-slate-600 hover:text-slate-900"
          >
            Continue shopping
          </Link>
        </header>

        {items.length === 0 ? (
          <section className="rounded-md bg-[#f0e8dd] px-4 py-6 text-sm text-slate-700 shadow-sm shadow-slate-900/10">
            <p>Your cart is empty. When you add items from the shop, they&apos;ll appear here.</p>
            <Link
              href="/shop"
              className="mt-4 inline-block rounded-md bg-slate-900 px-4 py-2 text-xs font-medium text-[#f6f4f0] hover:bg-slate-800"
            >
              Go to shop
            </Link>
          </section>
        ) : (
          <section className="space-y-6">
            <ul className="space-y-4">
              {items.map((row) => {
                const p = getProduct(row);
                const price = p?.price ?? 0;
                const lineTotal = price * row.quantity;
                return (
                  <li
                    key={row.id}
                    className="flex gap-4 rounded-md bg-[#f0e8dd] p-4 shadow-sm shadow-slate-900/5"
                  >
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-[#e0d7c8]">
                      {p?.image_url ? (
                        <Image
                          src={p.image_url}
                          alt={p.name ?? ""}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {p?.name ?? "Product"}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-600">
                        {formatPrice(price)} each
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(row.id, Math.max(1, row.quantity - 1))
                            }
                            className="h-7 w-7 rounded-md bg-[#e0d7c8] text-xs font-medium text-slate-800 hover:bg-[#d9d1c3]"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-xs text-slate-800">
                            {row.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(row.id, row.quantity + 1)}
                            className="h-7 w-7 rounded-md bg-[#e0d7c8] text-xs font-medium text-slate-800 hover:bg-[#d9d1c3]"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(row.id)}
                          className="text-xs text-slate-600 hover:text-slate-900"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">
                        {formatPrice(lineTotal)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="rounded-md bg-[#f0e8dd] px-4 py-5 shadow-sm shadow-slate-900/5">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? "Free"
                      : formatPrice(shipping)}
                  </span>
                </div>
                {subtotal > 0 && subtotal < SHIPPING_THRESHOLD && (
                  <p className="text-xs text-slate-500">
                    Add {formatPrice(SHIPPING_THRESHOLD - subtotal)} more for free shipping.
                  </p>
                )}
                <div className="flex justify-between border-t border-slate-900/10 pt-3 font-medium text-slate-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
