import { describe, expect, it } from "vitest";
import { pln } from "@/lib/format";

describe("pln", () => {
  it("formats whole numbers with a non-breaking space and comma decimals", () => {
    const formatted = pln.format(9999);
    expect(formatted).toContain("zł");
    expect(formatted).toContain("9");
    expect(formatted).toContain(",");
  });

  it("formats decimal amounts", () => {
    const formatted = pln.format(9.99);
    expect(formatted).toContain("9,99");
    expect(formatted).toContain("zł");
  });
});