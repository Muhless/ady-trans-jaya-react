import React from "react";
import Card from ".";

type DeliverySummaryCardProps = {
  className?: string;
  textColor?: string;
  desc?: string;
};

const DeliverySummaryCard: React.FC<DeliverySummaryCardProps> = ({
  className,
  textColor,
  desc,
}) => {
  return (
    <Card
      className={`bg-[#eef2fe] h-32 w-64 flex flex-col justify-center items-center text-center ${className}`}
    >
      <p className={`text-4xl font-bold ${textColor}`}>5</p>
      <p className={`text-sm ${textColor}`}>{desc}</p>
    </Card>
  );
};

export default DeliverySummaryCard;
