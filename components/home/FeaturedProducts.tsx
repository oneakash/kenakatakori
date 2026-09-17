import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import FeaturedProductCard from "./FeaturedProductCard";

const accents = ["red", "pink", "blue", "green"] as const;

export default async function FeaturedProducts() {
  const products = await getProducts({
    limit: 4,
  });

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-5 shadow-md ring-1 ring-black/5 sm:p-7 lg:p-8 dark:bg-gray-900 dark:ring-white/10">

          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Featured Products
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                Discover our picks
              </h2>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Handpicked products you might love.
              </p>
            </div>

            <Link
              href="/products"
              className="shrink-0 rounded-md bg-gray-950 px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-950"
            >
              Explore all →
            </Link>
          </div>

          {/* Products */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => (
              <FeaturedProductCard
                key={product.id}
                product={product}
                accent={accents[index] ?? "blue"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}