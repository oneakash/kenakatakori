import { describe, expect, it } from "vitest";
import {
  validateCheckout,
} from "../lib/checkout/validation";
import { CheckoutFormData } from "../types/checkout";

const validCheckout: CheckoutFormData = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  phone: "+1 555 123 4567",
  address: "1 Analytical Engine Way",
  city: "London",
  postalCode: "EC1A 1BB",
  country: "United Kingdom",
  paymentMethod: "card",
};

describe("validateCheckout", () => {
  it("accepts a complete checkout form", () => {
    expect(validateCheckout(validCheckout)).toEqual({});
  });

  it("reports missing required fields", () => {
    const errors = validateCheckout({
      ...validCheckout,
      firstName: "",
      email: "",
      country: "",
    });

    expect(errors.firstName).toBe("First name is required");
    expect(errors.email).toBe("Email is required");
    expect(errors.country).toBe("Country is required");
  });

  it("rejects malformed email addresses", () => {
    const errors = validateCheckout({
      ...validCheckout,
      email: "not-an-email",
    });

    expect(errors.email).toBe("Enter a valid email address");
  });
});
