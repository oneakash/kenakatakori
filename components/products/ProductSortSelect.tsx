"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProductSort } from "@/types/product";

export default function ProductSortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort =
    (searchParams.get("sort") as ProductSort) || "default";

  function handleChange(value: ProductSort) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    // Reset pagination when sorting changes
    params.delete("page");

    const query = params.toString();

    router.push(
      query ? `/products?${query}` : "/products"
    );
  }

  return (
    <select
      value={currentSort}
      onChange={(event) =>
        handleChange(event.target.value as ProductSort)
      }
      className="h-11 rounded-xl border border-gray-300 bg-white px-4 outline-none transition focus:ring-2 dark:border-gray-700 dark:bg-gray-900"
    >
      <option value="default">Sort by</option>

      <option value="price-asc">
        Price: Low to High
      </option>

      <option value="price-desc">
        Price: High to Low
      </option>

      <option value="name-asc">
        Name: A to Z
      </option>

      <option value="name-desc">
        Name: Z to A
      </option>
    </select>
  );
}