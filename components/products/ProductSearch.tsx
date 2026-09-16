"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    params.delete("page");

    router.push(`/products?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products..."
        className="h-11 flex-1 rounded-xl border px-4 outline-none transition focus:ring-2"
      />

      <button
        type="submit"
        className="rounded-xl bg-black px-6 font-medium text-white transition hover:opacity-80"
      >
        Search
      </button>
    </form>
  );
}