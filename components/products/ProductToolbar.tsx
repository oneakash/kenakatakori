import ProductSearch from "./ProductSearch";
import ProductCategoryFilter from "./ProductCategoryFilter";
import ProductSortSelect from "./ProductSortSelect";
import ProductPriceFilter from "./ProductPriceFilter";
import { Category } from "@/types/category";

interface ProductToolbarProps {
  categories: Category[];
}

export default function ProductToolbar({
  categories,
}: ProductToolbarProps) {
  return (
    <section className="mb-8 space-y-5">
      <ProductSearch />

      <div className="flex flex-col gap-3 sm:flex-row">
        <ProductCategoryFilter
          categories={categories}
        />

        <ProductSortSelect />
      </div>

      <ProductPriceFilter />
    </section>
  );
}