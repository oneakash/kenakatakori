import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import ProductGrid from "@/components/products/ProductGrid";

export default async function FeaturedProducts() {
  const products = await getProducts({
    limit: 8,
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Our collection
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Featured Products
          </h2>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Check out some of our popular products.
          </p>
        </div>

        <Link
          href="/products"
          className="hidden font-semibold underline underline-offset-4 sm:block"
        >
          View all
        </Link>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="py-10 text-center text-gray-500">
          No products available.
        </p>
      )}

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/products"
          className="font-semibold underline underline-offset-4"
        >
          View all products
        </Link>
      </div>
    </section>
  );
}