import React from "react";

const Button = ({ text, className, color }: { text: string; className?: string; color?: string; }) => {
  return (
    <button
      className={`${color  ? "text-black hover:text-primary" : "text-white hover:text-primary"} ${className ? className : "text-30 w-fit rounded-full border border-primary px-6 py-3 leading-lh1p66 transition-all duration-300 ease-in hover:bg-primary hover:text-white  hover:shadow-lg lg:px-24"}`}
    >
      {text}
    </button>
  );
};

export default Button;
