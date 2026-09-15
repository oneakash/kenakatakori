"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(
    searchParams.get("title") ?? ""
  );

  function handleSearch() {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (value.trim()) {
      params.set("title", value.trim());
    } else {
      params.delete("title");
    }

    params.delete("page");

    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex gap-2">
      <input
        type="search"
        value={value}
        onChange={(event) =>
          setValue(event.target.value)
        }
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSearch();
          }
        }}
        placeholder="Search products..."
        className="w-full rounded-lg border px-4 py-2"
      />

      <button
        onClick={handleSearch}
        className="rounded-lg bg-black px-5 py-2 text-white"
      >
        Search
      </button>
    </div>
  );
}