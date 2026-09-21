import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pln } from "@/lib/format";
import type { Product } from "@/data/products";
import { PaginationControls } from "./PaginationControls";

type ProductTableProps = {
  products: Product[];
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export function ProductTable({
  products,
  page,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: ProductTableProps) {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="bg-muted/50 text-muted-foreground">
          <TableHead className="w-[30%]">Nazwa</TableHead>
          <TableHead className="w-[15%]">SKU</TableHead>
          <TableHead className="w-[15%]">Kategoria</TableHead>
          <TableHead className="w-[12%]">Cena Brutto</TableHead>
          <TableHead className="w-[13%]">Status</TableHead>
          <TableHead className="w-[10%]">Magazyn</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: itemsPerPage }, (_, index) => {
          const product = products[index];
          if (product) {
            return (
              <TableRow key={product.sku}>
                <TableCell
                  className="truncate text-foreground font-medium"
                  title={product.name}
                >
                  {product.name}
                </TableCell>
                <TableCell className="truncate text-xs" title={product.sku}>
                  {product.sku}
                </TableCell>
                <TableCell className="truncate" title={product.category}>
                  {product.category}
                </TableCell>
                <TableCell className="text-foreground font-medium">
                  {pln.format(product.priceGross)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "Dostępny" ? "default" : "destructive"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-foreground font-normal">
                  {product.stock}
                </TableCell>
              </TableRow>
            );
          }
          return (
            <TableRow key={`placeholder-${index}`} aria-hidden>
              <TableCell colSpan={6} className="">
                &nbsp;
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-muted/50 text-muted-foreground">
          <TableCell colSpan={3} className="text-left text-xs">
            Strona {page} z {totalPages} · {totalItems} produktów
          </TableCell>
          <TableCell colSpan={3} className="text-right">
            <Pagination aria-label="Pagination" className="justify-end">
              <PaginationControls
                page={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </Pagination>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
