import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const image = product.images[0];

  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={product.title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <p className="mb-1 text-sm text-gray-500">
            {product.category.name}
          </p>

          <h2 className="line-clamp-2 font-semibold">
            {product.title}
          </h2>

          <p className="mt-2 text-lg font-bold">
            ${product.price}
          </p>
        </div>
      </Link>
    </article>
  );
}