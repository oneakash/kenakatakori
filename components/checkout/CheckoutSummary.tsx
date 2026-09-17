"use client";

import { useCart } from "@/store/cartStore";

export default function CheckoutSummary() {
  const { items, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = items.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-xl font-bold">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between gap-4 text-sm"
          >
            <span className="line-clamp-1 text-gray-600 dark:text-gray-400">
              {item.product.title} × {item.quantity}
            </span>

            <span className="shrink-0 font-medium">
              $
              {(
                item.product.price *
                item.quantity
              ).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="border-t pt-4 dark:border-gray-800">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}