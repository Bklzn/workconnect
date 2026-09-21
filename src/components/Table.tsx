import { useEffect } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
import type { Product } from "@/data/products";
import { ProductCardList } from "./products/ProductCardList";
import { ProductTable } from "./products/ProductTable";
import { Card } from "./ui/card";

interface TableDemoProps {
  products: Product[];
}

export function TableDemo({ products }: TableDemoProps) {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const currentProducts = products.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage);
    }
  }, [page, safePage, setPage]);

  return (
    <>
      <div className="hidden lg:block w-full">
        <Card className="py-0">
          <ProductTable
            products={currentProducts}
            page={page}
            totalPages={totalPages}
            totalItems={products.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setPage}
          />
        </Card>
      </div>
      <div className="flex flex-col gap-3 lg:hidden w-full mb-auto">
        <ProductCardList
          products={currentProducts}
          page={page}
          totalPages={totalPages}
          totalItems={products.length}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
