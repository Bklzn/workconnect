import { z } from "zod";

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
