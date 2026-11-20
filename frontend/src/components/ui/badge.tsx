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
          
        // Urgency / Due dates / Editorial accents
        dueToday:
          "border-burgundy-border bg-burgundy-subtle text-burgundy-deep font-semibold",
        overdue:
          "border-burgundy-border bg-burgundy-subtle text-burgundy-deep font-bold",
        upcoming:
          "border-border bg-ivory-soft text-ink-secondary",
        urgent:
          "border-burgundy-border bg-burgundy-subtle text-burgundy-deep font-semibold",
        vip:
          "border-burgundy-border bg-burgundy-subtle text-burgundy-deep font-semibold tracking-wide",
        burgundy:
          "border-burgundy-border bg-burgundy-subtle text-burgundy-deep font-medium",
        beige:
          "border-beige-border bg-beige-subtle text-ink-primary font-medium",
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
