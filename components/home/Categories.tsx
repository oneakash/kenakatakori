import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/api/categories";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Shop by Category
        </h2>

        <p className="mt-2 text-gray-500">
          Explore our product categories
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group overflow-hidden rounded-xl border"
          >
            <div className="relative aspect-video">
              <Image
                src={category.image}
                alt={category.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}