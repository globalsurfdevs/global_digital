import React from "react";

const AdminItemContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {children}
    </div>
  );
};

export default AdminItemContainer;
