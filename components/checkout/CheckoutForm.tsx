"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useCart } from "@/store/cartStore";
import { CheckoutFormData } from "@/types/checkout";
import {
  ValidationErrors,
  validateCheckout,
} from "@/lib/checkout/validation";

type CheckoutErrors = ValidationErrors & {
  form?: string;
};

export default function CheckoutForm() {
  const router = useRouter();

  const { items, clearCart } = useCart();

  const [formData, setFormData] =
    useState<CheckoutFormData>({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      paymentMethod: "card",
    });

  const [errors, setErrors] = useState<CheckoutErrors>({});

  const [loading, setLoading] = useState(false);

  function updateField(
    field: keyof CheckoutFormData,
    value: string
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    // Remove error once user starts fixing the field
    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const validationErrors =
      validateCheckout(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (items.length === 0) {
      setErrors({
        form: "Your cart is empty.",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: formData,

          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Checkout failed"
        );
      }

      clearCart();

      router.push(
        `/checkout/success?orderId=${data.orderId}`
      );
    } catch (error) {
      setErrors({
        form:
          error instanceof Error
            ? error.message
            : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {/* Customer Information */}
      <section className="rounded-2xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold">
          Customer Information
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field
            label="First name"
            value={formData.firstName}
            error={errors.firstName}
            onChange={(value) =>
              updateField("firstName", value)
            }
          />

          <Field
            label="Last name"
            value={formData.lastName}
            error={errors.lastName}
            onChange={(value) =>
              updateField("lastName", value)
            }
          />

          <Field
            label="Email"
            type="email"
            value={formData.email}
            error={errors.email}
            onChange={(value) =>
              updateField("email", value)
            }
          />

          <Field
            label="Phone"
            type="tel"
            value={formData.phone}
            error={errors.phone}
            onChange={(value) =>
              updateField("phone", value)
            }
          />
        </div>
      </section>

      {/* Shipping */}
      <section className="rounded-2xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold">
          Shipping Address
        </h2>

        <div className="mt-6 space-y-5">
          <Field
            label="Address"
            value={formData.address}
            error={errors.address}
            onChange={(value) =>
              updateField("address", value)
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="City"
              value={formData.city}
              error={errors.city}
              onChange={(value) =>
                updateField("city", value)
              }
            />

            <Field
              label="Postal code"
              value={formData.postalCode}
              error={errors.postalCode}
              onChange={(value) =>
                updateField("postalCode", value)
              }
            />
          </div>

          <Field
            label="Country"
            value={formData.country}
            error={errors.country}
            onChange={(value) =>
              updateField("country", value)
            }
          />
        </div>
      </section>

      {/* Payment */}
      <section className="rounded-2xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold">
          Payment Method
        </h2>

        <div className="mt-5 space-y-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
            <input
              type="radio"
              name="payment"
              checked={formData.paymentMethod === "card"}
              onChange={() =>
                updateField("paymentMethod", "card")
              }
            />

            <div>
              <p className="font-medium">
                Credit / Debit Card
              </p>

              <p className="text-sm text-gray-500">
                Mock payment
              </p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border p-4">
            <input
              type="radio"
              name="payment"
              checked={formData.paymentMethod === "cash"}
              onChange={() =>
                updateField("paymentMethod", "cash")
              }
            />

            <div>
              <p className="font-medium">
                Cash on Delivery
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* Error */}
      {errors.form && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {errors.form}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
      >
        {loading
          ? "Processing payment..."
          : "Place Order"}
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

function Field({
  label,
  type = "text",
  value,
  error,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`w-full rounded-xl border bg-white px-4 py-3 outline-none transition dark:bg-gray-950 ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:border-black dark:border-gray-700 dark:focus:border-white"
        }`}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}