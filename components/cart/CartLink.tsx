"use client";

import Link from "next/link";
import { useCart } from "@/store/cartStore";

export default function CartLink() {
  const { getCartItemCount } = useCart();

  const count = getCartItemCount();

  return (
    <Link
      href="/cart"
      className="relative transition hover:text-gray-500"
    >
      Cart

      {count > 0 && (
        <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}