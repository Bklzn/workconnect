import type { Product } from "@/data/products";
import { parsePrice, round2 } from "@/lib/pricing";
import type { AddProductFormValues } from "@/lib/validators";

export function toProduct(values: AddProductFormValues): Product {
  const net = parsePrice(values.netPrice) ?? 0;
  const gross = parsePrice(values.grossPrice) ?? 0;

  return {
    name: values.name,
    sku: values.sku,
    category: values.category ?? "",
    priceGross: round2(gross),
    status: values.isAvailable ? "Dostępny" : "Niedostępny",
    stock: values.limited ? Number(values.stockQuantity) : "—",
    manufacturer: values.manufacturer,
    description: values.description || undefined,
    features: values.features,
    netPrice: round2(net),
    vatRate: values.vatRate,
    currency: values.currency,
    minCartQuantity: values.minCartQuantity
      ? Number(values.minCartQuantity)
      : undefined,
    maxCartQuantity: values.maxCartQuantity
      ? Number(values.maxCartQuantity)
      : undefined,
  };
}