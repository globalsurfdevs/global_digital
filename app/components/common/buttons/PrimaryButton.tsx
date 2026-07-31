"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Image from "next/image";

/**
 * Simple reusable Button — matches the reference design:
 * a pill-shaped button with a trailing red arrow icon chip.
 *
 * variant: "primary" (solid black) | "outline" (red border)
 * Renders as <button>, <Link>, or external <a> depending on props passed.
 */

type ButtonVariant = "primary" | "outline" | "whatsapp";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const baseStyles =
  "group inline-flex items-center justify-center gap-3 fnt-lexend" +
  "px-6 3xl:px-[25px] 3xl:py-[15px] py-3.5 text-base uppercase leading-[1] whitespace-nowrap select-none " +
  "rounded-full transition-all duration-300 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-black text-white font-normal" +
    "hover:bg-neutral-800 hover:shadow-lg hover:shadow-black/10 " +
    "active:bg-neutral-900 focus-visible:ring-black",
  outline:
    "bg-transparent text-black border-[0.8px] border-[#E63E31] font-medium" +
    "hover:border-[#E63E31] hover:bg-[#E63E31]/5 " +
    "active:bg-[#E63E31]/10 focus-visible:ring-[#E63E31]",
  whatsapp:
    "bg-transparent text-black border-[0.8px] border-[#E63E31] font-medium" +
    "hover:border-[#E63E31] hover:bg-[#E63E31]/5 " +
    "active:bg-[#E63E31]/10 focus-visible:ring-[#E63E31]",
};

// Icon chip background per variant
const iconChipStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#E63E31] text-white w-3 h-3 xl:w-[18px] xl:h-[18px]",
  outline: "bg-[#E63E31] text-white w-3 h-3 xl:w-[18px] xl:h-[18px]",
  whatsapp: "bg-transparent",
};

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

interface BaseButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
  isLoading?: boolean;
  href?: string;
  external?: boolean;
}

type ButtonAsButton = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", children, className, showIcon = true, isLoading = false, ...rest }, ref) => {
    const classes = cn(baseStyles, variantStyles[variant], className);

    const icon = (
      <span
        className={
          variant === "whatsapp"
            ? "flex items-center justify-center shrink-0"
            : cn(
              "flex items-center justify-center shrink-0",
              iconChipStyles[variant]
            )
        }
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : variant === "whatsapp" ? (
          <Image src="/assets/images/branding-positioning/whatsapp-icon.svg" alt="WhatsApp" width={26} height={26} />
        ) : (
          <div className="transition-transform duration-300 ease-out group-hover:rotate-45">
            <ArrowIcon />
          </div>
        )}
      </span>
    );

    const content = (
      <>
        <span className="fnt-lexend font-normal">{children}</span>
        {showIcon && icon}
      </>
    );

    if ("href" in rest && rest.href) {
      const { href, external, ...anchorRest } = rest as ButtonAsLink;

      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        );
      }

      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      );
    }

    const { disabled, ...buttonRest } = rest as ButtonAsButton;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={disabled || isLoading}
        {...buttonRest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;