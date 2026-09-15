import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-3xl font-bold">
          Create account
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Create your KENAKATA account.
        </p>

        <div className="mt-8">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}