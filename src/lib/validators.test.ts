import { describe, expect, it } from "vitest";
import {
  buildStep1Schema,
  categoryValidator,
  currencyValidator,
  featuresValidator,
  grossPriceValidator,
  manufacturerValidator,
  maxCartQuantityValidator,
  minCartQuantityValidator,
  nameValidator,
  netPriceValidator,
  skuValidator,
  step2Schema,
  step3Schema,
  stockQuantityValidator,
  vatRateValidator,
} from "@/lib/validators";

describe("nameValidator", () => {
  it("requires a non-empty value", () => {
    expect(nameValidator("")).toBe("Podaj nazwę produktu");
  });

  it("requires at least 3 characters", () => {
    expect(nameValidator("ab")).toBe("Nazwa produktu musi mieć co najmniej 3 znaki");
  });

  it("accepts a valid name", () => {
    expect(nameValidator("abc")).toBeUndefined();
  });
});

describe("skuValidator", () => {
  it("requires a non-empty value", () => {
    expect(skuValidator("")).toBe("Podaj SKU produktu");
  });

  it("rejects values longer than 24 characters", () => {
    expect(skuValidator("A".repeat(25))).toBe("SKU może mieć maksymalnie 24 znaki");
  });

  it("rejects characters other than letters and digits", () => {
    expect(skuValidator("abc-1")).toBe("SKU może zawierać tylko litery i cyfry");
  });

  it("accepts a valid value", () => {
    expect(skuValidator("ABC123")).toBeUndefined();
  });

  it("detects duplicates case-insensitively", () => {
    expect(skuValidator("abc", ["ABC"])).toBe("Produkt z tym SKU już istnieje");
  });

  it("rejects a value with spaces before the duplicate check", () => {
    expect(skuValidator(" abc ", ["ABC"])).toBe(
      "SKU może zawierać tylko litery i cyfry",
    );
  });

  it("accepts a value not present in existing SKUs", () => {
    expect(skuValidator("xyz", ["ABC"])).toBeUndefined();
  });
});

