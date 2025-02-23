import React from "react";

const DashboardCard = ({ title, description, background, textColor}) => {
  return (
    <div className={`text-primary ${background} rounded-lg p-4 ${textColor} h-56 mb-3`}>
      <h1 className="text-xl font-medium">{title}</h1>
      <p className="text-4xl text-center">{description}</p>
    </div>
  );
};

export default DashboardCard;
