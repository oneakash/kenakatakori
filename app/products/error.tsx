"use client";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold">
        Something went wrong
      </h2>

      <p className="mt-2 text-gray-500">
        We couldn&apos;t load the products.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-black px-5 py-2 text-white"
      >
        Try again
      </button>
    </main>
  );
}