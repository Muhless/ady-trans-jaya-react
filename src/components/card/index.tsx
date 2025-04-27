import React from "react";

type CardProps = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  className,
  children,
  onClick,
}) => {
  return (
    <div
      className={`${className} relative p-2 rounded-md transition-all duration-300 hover:shadow-md bg-card ${
        onClick
          ? "cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-black"
          : ""
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {title && <p className="font-compforta py-3 text-black">{title}</p>}
      {children}
    </div>
  );
};

export default Card;
