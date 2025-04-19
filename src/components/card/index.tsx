import React from "react";

type CardProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  className = "bg-secondary",
  children,
  onClick,
}) => {
  return (
    <div
      className={`${className} relative p-2 rounded-2xl transition-all duration-300 hover:shadow-md bg-card ${
        onClick
          ? "cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-black"
          : ""
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
