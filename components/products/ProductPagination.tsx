"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ProductPaginationProps {
  currentPage: number;
  hasNextPage: boolean;
}

export default function ProductPagination({
  currentPage,
  hasNextPage,
}: ProductPaginationProps) {
  const searchParams = useSearchParams();

  function createPageUrl(page: number) {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (page <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page));
    }

    const query = params.toString();

    return query
      ? `/products?${query}`
      : "/products";
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="rounded-xl border px-5 py-2.5 font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Previous
        </Link>
      )}

      <span className="rounded-xl bg-black px-5 py-2.5 font-medium text-white">
        {currentPage}
      </span>

      {hasNextPage && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="rounded-xl border px-5 py-2.5 font-medium transition hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Next
        </Link>
      )}
    </div>
  );
}