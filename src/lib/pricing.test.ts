import { describe, expect, it } from "vitest";
import {
  computeGross,
  computeNet,
  formatPrice,
  parsePrice,
  round2,
} from "@/lib/pricing";
import { VAT_RATES } from "@/data/productOptions";

describe("parsePrice", () => {
  it("parses decimal point numbers", () => {
    expect(parsePrice("10.50")).toBe(10.5);
  });

  it("parses comma as decimal separator", () => {
    expect(parsePrice("10,50")).toBe(10.5);
  });

  it("trims surrounding whitespace", () => {
    expect(parsePrice(" 12 ")).toBe(12);
  });

  it("rejects empty strings", () => {
    expect(parsePrice("")).toBeNull();
    expect(parsePrice("   ")).toBeNull();
  });

  it("rejects non-numeric input", () => {
    expect(parsePrice("abc")).toBeNull();
  });

  it("rejects negative values", () => {
    expect(parsePrice("-5")).toBeNull();
  });

  it("rejects NaN and Infinity", () => {
    expect(parsePrice("NaN")).toBeNull();
    expect(parsePrice("Infinity")).toBeNull();
  });
});

describe("round2", () => {
  it("rounds floating point arithmetic correctly", () => {
    expect(round2(0.1 + 0.2)).toBe(0.3);
  });

  it("rounds to two decimal places", () => {
    expect(round2(2.005)).toBe(2.01);
    expect(round2(2.004)).toBe(2.0);
  });

  it("rounds negative values", () => {
    expect(round2(-1.5)).toBe(-1.5);
    expect(round2(-1.234)).toBe(-1.23);
  });
});

describe("formatPrice", () => {
  it("returns empty string for null", () => {
    expect(formatPrice(null)).toBe("");
  });

  it("formats whole numbers with two decimals", () => {
    expect(formatPrice(12)).toBe("12.00");
  });

  it("formats decimals with two decimals", () => {
    expect(formatPrice(12.5)).toBe("12.50");
  });

  it("rounds before formatting", () => {
    expect(formatPrice(2.005)).toBe("2.01");
  });
});

describe("computeGross", () => {
  it("adds the VAT rate on top of the net price", () => {
    expect(computeGross(100, 23)).toBe(123);
    expect(computeGross(100, 0)).toBe(100);
  });
});

describe("computeNet", () => {
  it("removes the VAT rate from the gross price", () => {
    expect(computeNet(123, 23)).toBeCloseTo(100, 10);
    expect(computeNet(100, 0)).toBe(100);
  });

  it("is the inverse of computeGross for every VAT rate", () => {
    for (const rate of VAT_RATES) {
      const net = 1234.56;
      const gross = computeGross(net, rate);
      expect(computeNet(gross, rate)).toBeCloseTo(net, 10);
    }
  });
});