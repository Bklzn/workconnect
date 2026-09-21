import { useForm } from "@tanstack/react-form";
import type { AddProductFormValues } from "@/lib/validators";

const defaultValues: AddProductFormValues = {
  name: "",
  sku: "",
  description: "",
  manufacturer: null,
  category: null,
  features: [],
  netPrice: "",
  grossPrice: "",
  vatRate: 23,
  currency: "PLN",
};

export function useAddProductForm() {
  const form = useForm({ defaultValues });

  return { form };
}

export type AddProductForm = ReturnType<typeof useAddProductForm>["form"];
