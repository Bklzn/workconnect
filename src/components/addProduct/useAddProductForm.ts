import { useForm } from "@tanstack/react-form";
import type { Step1FormValues } from "@/lib/validators";

const defaultValues: Step1FormValues = {
  name: "",
  sku: "",
  description: "",
  manufacturer: null,
  category: null,
  features: [],
};

export function useAddProductForm() {
  const form = useForm({ defaultValues });

  return { form };
}

export type AddProductForm = ReturnType<typeof useAddProductForm>["form"];
