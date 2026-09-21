import { describe, expect, it } from "vitest";
import { toProduct } from "@/lib/toProduct";
import type { AddProductFormValues } from "@/lib/validators";

const baseValues: AddProductFormValues = {
  name: "MacBook Pro 14",
  sku: "MBP14",
  description: "",
  manufacturer: "Apple",
  category: "Komputery",
  features: ["WiFi", "USB-C"],
  netPrice: "1000",
  grossPrice: "1230",
  vatRate: 23,
  currency: "PLN",
  isAvailable: true,
  limited: false,
  stockQuantity: "",
  minCartQuantity: "",
  maxCartQuantity: "",
};

describe("toProduct", () => {
  it("maps an available product to Dostępny status", () => {
    const product = toProduct(baseValues);
    expect(product.status).toBe("Dostępny");
  });

  it("maps an unavailable product to Niedostępny status", () => {
    const product = toProduct({ ...baseValues, isAvailable: false });
    expect(product.status).toBe("Niedostępny");
  });

  it("uses the numeric stock when limited", () => {
    const product = toProduct({
      ...baseValues,
      limited: true,
      stockQuantity: "7",
    });
    expect(product.stock).toBe(7);
  });

  it("uses an em dash for stock when not limited", () => {
    const product = toProduct(baseValues);
    expect(product.stock).toBe("—");
  });

  it("drops an empty description", () => {
    const product = toProduct(baseValues);
    expect(product.description).toBeUndefined();
  });

  it("keeps a non-empty description", () => {
    const product = toProduct({ ...baseValues, description: "Opis produktu" });
    expect(product.description).toBe("Opis produktu");
  });

  it("drops empty cart quantities", () => {
    const product = toProduct(baseValues);
    expect(product.minCartQuantity).toBeUndefined();
    expect(product.maxCartQuantity).toBeUndefined();
  });

  it("converts non-empty cart quantities to numbers", () => {
    const product = toProduct({
      ...baseValues,
      minCartQuantity: "2",
      maxCartQuantity: "10",
    });
    expect(product.minCartQuantity).toBe(2);
    expect(product.maxCartQuantity).toBe(10);
  });

  it("rounds prices to two decimals", () => {
    const product = toProduct({
      ...baseValues,
      netPrice: "10.005",
      grossPrice: "12.005",
    });
    expect(product.netPrice).toBe(10.01);
    expect(product.priceGross).toBe(12.01);
  });

  it("falls back to an empty category when null", () => {
    const product = toProduct({ ...baseValues, category: null });
    expect(product.category).toBe("");
  });

  it("keeps null manufacturer", () => {
    const product = toProduct({ ...baseValues, manufacturer: null });
    expect(product.manufacturer).toBeNull();
  });

  it("passes through vatRate and currency", () => {
    const product = toProduct(baseValues);
    expect(product.vatRate).toBe(23);
    expect(product.currency).toBe("PLN");
  });

  it("passes through features", () => {
    const product = toProduct(baseValues);
    expect(product.features).toEqual(["WiFi", "USB-C"]);
  });
});