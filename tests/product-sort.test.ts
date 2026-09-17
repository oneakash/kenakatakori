import { describe, expect, it } from "vitest";
import { sortProducts } from "../lib/utils/productSort";
import { Product } from "../types/product";

function product(id: number, title: string, price: number): Product {
  return {
    id,
    title,
    slug: title.toLowerCase().replaceAll(" ", "-"),
    price,
    description: "",
    category: {
      id: 1,
      name: "Category",
      slug: "category",
      image: "",
    },
    images: [],
  };
}

describe("sortProducts", () => {
  const products = [
    product(1, "Bravo", 30),
    product(2, "Alpha", 10),
    product(3, "Charlie", 20),
  ];

  it("sorts by ascending price without mutating the input", () => {
    const sorted = sortProducts(products, "price-asc");

    expect(sorted.map((item) => item.id)).toEqual([2, 3, 1]);
    expect(products.map((item) => item.id)).toEqual([1, 2, 3]);
  });

  it("sorts names in descending order", () => {
    const sorted = sortProducts(products, "name-desc");

    expect(sorted.map((item) => item.title)).toEqual([
      "Charlie",
      "Bravo",
      "Alpha",
    ]);
  });
});
