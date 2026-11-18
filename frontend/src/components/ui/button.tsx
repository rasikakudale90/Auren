import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-sage-accent text-ivory-soft hover:bg-sage-hover active:bg-sage-forest shadow-subtle",
        secondary:
          "bg-ivory-soft border border-border text-ink-primary hover:bg-ivory-muted shadow-subtle",
        outline:
          "border border-border bg-transparent text-ink-primary hover:bg-ivory-muted",
        ghost:
          "text-ink-secondary hover:bg-ivory-muted hover:text-ink-primary",
        link:
          "text-sage-accent underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-subtle",
        sageLight:
          "bg-pastel-sage text-sage-forest hover:bg-sage-light/60",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-6 text-base",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

export { Button, buttonVariants };
