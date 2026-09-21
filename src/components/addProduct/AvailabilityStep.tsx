import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  maxCartQuantityValidator,
  minCartQuantityValidator,
  stockQuantityValidator,
} from "@/lib/validators";
import { FieldError } from "./FieldError";
import type { AddProductForm } from "./useAddProductForm";

interface AvailabilityStepProps {
  form: AddProductForm;
  attempted: boolean;
}

export function AvailabilityStep({ form, attempted }: AvailabilityStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <form.Field name="isAvailable">
        {(field) => (
          <div className="flex items-center gap-4 -mt-4">
            <Switch
              checked={field.state.value}
              onCheckedChange={field.handleChange}
            />
            <Label className="text-sm">Produkt jest dostępny</Label>
          </div>
        )}
      </form.Field>

      <form.Field name="limited">
        {(limitedField) => (
          <div className="flex flex-col gap-4 border-y border-input py-4">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={limitedField.state.value}
                onCheckedChange={limitedField.handleChange}
              />
              <Label className="text-sm">Produkt limitowany</Label>
            </div>
            {limitedField.state.value && (
              <form.Field
                name="stockQuantity"
                validators={{
                  onChange: ({ value }) =>
                    stockQuantityValidator(value, form.state.values.limited),
                }}
              >
                {(field) => {
                  const showError = attempted || field.state.meta.isTouched;
                  return (
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor={field.name}>Ilość na magazynie *</Label>
                      <Input
                        id={field.name}
                        type="number"
                        inputMode="numeric"
                        step="1"
                        min="0"
                        placeholder="0"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={
                          showError && field.state.meta.errors.length > 0
                        }
                      />
                      <FieldError
                        error={
                          showError ? field.state.meta.errors[0] : undefined
                        }
                      />
                    </div>
                  );
                }}
              </form.Field>
            )}
          </div>
        )}
      </form.Field>

      <div className="flex flex-col gap-4 border-input -mb-4">
        <Label className="text-sm font-semibold">Limit koszyka</Label>
        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field
            name="minCartQuantity"
            validators={{
              onChange: ({ value }) =>
                minCartQuantityValidator(
                  value,
                  form.state.values.maxCartQuantity,
                ),
            }}
          >
            {(field) => {
              const showError = attempted || field.state.meta.isTouched;
              return (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>Minimalna ilość</Label>
                  <Input
                    id={field.name}
                    type="number"
                    inputMode="numeric"
                    step="1"
                    min="0"
                    placeholder="0"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={
                      showError && field.state.meta.errors.length > 0
                    }
                  />
                  <FieldError
                    error={showError ? field.state.meta.errors[0] : undefined}
                  />
                </div>
              );
            }}
          </form.Field>
          <form.Field
            name="maxCartQuantity"
            validators={{
              onChange: ({ value }) =>
                maxCartQuantityValidator(
                  value,
                  form.state.values.minCartQuantity,
                ),
            }}
          >
            {(field) => {
              const showError = attempted || field.state.meta.isTouched;
              return (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>Maksymalna ilość</Label>
                  <Input
                    id={field.name}
                    type="number"
                    inputMode="numeric"
                    step="1"
                    min="0"
                    placeholder="0"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={
                      showError && field.state.meta.errors.length > 0
                    }
                  />
                  <FieldError
                    error={showError ? field.state.meta.errors[0] : undefined}
                  />
                </div>
              );
            }}
          </form.Field>
        </div>
      </div>
    </div>
  );
}
