export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  address: string;
  city: string;
  postalCode: string;
  country: string;

  paymentMethod: "card" | "cash";
}

export interface CheckoutItem {
  productId: number;
  quantity: number;
}

export interface CheckoutRequest {
  customer: CheckoutFormData;
  items: CheckoutItem[];
}

export interface CheckoutResponse {
  success: boolean;
  orderId: string;
  subtotal: number;
  shipping: number;
  total: number;
}