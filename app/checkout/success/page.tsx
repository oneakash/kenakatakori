import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="w-full max-w-lg rounded-3xl border bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl dark:bg-green-950">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Order Confirmed!
        </h1>

        <p className="mt-3 text-gray-500">
          Your order has been successfully placed.
        </p>

        {params.orderId && (
          <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-xs text-gray-500">
              Order ID
            </p>

            <p className="mt-1 font-mono font-semibold">
              {params.orderId}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className="flex-1 rounded-xl bg-black px-5 py-3 font-semibold text-white dark:bg-white dark:text-black"
          >
            Continue Shopping
          </Link>

          <Link
            href="/account"
            className="flex-1 rounded-xl border px-5 py-3 font-semibold"
          >
            My Account
          </Link>
        </div>
      </div>
    </main>
  );
}