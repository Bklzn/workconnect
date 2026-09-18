import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pln } from "@/lib/format";
import type { Product } from "@/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="flex flex-col">
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.sku}</CardDescription>
        </div>
        <CardAction className="my-auto">
          <Badge
            variant={product.status === "Dostępny" ? "default" : "destructive"}
          >
            {product.status}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-accent p-3">
          <div>
            <p className="text-xs text-muted-foreground">Kategoria</p>
            <p className="font-medium">{product.category}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Cena Brutto</p>
            <p className="font-semibold">{pln.format(product.priceGross)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Magazyn</p>
            <p className="font-semibold">{product.stock}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
