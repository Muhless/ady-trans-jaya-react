import React from "react";
import Card from ".";

type SummaryCardProps = {
  title?: string;
  className?: string;
  value?: number;
  textClassName?: string;
  desc?: string;
  onClick?: () => void;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  textClassName,
  onClick,
  desc,
}) => {
  return (
    <Card
      className="cursor-pointer flex flex-col items-center justify-center space-y-1 h-40 font-poppins"
      onClick={onClick}
    >
      <p className="text-black text-left w-full px-5">{title}</p>
      <div className="flex flex-col items-center">
        <p className={` font-bold ${textClassName}`}>{value}</p>
        <p className={`${textClassName}`}>{desc}</p>
      </div>
    </Card>
  );
};

export default SummaryCard;
