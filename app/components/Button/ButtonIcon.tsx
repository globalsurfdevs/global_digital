import React from "react";

interface IconButtonProps {
  icon: React.ReactNode; // Accepts an icon component
  text: string; // Text to display
  onClick?: () => void; // Optional click handler
  className?: string; // Additional classes for customization
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-30 flex  w-fit items-center justify-between gap-10 rounded-full border border-primary px-[25px]
                      py-3 uppercase leading-lh1p66 text-black transition-all      duration-300 ease-in hover:shadow-lg   lg:px-[50px] ${className}`}
    >
      <span className="icon">{icon}</span>
      <span className="text-white">{text}</span>
    </button>
  );
};

export default IconButton;
