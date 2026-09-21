import { useState } from "react";
import type { Product } from "@/data/products";
import { ProductCardList } from "./products/ProductCardList";
import { ProductTable } from "./products/ProductTable";
import { Card } from "./ui/card";

interface TableDemoProps {
  products: Product[];
}

export function TableDemo({ products }: TableDemoProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

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