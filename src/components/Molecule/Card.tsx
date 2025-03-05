import React from "react";

type CardProps = {
  title?: string;
  description?: string;
  classname?: string;
};

const Card: React.FC<CardProps> = ({ title, description, classname }) => {
  return (
    <div
      className={`${classname} text-primary rounded-lg p-4 h-56 mb-3`}
    >
      <h1 className="text-xl font-medium">{title}</h1>
      <p className="text-4xl text-center">{description}</p>
    </div>
  );
};

export default Card;
