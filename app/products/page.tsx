import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";

import ProductGrid from "@/components/products/ProductGrid";
import ProductSearch from "@/components/products/ProductSearch";
import ProductFilters from "@/components/products/ProductFilters";

interface ProductsPageProps {
  searchParams: Promise<{
    title?: string;
    price?: string;
    price_min?: string;
    price_max?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;

  const limit = 12;
  const offset = (page - 1) * limit;

  const products = await getProducts({
    title: params.title,

    price: params.price
      ? Number(params.price)
      : undefined,

    price_min: params.price_min
      ? Number(params.price_min)
      : undefined,

    price_max: params.price_max
      ? Number(params.price_max)
      : undefined,

    categorySlug: params.category,

    limit,
    offset,
  });

  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Products
      </h1>

      <ProductSearch />

      <ProductFilters
        categories={categories}
      />

      <ProductGrid products={products} />
    </main>
  );
}