import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-xl border p-8 text-center">
          <h1 className="text-3xl font-bold">
            Please login
          </h1>

          <p className="mt-3 text-gray-500">
            You need to login to view your profile.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">
        My Account
      </h1>

      <div className="mt-8 max-w-xl rounded-2xl border p-6">
        <div className="flex items-center gap-5">
          {user.avatar && (
            <Image
              src={user.avatar}
              alt={user.name}
              width={80}
              height={80}
              unoptimized
              className="rounded-full object-cover"
            />
          )}

          <div>
            <h2 className="text-xl font-semibold">
              {user.name}
            </h2>

            <p className="text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t pt-6">
          <p>
            <strong>User ID:</strong> {user.id}
          </p>

          <p className="mt-2">
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </div>
    </main>
  );
}