import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import LogoutButton from "@/components/auth/LogoutButton";
import MobileMenu from "./MobileMenu";
import CartLink from "@/components/cart/CartLink";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          KENAKATA
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>

          <Link href="/products">
            Products
          </Link>

          <CartLink />

          {user ? (
            <>
              <Link href="/account">
                Account
              </Link>

              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login">
                Login
              </Link>

              <Link href="/register">
                Register
              </Link>
            </>
          )}
        </nav>

        <MobileMenu isLoggedIn={!!user} />
      </div>
    </header>
  );
}