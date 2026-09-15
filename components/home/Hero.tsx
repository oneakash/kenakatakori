import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto grid min-h-[550px] max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        
        {/* Content */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
            Welcome to KENAKATA
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Discover products
            <span className="block">you'll love.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Explore our collection of quality products, discover new
            favorites, and enjoy a simple shopping experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:opacity-80 dark:bg-white dark:text-black"
            >
              Shop Now
            </Link>

            <Link
              href="/products"
              className="rounded-lg border px-6 py-3 font-semibold transition hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Explore Products
            </Link>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative hidden md:block">
          <div className="aspect-square overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800">
            <div className="flex h-full items-center justify-center">
              <img
                src="/images/hero-image.jpeg"
                alt="Hero Image"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}