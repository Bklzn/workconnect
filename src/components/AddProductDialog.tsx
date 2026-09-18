import { Button } from "./ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { AddProductStepper } from "./AddProductStepper";
import { AddProductSteps as STEPS } from "@/products";
import PrimaryButton from "./PrimaryButton";
import { ArrowLeft } from "lucide-react";
import { cn } from "cn";

interface AddProductDialogContentProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const AddProductDialogContent: React.FC<AddProductDialogContentProps> = ({
  step,
  setStep,
}) => {
  return (
    <DialogContent mobileFullscreen>
      <DialogHeader>
        <DialogTitle>Dodaj nowy produkt</DialogTitle>
      </DialogHeader>
      <AddProductStepper currentStep={step} />
      <div className="flex flex-col gap-4 py-4 mb-auto lg:mb-0"></div>
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
            onClick={() =>
              setStep((value) => Math.min(STEPS.length, value + 1))
            }
          >
            Dalej
            <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
          </PrimaryButton>
        ) : (
          <PrimaryButton type="button">Zapisz produkt</PrimaryButton>
        )}
      </DialogFooter>
    </DialogContent>
  );
};

export default AddProductDialogContent;
