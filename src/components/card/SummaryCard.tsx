import React from "react";
import Card from ".";

type SummaryCardProps = {
  title?: string;
  className?:string;
  value?: number;
  valueSubDesc?: string;
  textClassName?: string;
  desc?: string;
  subDesc?: string;
  onClick?: () => void;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  valueSubDesc,
  textClassName,
  onClick,
  desc,
  subDesc,
}) => {
  return (
    <Card
      className="cursor-pointer rounded-xl flex flex-col items-center justify-center space-y-1 py-5"
      onClick={onClick}
    >
      <p className="text-black text-left w-full px-5">{title}</p>
      <div className="flex flex-col items-center">
        <p className={`text-7xl font-bold ${textClassName}`}>{value}</p>
        <p className={`${textClassName}`}>{desc}</p>
      </div>
      <p className="text-sm text-gray-500">
        {subDesc} <span>{valueSubDesc}</span>
      </p>
    </Card>
  );
};

export default SummaryCard;
