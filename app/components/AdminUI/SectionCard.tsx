import React from "react";
import { cn } from "@/lib/utils";

/** Bordered panel with an optional titled header, used to visually separate admin sections. */
const SectionCard = ({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) => (
  <section
    className={cn(
      "rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800",
      className,
    )}
  >
    {(title || actions) && (
      <header className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5">
          {title && (
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        )}
      </header>
    )}
    <div className={cn("p-5", bodyClassName)}>{children}</div>
  </section>
);

export default SectionCard;
