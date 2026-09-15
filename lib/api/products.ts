import { Product, ProductFilters } from "@/types/product";

const API_URL = "https://api.escuelajs.co/api/v1";
export async function getProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  const searchParams = new URLSearchParams();

  if (filters.title) {
    searchParams.set("title", filters.title);
  }

  if (filters.price !== undefined) {
    searchParams.set("price", String(filters.price));
  }

  if (filters.price_min !== undefined) {
    searchParams.set("price_min", String(filters.price_min));
  }

  if (filters.price_max !== undefined) {
    searchParams.set("price_max", String(filters.price_max));
  }

  if (filters.categoryId !== undefined) {
    searchParams.set(
      "categoryId",
      String(filters.categoryId)
    );
  }

  if (filters.categorySlug) {
    searchParams.set(
      "categorySlug",
      filters.categorySlug
    );
  }

  if (filters.limit !== undefined) {
    searchParams.set(
      "limit",
      String(filters.limit)
    );
  }

  if (filters.offset !== undefined) {
    searchParams.set(
      "offset",
      String(filters.offset)
    );
  }

  const query = searchParams.toString();

  const response = await fetch(
    `${API_URL}/products${query ? `?${query}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

// single product
export async function getProductById(
  id: number
): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

// slug
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

