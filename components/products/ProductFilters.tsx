"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Category } from "@/types/category";

interface ProductFiltersProps {
  categories: Category[];
}

export default function ProductFilters({
  categories,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(
    searchParams.get("category") ?? ""
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("price_min") ?? ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("price_max") ?? ""
  );

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    // Category
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    // Minimum price
    if (minPrice) {
      params.set("price_min", minPrice);
    } else {
      params.delete("price_min");
    }

    // Maximum price
    if (maxPrice) {
      params.set("price_max", maxPrice);
    } else {
      params.delete("price_max");
    }

    // Reset pagination when filters change
    params.delete("page");

    const query = params.toString();

    router.push(
      query ? `/products?${query}` : "/products"
    );
  }

  function clearFilters() {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category");
    params.delete("price_min");
    params.delete("price_max");
    params.delete("page");

    setCategory("");
    setMinPrice("");
    setMaxPrice("");

    const query = params.toString();

    router.push(
      query ? `/products?${query}` : "/products"
    );
  }

  return (
    <div className="mb-8 rounded-xl border bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
      <div className="grid gap-5 md:grid-cols-3">
        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium"
          >
            Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          >
            <option value="">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                key={item.id}
                value={item.slug}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Price */}
        <div>
          <label
            htmlFor="min-price"
            className="mb-2 block text-sm font-medium"
          >
            Minimum Price
          </label>

          <input
            id="min-price"
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) =>
              setMinPrice(event.target.value)
            }
            placeholder="e.g. 100"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        {/* Maximum Price */}
        <div>
          <label
            htmlFor="max-price"
            className="mb-2 block text-sm font-medium"
          >
            Maximum Price
          </label>

          <input
            id="max-price"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(event.target.value)
            }
            placeholder="e.g. 1000"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={applyFilters}
          className="rounded-lg bg-black px-5 py-2.5 font-medium text-white transition hover:opacity-80"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border px-5 py-2.5 font-medium transition hover:bg-gray-100"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}