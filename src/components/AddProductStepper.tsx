import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "cn";
import { Separator } from "./ui/separator";
import { AddProductSteps as STEPS } from "@/products";

type AddProductStepperProps = {
  currentStep: number;
};

export function AddProductStepper({ currentStep }: AddProductStepperProps) {
  return (
    <div className="flex items-center justify-start gap-3 border-y border-border p-4 -mx-4">
      {STEPS.map((step, index) => {
        const done = currentStep > step.number;
        const active = currentStep === step.number;
        const isLast = index === STEPS.length - 1;

        return (
          <Fragment key={step.number}>
            <div className="flex items-center gap-2.5">
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
              <div className="flex flex-col leading-tight">
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
                  "flex-1 rounded-full transition-colors max-w-[70px]",
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
