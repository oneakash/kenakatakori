import Image from "next/image";
import { getProductById } from "@/lib/api/products";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const product = await getProductById(Number(id));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500">
            {product.category.name}
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {product.title}
          </h1>

          <p className="mt-4 text-2xl font-bold">
            ${product.price}
          </p>

          <p className="mt-6 leading-7 text-gray-600">
            {product.description}
          </p>

          <button className="mt-8 rounded-lg bg-black px-6 py-3 font-semibold text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}