describe("buildStep1Schema", () => {
  it("does not check uniqueness when no SKUs exist", () => {
    const result = buildStep1Schema([]).safeParse({
      name: "abc",
      sku: "ABC",
      description: "",
      manufacturer: "Apple",
      category: "Komputery",
      features: ["Bluetooth"],
    });
    expect(result.success).toBe(true);
  });

  it("rejects a duplicate SKU when existing SKUs are provided", () => {
    const result = buildStep1Schema(["ABC"]).safeParse({
      name: "abc",
      sku: "abc",
      description: "",
      manufacturer: "Apple",
      category: "Komputery",
      features: ["Bluetooth"],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Produkt z tym SKU już istnieje");
    }
  });
});

describe("manufacturerValidator", () => {
  it("rejects null and empty values", () => {
    expect(manufacturerValidator(null)).toBe("Wybierz producenta");
  });

  it("accepts a non-empty value", () => {
    expect(manufacturerValidator("Apple")).toBeUndefined();
  });
});

describe("categoryValidator", () => {
  it("rejects null and empty values", () => {
    expect(categoryValidator(null)).toBe("Wybierz kategorię");
    expect(categoryValidator("")).toBe("Wybierz kategorię");
  });

  it("accepts a non-empty value", () => {
    expect(categoryValidator("Komputery")).toBeUndefined();
  });
});

describe("featuresValidator", () => {
  it("requires at least one feature", () => {
    expect(featuresValidator([])).toBe("Wybierz co najmniej jedną cechę");
  });

  it("accepts a non-empty feature list", () => {
    expect(featuresValidator(["Bluetooth"])).toBeUndefined();
  });
});

describe("netPriceValidator", () => {
  it("requires a non-empty value", () => {
    expect(netPriceValidator("")).toBe("Podaj cenę netto");
  });

  it("rejects an unparseable price", () => {
    expect(netPriceValidator("abc")).toBe("Nieprawidłowa cena");
  });

  it("accepts a valid price", () => {
    expect(netPriceValidator("10,50")).toBeUndefined();
  });
});

describe("grossPriceValidator", () => {
  it("requires a non-empty value", () => {
    expect(grossPriceValidator("")).toBe("Podaj cenę brutto");
  });

  it("rejects an unparseable price", () => {
    expect(grossPriceValidator("-1")).toBe("Nieprawidłowa cena");
  });

  it("accepts a valid price", () => {
    expect(grossPriceValidator("123")).toBeUndefined();
  });
});

describe("vatRateValidator", () => {
  it("accepts rates from VAT_RATES", () => {
    for (const rate of [0, 5, 8, 23]) {
      expect(vatRateValidator(rate)).toBeUndefined();
    }
  });

  it("rejects rates outside VAT_RATES", () => {
    expect(vatRateValidator(10)).toBe("Wybierz stawkę VAT");
  });
});

describe("currencyValidator", () => {
  it("requires a non-empty value", () => {
    expect(currencyValidator("")).toBe("Wybierz walutę");
  });

  it("accepts a valid currency", () => {
    expect(currencyValidator("PLN")).toBeUndefined();
  });
});

describe("step2Schema", () => {
  it("rejects missing prices", () => {
    const result = step2Schema.safeParse({
      netPrice: "",
      grossPrice: "",
      vatRate: 23,
      currency: "PLN",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a complete valid step", () => {
    const result = step2Schema.safeParse({
      netPrice: "100",
      grossPrice: "123",
      vatRate: 23,
      currency: "PLN",
    });
    expect(result.success).toBe(true);
  });
});

describe("step3Schema", () => {
  const valid = {
    isAvailable: true,
    limited: false,
    stockQuantity: "",
    minCartQuantity: "",
    maxCartQuantity: "",
  };

  it("accepts an empty step", () => {
    expect(step3Schema.safeParse(valid).success).toBe(true);
  });

  it("requires stock when limited is true", () => {
    const result = step3Schema.safeParse({ ...valid, limited: true });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Podaj ilość na magazynie");
    }
  });

  it("rejects non-negative-integer stock", () => {
    for (const [stock, expected] of [
      ["-1", "Ilość musi być nieujemną liczbą całkowitą"],
      ["1.5", "Ilość musi być nieujemną liczbą całkowitą"],
      ["abc", "Ilość musi być nieujemną liczbą całkowitą"],
    ] as const) {
      const result = step3Schema.safeParse({ ...valid, limited: true, stockQuantity: stock });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(expected);
      }
    }
  });

  it("accepts an integer stock when limited", () => {
    expect(
      step3Schema.safeParse({ ...valid, limited: true, stockQuantity: "7" }).success,
    ).toBe(true);
  });

  it("rejects non-integer min cart quantity", () => {
    const result = step3Schema.safeParse({ ...valid, minCartQuantity: "1.5" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Minimalna ilość musi być nieujemną liczbą całkowitą",
      );
    }
  });

  it("rejects non-integer max cart quantity", () => {
    const result = step3Schema.safeParse({ ...valid, maxCartQuantity: "abc" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Maksymalna ilość musi być nieujemną liczbą całkowitą",
      );
    }
  });

  it("reports a min greater than max on both fields", () => {
    const result = step3Schema.safeParse({
      ...valid,
      minCartQuantity: "5",
      maxCartQuantity: "2",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain("Minimalna ilość nie może być większa niż maksymalna");
      expect(messages).toContain("Maksymalna ilość nie może być mniejsza niż minimalna");
    }
  });

  it("accepts a valid min/max range", () => {
    expect(
      step3Schema.safeParse({ ...valid, minCartQuantity: "2", maxCartQuantity: "10" })
        .success,
    ).toBe(true);
  });
});

describe("stockQuantityValidator", () => {
  it("requires a value when limited", () => {
    expect(stockQuantityValidator("", true)).toBe("Podaj ilość na magazynie");
  });

  it("rejects a non-integer when limited", () => {
    expect(stockQuantityValidator("-1", true)).toBe(
      "Ilość musi być nieujemną liczbą całkowitą",
    );
  });

  it("accepts an integer when limited", () => {
    expect(stockQuantityValidator("5", true)).toBeUndefined();
  });

  it("accepts an empty value when not limited", () => {
    expect(stockQuantityValidator("", false)).toBeUndefined();
  });

  it("rejects a non-integer when not limited", () => {
    expect(stockQuantityValidator("1.5", false)).toBe(
      "Ilość musi być nieujemną liczbą całkowitą",
    );
  });
});

describe("minCartQuantityValidator", () => {
  it("accepts an empty value", () => {
    expect(minCartQuantityValidator("", "10")).toBeUndefined();
  });

  it("rejects a non-integer", () => {
    expect(minCartQuantityValidator("1.5", "")).toBe(
      "Minimalna ilość musi być nieujemną liczbą całkowitą",
    );
  });

  it("rejects a min greater than the max", () => {
    expect(minCartQuantityValidator("5", "2")).toBe(
      "Minimalna ilość nie może być większa niż maksymalna",
    );
  });

  it("accepts a min within the max", () => {
    expect(minCartQuantityValidator("2", "10")).toBeUndefined();
  });

  it("ignores an invalid max", () => {
    expect(minCartQuantityValidator("5", "abc")).toBeUndefined();
  });
});

describe("maxCartQuantityValidator", () => {
  it("accepts an empty value", () => {
    expect(maxCartQuantityValidator("", "1")).toBeUndefined();
  });

  it("rejects a non-integer", () => {
    expect(maxCartQuantityValidator("1.5", "")).toBe(
      "Maksymalna ilość musi być nieujemną liczbą całkowitą",
    );
  });

  it("rejects a max smaller than the min", () => {
    expect(maxCartQuantityValidator("2", "5")).toBe(
      "Maksymalna ilość nie może być mniejsza niż minimalna",
    );
  });

  it("accepts a max within the min", () => {
    expect(maxCartQuantityValidator("10", "2")).toBeUndefined();
  });

  it("ignores an invalid min", () => {
    expect(maxCartQuantityValidator("5", "abc")).toBeUndefined();
  });
});