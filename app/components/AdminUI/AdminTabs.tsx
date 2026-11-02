"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type AdminTab = {
  key: string;
  label: string;
  count?: number;
};

/** Underline-style tab bar. Presentational only: the parent owns the active tab. */
const AdminTabs = ({
  tabs,
  active,
  onChange,
}: {
  tabs: AdminTab[];
  active: string;
  onChange: (key: string) => void;
}) => (
  <div
    role="tablist"
    className="flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-700"
  >
    {tabs.map((tab) => {
      const isActive = tab.key === active;
      return (
        <button
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() => onChange(tab.key)}
          className={cn(
            "-mb-px inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors",
            isActive
              ? "border-primary text-slate-900 dark:text-white"
              : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
          )}
        >
          {tab.label}
          {typeof tab.count === "number" && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300",
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      );
    })}
  </div>
);

export default AdminTabs;
