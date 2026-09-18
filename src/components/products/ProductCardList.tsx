import { Pagination } from "@/components/ui/pagination";
import type { Product } from "@/products";
import { PaginationControls } from "./PaginationControls";
import { ProductCard } from "./ProductCard";

type ProductCardListProps = {
  products: Product[];
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export function ProductCardList({
  products,
  page,
  totalPages,
  totalItems,
  onPageChange,
}: ProductCardListProps) {
  return (
    <>
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <ProductCard key={product.sku} product={product} />
        ))}
      </div>
      <div className="flex flex-col items-center px-4 py-3 text-xs text-muted-foreground">
        <span>
          Strona {page} z {totalPages} · {totalItems} produktów
        </span>
        <Pagination aria-label="Pagination" className="mt-4">
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </Pagination>
      </div>
    </>
  );
}
