"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/store/cartStore";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="w-full rounded-xl bg-black px-6 py-3.5 font-semibold text-white transition hover:scale-[1.01] hover:opacity-90 active:scale-[0.99] dark:bg-white dark:text-black"
    >
      {added ? "✓ Added to Cart" : "Add to Cart"}
    </button>
  );
}