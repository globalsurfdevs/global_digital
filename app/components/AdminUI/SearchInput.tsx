"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Search box for admin listings. Filtering is done by the caller; this only holds the text. */
const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  disabled,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) => (
  <div className={cn("relative w-full sm:max-w-xs", className)}>
    <Search
      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
      aria-hidden
    />
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={placeholder}
      className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-9 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 [&::-webkit-search-cancel-button]:hidden"
    />
    {value && !disabled && (
      <button
        type="button"
        onClick={() => onChange("")}
        aria-label="Clear search"
        className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      >
        <X className="size-4" />
      </button>
    )}
  </div>
);

export default SearchInput;
