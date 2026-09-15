import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-xl border p-6 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold">
          Login
        </h1>

        <p className="mb-8 text-gray-500">
          Sign in to your KENAKATA account.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}