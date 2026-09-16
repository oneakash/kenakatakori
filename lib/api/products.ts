import { Product } from "@/types/product";

const API_URL = "https://api.escuelajs.co/api/v1";

export interface ProductFilters {
  title?: string;
  price?: number;
  price_min?: number;
  price_max?: number;
  categoryId?: number;
  categorySlug?: string;
  limit?: number;
  offset?: number;
}

export async function getProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  const params = new URLSearchParams();

  if (filters.title) {
    params.set("title", filters.title);
  }

  if (filters.price !== undefined) {
    params.set("price", String(filters.price));
  }

  if (filters.price_min !== undefined) {
    params.set("price_min", String(filters.price_min));
  }

  if (filters.price_max !== undefined) {
    params.set("price_max", String(filters.price_max));
  }

  if (filters.categoryId !== undefined) {
    params.set("categoryId", String(filters.categoryId));
  }

  if (filters.categorySlug) {
    params.set("categorySlug", filters.categorySlug);
  }

  if (filters.limit !== undefined) {
    params.set("limit", String(filters.limit));
  }

  if (filters.offset !== undefined) {
    params.set("offset", String(filters.offset));
  }

  const query = params.toString();

  const response = await fetch(
    `${API_URL}/products${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function getProductById(
  id: number
): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function getProductBySlug(
  slug: string
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/products/slug/${slug}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function getRelatedProducts(
  id: number
): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/products/${id}/related`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch related products");
  }

  return response.json();
}