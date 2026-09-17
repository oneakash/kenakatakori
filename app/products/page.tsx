import ProductGrid from "@/components/products/ProductGrid";
import ProductToolbar from "@/components/products/ProductToolbar";
import ProductPagination from "@/components/products/ProductPagination";
import ProductEmpty from "@/components/products/ProductEmpty";

import {
  getAllProducts,
  getProducts,
} from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";

import { sortProducts } from "@/lib/utils/productSort";
import { ProductSort } from "@/types/product";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 12;

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const currentPage = Math.max(
    1,
    Number(params.page) || 1
  );

  const offset =
    (currentPage - 1) * PAGE_SIZE;

  const sort: ProductSort =
    (params.sort as ProductSort) || "default";

  const productFilters = {
    title: params.search,
    categorySlug: params.category,
    price_min: params.minPrice
      ? Number(params.minPrice)
      : undefined,
    price_max: params.maxPrice
      ? Number(params.maxPrice)
      : undefined,
  };

  const [products, categories] = await Promise.all([
    sort === "default"
      ? getProducts({
          ...productFilters,
          // Fetch one extra product to determine
          // whether another page exists.
          limit: PAGE_SIZE + 1,
          offset,
        })
      : getAllProducts(productFilters),

    getCategories(),
  ]);

  const sortedProducts = sortProducts(products, sort);
  const hasNextPage =
    sort === "default"
      ? products.length > PAGE_SIZE
      : sortedProducts.length > offset + PAGE_SIZE;

  const visibleProducts =
    sort === "default"
      ? sortedProducts.slice(0, PAGE_SIZE)
      : sortedProducts.slice(offset, offset + PAGE_SIZE);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="mt-2 text-gray-500">
            Discover our latest products.
          </p>
        </div>

        <ProductToolbar categories={categories} />

        {visibleProducts.length === 0 ? (
          <ProductEmpty />
        ) : (
          <ProductGrid products={visibleProducts} />
        )}

        <ProductPagination
          currentPage={currentPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </main>
  );
}