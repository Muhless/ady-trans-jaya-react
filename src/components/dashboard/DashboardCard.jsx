import React from "react";

const DashboardCard = ({ title, description, background, textColor }) => {
  return (
    <div className={` ${background} rounded-xl p-4 ${textColor} h-44`}>
      <h1 className="text-xl font-medium">{title}</h1>
      <p className="text-4xl text-center">{description}</p>
    </div>
  );
};

export default DashboardCard;
