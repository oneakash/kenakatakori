import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth/session";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/checkout");
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Complete your order information.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <CheckoutForm />

          <CheckoutSummary />
        </div>
      </div>
    </main>
  );
}