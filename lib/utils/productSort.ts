import { Product, ProductSort } from "@/types/product";

export function sortProducts(
  products: Product[],
  sort: ProductSort
): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "name-asc":
      return sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "name-desc":
      return sorted.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    default:
      return sorted;
  }
}