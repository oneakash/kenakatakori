import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/checkout");
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold">
          Checkout
        </h1>

        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-xl font-bold">
            Welcome, {user.name}
          </h2>

          <p className="mt-2 text-gray-500">
            You can continue with your order.
          </p>

          {/* Checkout form will go here */}
        </div>
      </div>
    </main>
  );
}