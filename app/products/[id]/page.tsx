import { notFound } from "next/navigation";
import { Product } from "@/types/product";

import {
  getProductById,
  getRelatedProducts,
} from "@/lib/api/products";

import ProductGallery from "@/components/products/ProductGallery";
import ProductInformation from "@/components/products/ProductInformation";
import RelatedProducts from "@/components/products/RelatedProducts";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  let relatedProducts: Product[] = [];

try {
  relatedProducts = await getRelatedProducts(product.id);
} catch {
  relatedProducts = [];
}

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Product */}
        <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <ProductGallery
            images={product.images}
            title={product.title}
          />

          {/* Information */}
          <ProductInformation
            product={product}
          />
        </section>

        {/* Related Products */}
        <RelatedProducts
          products={relatedProducts}
        />
      </div>
    </main>
  );
}