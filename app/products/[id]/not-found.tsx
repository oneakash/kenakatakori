import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-gray-200 dark:text-gray-800">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold">
          Product not found
        </h1>

        <p className="mt-2 text-gray-500">
          The product you're looking for doesn't exist.
        </p>

        <Link
          href="/products"
          className="mt-6 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:opacity-80 dark:bg-white dark:text-black"
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
}