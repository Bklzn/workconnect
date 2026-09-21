import { Button } from "./ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { AddProductStepper } from "./AddProductStepper";
import { AddProductSteps as STEPS } from "@/data/products";
import PrimaryButton from "./PrimaryButton";
import { ArrowLeft } from "lucide-react";
import { cn } from "cn";
import { BasicInfoStep } from "./addProduct/BasicInfoStep";
import { PricingStep } from "./addProduct/PricingStep";
import { AvailabilityStep } from "./addProduct/AvailabilityStep";
import { buildStep1Schema, step2Schema, step3Schema } from "@/lib/validators";
import type { AddProductForm } from "./addProduct/useAddProductForm";

interface AddProductDialogContentProps {
  form: AddProductForm;
  attempted: boolean;
  setAttempted: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  existingSkus: string[];
  onSave: () => void;
}

const AddProductDialogContent: React.FC<AddProductDialogContentProps> = ({
  form,
  attempted,
  setAttempted,
  step,
  setStep,
  existingSkus,
  onSave,
}) => {
  const handleNext = async () => {
    setAttempted(true);
    if (step === 1) {
      const fields = [
        "name",
        "sku",
        "manufacturer",
        "category",
        "features",
      ] as const;
      await Promise.all(
        fields.map((name) => form.validateField(name, "change")),
      );
      if (!buildStep1Schema(existingSkus).safeParse(form.state.values).success)
        return;
    }

    if (step === 2) {
      const fields = ["netPrice", "grossPrice", "vatRate", "currency"] as const;
      await Promise.all(
        fields.map((name) => form.validateField(name, "change")),
      );
      if (!step2Schema.safeParse(form.state.values).success) return;
    }

    if (step === 3) {
      const fields = [
        "isAvailable",
        "limited",
        "stockQuantity",
        "minCartQuantity",
        "maxCartQuantity",
      ] as const;
      await Promise.all(
        fields.map((name) => form.validateField(name, "change")),
      );
      if (!step3Schema.safeParse(form.state.values).success) return;
    }

    setAttempted(false);
    setStep((value) => Math.min(STEPS.length, value + 1));
  };

  const handleSave = async () => {
    setAttempted(true);
    const fields = [
      "isAvailable",
      "limited",
      "stockQuantity",
      "minCartQuantity",
      "maxCartQuantity",
    ] as const;
    await Promise.all(fields.map((name) => form.validateField(name, "change")));
    if (!step3Schema.safeParse(form.state.values).success) return;
    onSave();
  };

  return (
    <DialogContent mobileFullscreen>
      <DialogHeader>
        <DialogTitle>Dodaj nowy produkt</DialogTitle>
      </DialogHeader>
      <AddProductStepper currentStep={step} />
      <div className="flex flex-col gap-4 py-4 mb-auto lg:mb-0 overflow-y-auto">
        {step === 1 && (
          <BasicInfoStep
            form={form}
            attempted={attempted}
            existingSkus={existingSkus}
          />
        )}
        {step === 2 && <PricingStep form={form} attempted={attempted} />}
        {step === 3 && <AvailabilityStep form={form} attempted={attempted} />}
      </div>
      <DialogFooter className="sm:justify-between">
        <Button
          type="button"
          variant="outline"
          disabled={step === 1}
          className={cn(step === 1 && "opacity-0!")}
          onClick={() => setStep((value) => Math.max(1, value - 1))}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Wstecz
        </Button>
        {step < STEPS.length ? (
          <PrimaryButton
            type="button"
            disabled={step === STEPS.length}
            onClick={handleNext}
          >
            Dalej
            <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
          </PrimaryButton>
        ) : (
          <PrimaryButton type="button" onClick={handleSave}>
            Zapisz produkt
          </PrimaryButton>
        )}
      </DialogFooter>
    </DialogContent>
  );
};

export default AddProductDialogContent;
