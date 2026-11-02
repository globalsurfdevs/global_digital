import React from "react";

const Label = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return (
    <label
      htmlFor=""
      className={
        className
          ? className
          : "text-sm font-medium text-slate-700 dark:text-slate-300"
      }
    >
      {content}
    </label>
  );
};

export default Label;
