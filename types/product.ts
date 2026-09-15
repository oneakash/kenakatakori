import { Category } from "./category";

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

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