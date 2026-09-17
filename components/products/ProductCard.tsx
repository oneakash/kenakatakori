import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/cart/AddToCartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.title}
            fill
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {product.category?.name}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3 className="mt-1 line-clamp-2 font-semibold text-gray-900 hover:underline dark:text-white">
            {product.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Add to Cart */}
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}