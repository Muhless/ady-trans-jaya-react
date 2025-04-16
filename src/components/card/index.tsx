import React from "react";

type CardProps = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  className = "bg-secondary",
  children,
  onClick,
}) => {
  return (
    <div
      className={`${className} relative border border-b-4 border-r-4 border-black p-2 transition-all duration-300 ${
        onClick
          ? "cursor-pointer hover:shadow-lg transition-all focus-visible:ring-2 focus-visible:ring-black"
          : ""
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {title && <h1 className="mb-3 text-lg font-medium">{title}</h1>}
      {children}
    </div>
  );
};

export default Card;
