// src/components/UI/Divider.tsx
import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/utils/helpers";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("h-px w-full bg-border", className)}
      {...props}
    />
  )
);

Divider.displayName = "Divider";
