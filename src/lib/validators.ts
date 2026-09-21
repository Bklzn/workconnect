import { z } from "zod";
import { VAT_RATES } from "@/data/productOptions";
import { parsePrice } from "@/lib/pricing";

const nameSchema = z
  .string()
  .min(1, "Podaj nazwę produktu")
  .min(3, "Nazwa produktu musi mieć co najmniej 3 znaki");

const skuSchema = z
  .string()
  .min(1, "Podaj SKU produktu")
  .max(24, "SKU może mieć maksymalnie 24 znaki")
  .regex(/^[a-zA-Z0-9]*$/, "SKU może zawierać tylko litery i cyfry");

const manufacturerSchema = z
  .string()
  .nullable()
  .refine((value) => value != null && value.length > 0, {
    message: "Wybierz producenta",
  });

const categorySchema = z
  .string()
  .nullable()
  .refine((value) => value != null && value.length > 0, {
    message: "Wybierz kategorię",
  });

const featuresSchema = z
  .array(z.string())
  .min(1, "Wybierz co najmniej jedną cechę");

export const step1Schema = z.object({
  name: nameSchema,
  sku: skuSchema,
  description: z.string().optional(),
  manufacturer: manufacturerSchema,
  category: categorySchema,
  features: featuresSchema,
});

export type Step1FormValues = z.infer<typeof step1Schema>;

function messageOf(schema: z.ZodTypeAny, value: unknown): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export const nameValidator = (value: string) => messageOf(nameSchema, value);
export const skuValidator = (value: string) => messageOf(skuSchema, value);
export const manufacturerValidator = (value: string | null) =>
  messageOf(manufacturerSchema, value);
export const categoryValidator = (value: string | null) =>
  messageOf(categorySchema, value);
export const featuresValidator = (value: string[]) =>
  messageOf(featuresSchema, value);

const netPriceSchema = z
  .string()
  .min(1, "Podaj cenę netto")
  .refine((value) => parsePrice(value) != null, "Nieprawidłowa cena");

const grossPriceSchema = z
  .string()
  .min(1, "Podaj cenę brutto")
  .refine((value) => parsePrice(value) != null, "Nieprawidłowa cena");

const vatRateSchema = z
  .number()
  .refine(
    (value) => (VAT_RATES as readonly number[]).includes(value),
    "Wybierz stawkę VAT",
  );

const currencySchema = z.string().min(1, "Wybierz walutę");

export const step2Schema = z.object({
  netPrice: netPriceSchema,
  grossPrice: grossPriceSchema,
  vatRate: vatRateSchema,
  currency: currencySchema,
});

export type Step2FormValues = z.infer<typeof step2Schema>;

export const netPriceValidator = (value: string) =>
  messageOf(netPriceSchema, value);
export const grossPriceValidator = (value: string) =>
  messageOf(grossPriceSchema, value);
export const vatRateValidator = (value: number) =>
  messageOf(vatRateSchema, value);
export const currencyValidator = (value: string) =>
  messageOf(currencySchema, value);

const isNonNegInt = (value: string) => /^\d+$/.test(value);

export const step3Schema = z
  .object({
    isAvailable: z.boolean(),
    limited: z.boolean(),
    stockQuantity: z.string(),
    minCartQuantity: z.string(),
    maxCartQuantity: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.limited) {
      if (data.stockQuantity === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stockQuantity"],
          message: "Podaj ilość na magazynie",
        });
      } else if (!isNonNegInt(data.stockQuantity)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["stockQuantity"],
          message: "Ilość musi być nieujemną liczbą całkowitą",
        });
      }
    }
    if (data.minCartQuantity !== "" && !isNonNegInt(data.minCartQuantity)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["minCartQuantity"],
        message: "Minimalna ilość musi być nieujemną liczbą całkowitą",
      });
    }
    if (data.maxCartQuantity !== "" && !isNonNegInt(data.maxCartQuantity)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxCartQuantity"],
        message: "Maksymalna ilość musi być nieujemną liczbą całkowitą",
      });
    }
    if (
      isNonNegInt(data.minCartQuantity) &&
      isNonNegInt(data.maxCartQuantity) &&
      Number(data.minCartQuantity) > Number(data.maxCartQuantity)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["minCartQuantity"],
        message: "Minimalna ilość nie może być większa niż maksymalna",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["maxCartQuantity"],
        message: "Maksymalna ilość nie może być mniejsza niż minimalna",
      });
    }
  });

export type Step3FormValues = z.infer<typeof step3Schema>;

export const stockQuantityValidator = (
  value: string,
  limited: boolean,
): string | undefined => {
  if (limited) {
    if (value === "") return "Podaj ilość na magazynie";
    if (!isNonNegInt(value)) return "Ilość musi być nieujemną liczbą całkowitą";
    return undefined;
  }
  if (value !== "" && !isNonNegInt(value))
    return "Ilość musi być nieujemną liczbą całkowitą";
  return undefined;
};

export const minCartQuantityValidator = (
  value: string,
  maxValue: string,
): string | undefined => {
  if (value === "") return undefined;
  if (!isNonNegInt(value)) return "Minimalna ilość musi być nieujemną liczbą całkowitą";
  if (maxValue !== "" && isNonNegInt(maxValue) && Number(value) > Number(maxValue))
    return "Minimalna ilość nie może być większa niż maksymalna";
  return undefined;
};

export const maxCartQuantityValidator = (
  value: string,
  minValue: string,
): string | undefined => {
  if (value === "") return undefined;
  if (!isNonNegInt(value)) return "Maksymalna ilość musi być nieujemną liczbą całkowitą";
  if (minValue !== "" && isNonNegInt(minValue) && Number(value) < Number(minValue))
    return "Maksymalna ilość nie może być mniejsza niż minimalna";
  return undefined;
};

export type AddProductFormValues = Step1FormValues &
  Step2FormValues &
  Step3FormValues;
