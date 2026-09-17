import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface FeaturedProductCardProps {
  product: Product;
  accent?: "red" | "pink" | "blue" | "green";
}

const accentStyles = {
  red: {
    border: "border-red-200 dark:border-red-900",
    bar: "bg-red-400",
  },
  pink: {
    border: "border-pink-200 dark:border-pink-900",
    bar: "bg-pink-400",
  },
  blue: {
    border: "border-sky-200 dark:border-sky-900",
    bar: "bg-sky-400",
  },
  green: {
    border: "border-green-200 dark:border-green-900",
    bar: "bg-green-400",
  },
};

export default function FeaturedProductCard({
  product,
  accent = "blue",
}: FeaturedProductCardProps) {
  // Safe fallback
  const styles = accentStyles[accent] ?? accentStyles.blue;

  return (
    <Link
      href={`/products/${product.id}`}
      className={`group block overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-900 ${styles.border}`}
    >
      {/* Image */}
      <div className="relative aspect-[1.35/1] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.title}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium text-gray-400">
          {product.category?.name || "Product"}
        </p>

        <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-gray-900 dark:text-white">
          {product.title}
        </h3>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Premium quality product
        </p>

        {/* Accent */}
        <div className={`mt-4 h-1 w-full rounded-full ${styles.bar}`} />

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>

          <span className="text-xs text-gray-400 transition group-hover:text-gray-900 dark:group-hover:text-white">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}