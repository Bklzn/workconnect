import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "cn";
import { products } from "@/products";

const formatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
});

export function TableDemo() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 text-muted-foreground">
            <TableHead>Nazwa</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Kategoria</TableHead>
            <TableHead>Cena Brutto</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Magazyn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: itemsPerPage }, (_, index) => {
            const product = currentProducts[index];
            if (product) {
              return (
                <TableRow key={product.sku}>
                  <TableCell className="text-foreground font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-xs">{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-foreground font-medium">
                    {formatter.format(product.priceGross)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "Dostępny"
                          ? "default"
                          : "destructive"
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
              Strona {page} z {totalPages} · {products.length} produktów
            </TableCell>
            <TableCell colSpan={3} className="text-right">
              <Pagination aria-label="Pagination" className="justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      aria-disabled={page === 1}
                      className={cn(
                        page === 1 && "pointer-events-none opacity-50",
                      )}
                      onClick={(event) => {
                        event.preventDefault();
                        setPage((current) => Math.max(1, current - 1));
                      }}
                    />
                  </PaginationItem>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        isActive={p === page}
                        className={cn(
                          p === page && "bg-blue-600 text-primary-foreground",
                        )}
                        onClick={(event) => {
                          event.preventDefault();
                          setPage(p);
                        }}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      aria-disabled={page === totalPages}
                      className={cn(
                        page === totalPages && "pointer-events-none opacity-50",
                      )}
                      onClick={(event) => {
                        event.preventDefault();
                        setPage((current) => Math.min(totalPages, current + 1));
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
