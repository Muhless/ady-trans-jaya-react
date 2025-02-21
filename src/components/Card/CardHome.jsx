import React from "react";

const CardHome = ({ title, description, background, textColor }) => {
  return (
    <div className={`border border-card ${background} rounded-xl p-4 ${textColor}`}>
      <h1 className="font-bold">{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default CardHome;
