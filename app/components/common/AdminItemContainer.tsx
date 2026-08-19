import React from "react";

const AdminItemContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white shadow-lg">
      {children}
    </div>
  );
};

export default AdminItemContainer;
