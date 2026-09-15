"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (password.length < 4) {
      setError(
        "Password must be at least 4 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      /*
       * Registration succeeded.
       *
       * Login afterwards so the user is immediately
       * authenticated.
       */
      const loginResponse = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(
          loginData.message ||
            "Account created, but automatic login failed."
        );
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium"
        >
          Name
        </label>

        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          disabled={loading}
          placeholder="Your name"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 disabled:opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          disabled={loading}
          placeholder="you@example.com"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 disabled:opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          disabled={loading}
          placeholder="Create a password"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 disabled:opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="confirm-password"
          className="mb-2 block text-sm font-medium"
        >
          Confirm Password
        </label>

        <input
          id="confirm-password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          disabled={loading}
          placeholder="Confirm your password"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 disabled:opacity-50"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Creating account..."
          : "Create Account"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-black underline"
        >
          Login
        </Link>
      </p>
    </form>
  );
}