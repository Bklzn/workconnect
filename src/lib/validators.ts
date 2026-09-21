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

export type AddProductFormValues = Step1FormValues & Step2FormValues;
