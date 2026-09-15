"use client";

import Link from "next/link";
import { useState } from "react";
import LogoutButton from "@/components/auth/LogoutButton";

interface MobileMenuProps {
  isLoggedIn: boolean;
}

export default function MobileMenu({
  isLoggedIn,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg border px-3 py-2 md:hidden"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {isOpen && (
        <nav className="absolute left-0 top-16 w-full border-b bg-white px-4 py-4 dark:border-gray-800 dark:bg-gray-950 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={closeMenu}>
              Home
            </Link>

            <Link href="/products" onClick={closeMenu}>
              Products
            </Link>

            <Link href="/cart" onClick={closeMenu}>
              Cart
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  href="/account"
                  onClick={closeMenu}
                >
                  Account
                </Link>

                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </>
  );
}