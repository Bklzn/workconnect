import { CURRENCIES, VAT_RATES } from "@/data/productOptions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  computeGross,
  computeNet,
  formatPrice,
  parsePrice,
} from "@/lib/pricing";
import {
  currencyValidator,
  grossPriceValidator,
  netPriceValidator,
  vatRateValidator,
} from "@/lib/validators";
import { FieldError } from "./FieldError";
import type { AddProductForm } from "./useAddProductForm";

interface PricingStepProps {
  form: AddProductForm;
  attempted: boolean;
}

export function PricingStep({ form, attempted }: PricingStepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="netPrice"
          validators={{
            onChange: ({ value }) => netPriceValidator(value),
            onBlur: ({ value }) => netPriceValidator(value),
          }}
        >
          {(field) => {
            const showError = attempted || field.state.meta.isTouched;
            return (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Cena netto</Label>
                <Input
                  id={field.name}
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={field.state.value}
                  onChange={(event) => {
                    const value = event.target.value;
                    field.handleChange(value);
                    const net = parsePrice(value);
                    if (net != null) {
                      form.setFieldValue(
                        "grossPrice",
                        formatPrice(
                          computeGross(net, form.state.values.vatRate),
                        ),
                      );
                    }
                  }}
                  onBlur={field.handleBlur}
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
          name="grossPrice"
          validators={{
            onChange: ({ value }) => grossPriceValidator(value),
            onBlur: ({ value }) => grossPriceValidator(value),
          }}
        >
          {(field) => {
            const showError = attempted || field.state.meta.isTouched;
            return (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name}>Cena brutto</Label>
                <Input
                  id={field.name}
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={field.state.value}
                  onChange={(event) => {
                    const value = event.target.value;
                    field.handleChange(value);
                    const gross = parsePrice(value);
                    if (gross != null) {
                      form.setFieldValue(
                        "netPrice",
                        formatPrice(
                          computeNet(gross, form.state.values.vatRate),
                        ),
                      );
                    }
                  }}
                  onBlur={field.handleBlur}
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

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field
          name="vatRate"
          validators={{
            onChange: ({ value }) => vatRateValidator(value),
          }}
        >
          {(field) => {
            const showError = attempted || field.state.meta.isTouched;
            return (
              <div className="flex flex-col gap-1.5">
                <Label>Stawka VAT</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => {
                    if (value == null) return;
                    field.handleChange(value);
                    const net = parsePrice(form.state.values.netPrice);
                    if (net != null) {
                      form.setFieldValue(
                        "grossPrice",
                        formatPrice(computeGross(net, value)),
                      );
                    }
                  }}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={
                      showError && field.state.meta.errors.length > 0
                    }
                  >
                    <SelectValue>
                      {(value) => (value == null ? null : <>{value}%</>)}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {VAT_RATES.map((rate) => (
                      <SelectItem key={rate} value={rate}>
                        {rate}%
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
          name="currency"
          validators={{
            onChange: ({ value }) => currencyValidator(value),
          }}
        >
          {(field) => {
            const showError = attempted || field.state.meta.isTouched;
            return (
              <div className="flex flex-col gap-1.5">
                <Label>Waluta</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => {
                    if (value != null) field.handleChange(value);
                  }}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={
                      showError && field.state.meta.errors.length > 0
                    }
                  >
                    <SelectValue placeholder="Wybierz walutę" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
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
    </div>
  );
}
