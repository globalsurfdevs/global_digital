import React from "react";

/** Standard admin page/section header: title, optional description, right-aligned actions. */
const PageHeader = ({
  title,
  description,
  actions,
  count,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  count?: number;
}) => (
  <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-slate-700 sm:flex-row sm:items-end sm:justify-between">
    <div className="flex min-w-0 flex-col gap-1">
      <h1 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
        {typeof count === "number" && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            {count}
          </span>
        )}
      </h1>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
    {actions && (
      <div className="flex flex-wrap items-center gap-2">{actions}</div>
    )}
  </div>
);

export default PageHeader;
