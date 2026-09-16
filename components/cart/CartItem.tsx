"use client";

import Image from "next/image";
import { CartItem as CartItemType, useCart } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const { product, quantity } = item;

  return (
    <article className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              {product.category.name}
            </p>

            <h2 className="mt-1 line-clamp-2 font-semibold">
              {product.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(product.id)}
            className="text-sm text-gray-500 transition hover:text-red-500"
          >
            Remove
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center rounded-lg border">
            <button
              type="button"
              onClick={() => decreaseQuantity(product.id)}
              className="px-3 py-1.5 text-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              −
            </button>

            <span className="min-w-10 text-center font-medium">
              {quantity}
            </span>

            <button
              type="button"
              onClick={() => increaseQuantity(product.id)}
              className="px-3 py-1.5 text-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              +
            </button>
          </div>

          <p className="font-bold">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </article>
  );
}