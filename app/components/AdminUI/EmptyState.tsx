import React from "react";
import { Inbox } from "lucide-react";

const EmptyState = ({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center dark:border-slate-600 dark:bg-slate-800/50">
    <Inbox className="size-8 text-slate-400" aria-hidden />
    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
      {title}
    </p>
    {description && (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    )}
    {action && <div className="mt-2">{action}</div>}
  </div>
);

export default EmptyState;
