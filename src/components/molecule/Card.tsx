import React, { Children } from "react";

type CardProps = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ title, className, children, onClick }) => {
  return (
    <div
      className={`${className} text-primary rounded-lg p-4 mb-3 ${
        onClick ? "cursor-pointer hover:shadow-lg transition-all" : ""
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
