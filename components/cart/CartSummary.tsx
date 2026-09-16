"use client";

import Link from "next/link";
import { useCart } from "@/store/cartStore";

export default function CartSummary() {
  const { items, getCartTotal, getCartItemCount, clearCart } = useCart();

  const total = getCartTotal();
  const itemCount = getCartItemCount();

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="rounded-2xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Items</span>
          <span>{itemCount}</span>
        </div>

        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="border-t pt-4 dark:border-gray-800">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block w-full rounded-xl bg-black px-6 py-3 text-center font-semibold text-white transition hover:opacity-80"
      >
        Proceed to Checkout
      </Link>

      <button
        type="button"
        onClick={clearCart}
        className="mt-3 w-full rounded-xl border px-6 py-3 font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Clear Cart
      </button>
    </aside>
  );
}