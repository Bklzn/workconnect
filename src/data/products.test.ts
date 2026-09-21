import { describe, expect, it } from "vitest";
import { AddProductSteps, products } from "@/data/products";

describe("products mock data", () => {
  it("has unique SKUs", () => {
    const skus = products.map((p) => p.sku);
    expect(new Set(skus).size).toBe(skus.length);
  });

  it("defines required fields for every product", () => {
    for (const product of products) {
      expect(product.name.length).toBeGreaterThan(0);
      expect(product.sku.length).toBeGreaterThan(0);
      expect(product.category.length).toBeGreaterThan(0);
      expect(product.priceGross).toBeGreaterThanOrEqual(0);
    }
  });

  it("uses only valid status values", () => {
    for (const product of products) {
      expect(["Dostępny", "Niedostępny"]).toContain(product.status);
    }
  });

  it("uses a non-NaN stock when numeric", () => {
    for (const product of products) {
      if (typeof product.stock === "number") {
        expect(Number.isNaN(product.stock)).toBe(false);
      }
    }
  });
});

describe("AddProductSteps", () => {
  it("defines exactly three ordered steps", () => {
    expect(AddProductSteps.map((step) => step.number)).toEqual([1, 2, 3]);
    expect(AddProductSteps.every((step) => step.title.length > 0)).toBe(true);
  });
});
