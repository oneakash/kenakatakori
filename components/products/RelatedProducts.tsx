import { Product } from "@/types/product";
import ProductGrid from "./ProductGrid";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 border-t pt-16 dark:border-gray-800">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
          You may also like
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Related Products
        </h2>
      </div>

      <ProductGrid products={products.slice(0, 4)} />
    </section>
  );
}