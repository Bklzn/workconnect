import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "cn";
import { Separator } from "./ui/separator";
import { AddProductSteps as STEPS } from "@/data/products";

type AddProductStepperProps = {
  currentStep: number;
};

export function AddProductStepper({ currentStep }: AddProductStepperProps) {
  return (
    <div className="flex flex-row justify-between gap-4 border-y border-border py-4 lg:-mx-4 lg:items-center lg:justify-start lg:gap-3 lg:p-4">
      {STEPS.map((step, index) => {
        const done = currentStep > step.number;
        const active = currentStep === step.number;
        const isLast = index === STEPS.length - 1;

        return (
          <Fragment key={step.number}>
            <div className="flex flex-1 flex-col items-start gap-2.5 lg:flex-row lg:flex-none">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                  (done || active) &&
                    "border-transparent bg-blue-600 text-white",
                  !done &&
                    !active &&
                    "border-border bg-background text-muted-foreground",
                )}
              >
                {done ? <Check className="size-4" /> : step.number}
              </span>
              <div className="flex flex-col items-start text-center leading-tight lg:items-start lg:text-left">
                <span
                  className={cn(
                    "text-sm font-medium whitespace-nowrap",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
                <span className="text-xs whitespace-nowrap text-muted-foreground">
                  {step.subtitle}
                </span>
              </div>
            </div>
            {!isLast && (
              <Separator
                orientation="horizontal"
                className={cn(
                  "hidden flex-1 rounded-full transition-colors max-w-[70px] lg:block",
                  done ? "bg-blue-600" : "bg-border",
                )}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
