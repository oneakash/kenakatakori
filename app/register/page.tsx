import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">
              Create account
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Create your KENAKATA account
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </main>
  );
}