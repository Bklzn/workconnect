import { cn } from "cn";
import { Button, buttonVariants } from "./ui/button";
import type { VariantProps } from "class-variance-authority";
import type { Button as ButtonPrimitive } from "@base-ui/react";

function PrimaryButton({
  className,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <Button
      className={cn(
        buttonVariants({ variant: "default", size: "default", className }),
        "bg-blue-600 hover:bg-blue-500 py-4 px-4 rounded-full",
      )}
      {...props}
    />
  );
}

export default PrimaryButton;
