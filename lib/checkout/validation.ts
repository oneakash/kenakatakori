import { CheckoutFormData } from "@/types/checkout";

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  paymentMethod?: string;
}

export function validateCheckout(
  data: CheckoutFormData
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required";
  }

  if (!data.address.trim()) {
    errors.address = "Address is required";
  }

  if (!data.city.trim()) {
    errors.city = "City is required";
  }

  if (!data.postalCode.trim()) {
    errors.postalCode = "Postal code is required";
  }

  if (!data.country.trim()) {
    errors.country = "Country is required";
  }

  if (!data.paymentMethod) {
    errors.paymentMethod = "Select a payment method";
  }

  return errors;
}