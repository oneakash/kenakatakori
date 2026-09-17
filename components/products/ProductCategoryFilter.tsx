"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types/category";

interface ProductCategoryFilterProps {
  categories: Category[];
}

export default function ProductCategoryFilter({
  categories,
}: ProductCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";

  function handleCategoryChange(value: string) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    params.delete("page");

    const query = params.toString();

    router.push(
      query ? `/products?${query}` : "/products"
    );
  }

  return (
    <select
      value={category}
      onChange={(event) =>
        handleCategoryChange(event.target.value)
      }
      className="h-11 rounded-xl border px-4 outline-none focus:ring-2"
    >
      <option value="">All Categories</option>

      {categories.map((category) => (
        <option
          key={category.id}
          value={category.slug}
        >
          {category.name}
        </option>
      ))}
    </select>
  );
}