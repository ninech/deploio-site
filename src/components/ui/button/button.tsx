import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "utils";

import { buttonVariants } from "./button-variants";

export interface ButtonVariantProps
  extends VariantProps<typeof buttonVariants> {}

interface ButtonAttributes
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export type ButtonBaseProps = ButtonVariantProps &
  Omit<ButtonAttributes, "size">;

export type ButtonProps = ButtonBaseProps & {
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
