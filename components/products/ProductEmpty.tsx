import Link from "next/link";

export default function ProductEmpty() {
  return (
    <div className="rounded-2xl border bg-white px-6 py-20 text-center dark:border-gray-800 dark:bg-gray-900">
      <div className="text-5xl">🔍</div>

      <h2 className="mt-5 text-2xl font-bold">
        No products found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-gray-500">
        We couldn&apos;t find any products matching
        your current search or filters.
      </p>

      <Link
        href="/products"
        className="mt-6 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white"
      >
        Clear Filters
      </Link>
    </div>
  );
}