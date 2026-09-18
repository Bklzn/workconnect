import { cn } from "cn";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationControlsProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          aria-disabled={page === 1}
          className={cn(page === 1 && "pointer-events-none opacity-50")}
          onClick={(event) => {
            event.preventDefault();
            onPageChange(Math.max(1, page - 1));
          }}
        />
      </PaginationItem>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((p) => (
        <PaginationItem key={p}>
          <PaginationLink
            href="#"
            isActive={p === page}
            className={cn(p === page && "bg-blue-600 text-primary-foreground")}
            onClick={(event) => {
              event.preventDefault();
              onPageChange(p);
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
            onPageChange(Math.min(totalPages, page + 1));
          }}
        />
      </PaginationItem>
    </PaginationContent>
  );
}