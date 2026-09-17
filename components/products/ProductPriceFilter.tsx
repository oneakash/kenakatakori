"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductPriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") ?? ""
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") ?? ""
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    params.delete("page");

    const query = params.toString();
    router.push(query ? `/products?${query}` : "/products");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-end gap-3"
    >
      <label className="flex min-w-32 flex-1 flex-col gap-1 text-sm font-medium">
        Min price
        <input
          type="number"
          min="0"
          step="0.01"
          value={minPrice}
          onChange={(event) => setMinPrice(event.target.value)}
          placeholder="0.00"
          className="h-11 rounded-xl border px-4 font-normal outline-none focus:ring-2"
        />
      </label>

      <label className="flex min-w-32 flex-1 flex-col gap-1 text-sm font-medium">
        Max price
        <input
          type="number"
          min="0"
          step="0.01"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          placeholder="Any"
          className="h-11 rounded-xl border px-4 font-normal outline-none focus:ring-2"
        />
      </label>

      <button
        type="submit"
        className="h-11 rounded-xl border px-5 font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        Apply price
      </button>
    </form>
  );
}
