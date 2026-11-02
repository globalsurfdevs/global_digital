import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "dark" | "danger" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-red-700 focus-visible:ring-primary/40",
  dark: "bg-slate-900 text-white hover:bg-slate-700 focus-visible:ring-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
  danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-300",
  ghost:
    "text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-300 dark:text-slate-300 dark:hover:bg-slate-700",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export const adminButtonClass = (
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
) => cn(base, variants[variant], sizes[size], className);

/** Uniform admin button. Purely presentational: all handlers/props pass through untouched. */
export const AdminButton = ({
  variant,
  size,
  icon,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type={type}
    className={adminButtonClass(variant, size, className)}
    {...rest}
  >
    {icon}
    {children}
  </button>
);

/** Same look as AdminButton, rendered as a Next.js link. */
export const AdminLinkButton = ({
  href,
  variant,
  size,
  icon,
  className,
  children,
}: CommonProps & { href: string }) => (
  <Link href={href} className={adminButtonClass(variant, size, className)}>
    {icon}
    {children}
  </Link>
);
