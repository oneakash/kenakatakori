import { Category } from "@/types/category";
import { Product } from "@/types/product";
const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined");
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function getCategoryById(
  id: number
): Promise<Category> {
  const response = await fetch(
    `${API_URL}/categories/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category> {
  const response = await fetch(
    `${API_URL}/categories/slug/${slug}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
}

export async function getProductsByCategory(
  id: number
): Promise<Product[]> {
  const response = await fetch(
    `${API_URL}/categories/${id}/products`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch category products"
    );
  }

  return response.json();
}