// src/components/UI/Chip.tsx
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/helpers";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Chip.displayName = "Chip";
