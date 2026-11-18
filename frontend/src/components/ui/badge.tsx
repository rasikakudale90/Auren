import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors border",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-sage-accent text-ivory-soft",
        neutral:
          "border-border bg-ivory-muted text-ink-secondary",
        outline:
          "border-border text-ink-primary bg-transparent",
        
        // Enquiry & Task Status Variants
        new:
          "border-[#C9D6DE] bg-pastel-blue text-[#2C4857]",
        replied:
          "border-[#D0D9C8] bg-pastel-sage text-[#384835]",
        interested:
          "border-[#EBD0C2] bg-pastel-peach text-[#6B3E25]",
        waiting:
          "border-[#E8DFC2] bg-pastel-butter text-[#5C4A1A]",
        converted:
          "border-[#CADBC2] bg-[#E1EDDB] text-[#284724]",
        lost:
          "border-border bg-ivory-muted text-ink-muted",
        
        // Payment & Order Statuses
        paid:
          "border-[#CADBC2] bg-[#E1EDDB] text-[#284724]",
        partiallyPaid:
          "border-[#E8DFC2] bg-pastel-butter text-[#5C4A1A]",
        unpaid:
          "border-[#E8CECB] bg-pastel-blush text-[#75342B]",
        refunded:
          "border-border bg-ivory-muted text-ink-secondary",
          
        // Urgency / Due dates
        dueToday:
          "border-[#E8CECB] bg-pastel-blush text-[#75342B] font-semibold",
        overdue:
          "border-red-200 bg-red-50 text-red-700 font-semibold",
        upcoming:
          "border-border bg-ivory-soft text-ink-secondary",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
