import React, { Children } from "react";

type CardProps = {
  title?: string;
  classname?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ title, classname, children, onClick }) => {
  return (
    <div className={`${classname} text-primary rounded-lg p-4 mb-3`}>
      {title && <h1 className="text-lg font-medium mb-3">{title}</h1>}
      {children}
    </div>
  );
};

export default Card;
