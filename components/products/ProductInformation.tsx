import Link from "next/link";
import { Product } from "@/types/product";
import AddToCartButton from "@/components/cart/AddToCartButton";

interface ProductInformationProps {
  product: Product;
}

export default function ProductInformation({
  product,
}: ProductInformationProps) {
  return (
    <div className="flex flex-col">
      {/* Category */}
      <Link
        href={`/products?category=${product.category.slug}`}
        className="w-fit text-sm font-medium uppercase tracking-wide text-gray-500 transition hover:text-black dark:hover:text-white"
      >
        {product.category.name}
      </Link>

      {/* Title */}
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {product.title}
      </h1>

      {/* Price */}
      <div className="mt-6">
        <span className="text-3xl font-bold">
          ${product.price.toFixed(2)}
        </span>
      </div>

      {/* Divider */}
      <div className="my-8 border-t dark:border-gray-800" />

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold">
          Description
        </h2>

        <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
      </div>

      {/* Product details */}
      <div className="mt-8 rounded-xl bg-gray-50 p-5 dark:bg-gray-900">
        <div className="flex justify-between py-2">
          <span className="text-gray-500">
            Category
          </span>

          <span className="font-medium">
            {product.category.name}
          </span>
        </div>

        <div className="flex justify-between py-2">
          <span className="text-gray-500">
            Product ID
          </span>

          <span className="font-medium">
            #{product.id}
          </span>
        </div>
      </div>

      {/* Add to cart */}
      <div className="mt-8">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}