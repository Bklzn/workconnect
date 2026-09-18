import { CATEGORIES, MANUFACTURERS } from "@/data/productOptions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  categoryValidator,
  featuresValidator,
  manufacturerValidator,
  nameValidator,
  skuValidator,
} from "@/lib/validators";
import { FieldError } from "./FieldError";
import { ProductFeatureBadges } from "./ProductFeatureBadges";
import type { AddProductForm } from "./useAddProductForm";

interface BasicInfoStepProps {
  form: AddProductForm;
  attempted: boolean;
}

export function BasicInfoStep({ form, attempted }: BasicInfoStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => nameValidator(value),
            onBlur: ({ value }) => nameValidator(value),
          }}
        >
          {(field) => {
            const showError = attempted || field.state.meta.isTouched;
            return (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Nazwa produktu *</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="np. MacBook Pro 14"
                  aria-invalid={showError && field.state.meta.errors.length > 0}
                />
                <FieldError
                  error={showError ? field.state.meta.errors[0] : undefined}
                />
              </div>
            );
          }}
        </form.Field>
        <form.Field
          name="sku"
          validators={{
            onChange: ({ value }) => skuValidator(value),
            onBlur: ({ value }) => skuValidator(value),
          }}
        >
          {(field) => {
            const showError = attempted || field.state.meta.isTouched;
            return (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>SKU produktu *</Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="np. MBP14M3PRO"
                  aria-invalid={showError && field.state.meta.errors.length > 0}
                />
                <FieldError
                  error={showError ? field.state.meta.errors[0] : undefined}
                />
              </div>
            );
          }}
        </form.Field>
      </div>

      <form.Field name="description">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name}>Opis produktu</Label>
            <Textarea
              id={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="Krótki opis produktu (opcjonalnie)"
              rows={3}
            />
          </div>
        )}
      </form.Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="manufacturer"
          validators={{
            onChange: ({ value }) => manufacturerValidator(value),
          }}
        >
          {(field) => {
            const showError = attempted || field.state.meta.isTouched;
            return (
              <div className="flex flex-col gap-1.5">
                <Label>Producent *</Label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={
                      showError && field.state.meta.errors.length > 0
                    }
                  >
                    <SelectValue placeholder="Wybierz producenta" />
                  </SelectTrigger>
                  <SelectContent>
                    {MANUFACTURERS.map((manufacturer) => (
                      <SelectItem key={manufacturer} value={manufacturer}>
                        {manufacturer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError
                  error={showError ? field.state.meta.errors[0] : undefined}
                />
              </div>
            );
          }}
        </form.Field>
        <form.Field
          name="category"
          validators={{
            onChange: ({ value }) => categoryValidator(value),
          }}
        >
          {(field) => {
            const showError = attempted || field.state.meta.isTouched;
            return (
              <div className="flex flex-col gap-1.5">
                <Label>Kategoria *</Label>
                <Select
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={
                      showError && field.state.meta.errors.length > 0
                    }
                  >
                    <SelectValue placeholder="Wybierz kategorię" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError
                  error={showError ? field.state.meta.errors[0] : undefined}
                />
              </div>
            );
          }}
        </form.Field>
      </div>

      <form.Field
        name="features"
        validators={{
          onChange: ({ value }) => featuresValidator(value),
        }}
      >
        {(field) => {
          const showError = attempted || field.state.meta.isTouched;
          return (
            <div className="flex flex-col gap-1.5">
              <Label>Cechy produktu *</Label>
              <ProductFeatureBadges
                value={field.state.value}
                onChange={field.handleChange}
              />
              <FieldError
                error={showError ? field.state.meta.errors[0] : undefined}
              />
            </div>
          );
        }}
      </form.Field>
    </div>
  );
}
