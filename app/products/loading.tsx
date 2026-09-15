export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-10">
          <div className="h-9 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />

          <div className="mt-3 h-4 w-72 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Search + Filter Skeleton */}
        <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="grid gap-5 md:grid-cols-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="mb-2 h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-11 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
            </div>

            {/* Category */}
            <div>
              <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-11 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
            </div>

            {/* Sort */}
            <div>
              <div className="mb-2 h-4 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-11 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>

          {/* Price Filters */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-11 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
            </div>

            <div>
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-11 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
            </div>

            <div className="flex items-end gap-3">
              <div className="h-11 w-28 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="h-11 w-24 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-200 dark:bg-gray-800">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/10" />
              </div>

              {/* Product Content */}
              <div className="space-y-4 p-5">
                {/* Category */}
                <div className="h-3.5 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                {/* Title */}
                <div className="space-y-2">
                  <div className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                  <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}