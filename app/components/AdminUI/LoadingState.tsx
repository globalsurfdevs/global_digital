import React from "react";
import { Loader2 } from "lucide-react";

/** Shown while a list is still being fetched, so "nothing found" never appears before data arrives. */
const LoadingState = ({ label = "Loading..." }: { label?: string }) => (
  <div
    role="status"
    className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 px-6 py-12 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400"
  >
    <Loader2 className="size-4 animate-spin" aria-hidden />
    {label}
  </div>
);

export default LoadingState;
