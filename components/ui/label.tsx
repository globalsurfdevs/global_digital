"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  font-semibold",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { main?: boolean } & {
      oneInput?: boolean;
    } & { isOpen?: string }
>(({ className, main, oneInput, isOpen, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      labelVariants(),
      className,
      // Section headers get a divider unless they are a collapsed accordion (isOpen === "").
      `${main ? `px-5 ${isOpen === "open" || isOpen === undefined ? "border-b" : ""} border-slate-200 py-4 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-white` : "text-sm font-medium text-slate-700 dark:text-slate-300"} ${oneInput ? "text-md font-semibold" : ""}`,
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
