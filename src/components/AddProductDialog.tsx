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
import { step1Schema } from "@/lib/validators";
import type { AddProductForm } from "./addProduct/useAddProductForm";

interface AddProductDialogContentProps {
  form: AddProductForm;
  attempted: boolean;
  setAttempted: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const AddProductDialogContent: React.FC<AddProductDialogContentProps> = ({
  form,
  attempted,
  setAttempted,
  step,
  setStep,
}) => {
  const handleNext = async () => {
    setAttempted(true);
    const fields = [
      "name",
      "sku",
      "manufacturer",
      "category",
      "features",
    ] as const;
    await Promise.all(fields.map((name) => form.validateField(name, "change")));
    if (step1Schema.safeParse(form.state.values).success) {
      setStep((value) => Math.min(STEPS.length, value + 1));
    }
  };

  return (
    <DialogContent mobileFullscreen>
      <DialogHeader>
        <DialogTitle>Dodaj nowy produkt</DialogTitle>
      </DialogHeader>
      <AddProductStepper currentStep={step} />
      <div className="flex flex-col gap-4 py-4 mb-auto lg:mb-0 overflow-y-auto">
        {step === 1 && <BasicInfoStep form={form} attempted={attempted} />}
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
            disabled={step !== 1}
            onClick={handleNext}
          >
            Dalej
            <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
          </PrimaryButton>
        ) : (
          <PrimaryButton type="button" disabled>
            Zapisz produkt
          </PrimaryButton>
        )}
      </DialogFooter>
    </DialogContent>
  );
};

export default AddProductDialogContent;
