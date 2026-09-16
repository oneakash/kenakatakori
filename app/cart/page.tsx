"use client";

import Link from "next/link";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/store/cartStore";

export default function CartPage() {
  const { items } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>

          <p className="mt-2 text-gray-500">
            Review your items before checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border bg-white px-6 py-16 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="text-5xl">🛒</div>

            <h2 className="mt-5 text-2xl font-bold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-gray-500">
              Add some products to get started.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:opacity-80"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                />
              ))}
            </div>

            <CartSummary />
          </div>
        )}
      </div>
    </main>
  );
}