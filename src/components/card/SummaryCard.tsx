import React from "react";
import Card from ".";

type SummaryCardProps = {
  title: string;
  value?: number;
  icon?: React.ReactNode;
  onClick: () => void;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  onClick,
  icon,
}) => {
  return (
    <Card
      className="bg-secondary h-28 flex items-center justify-between px-10 cursor-pointer rounded-xl"
      onClick={onClick}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className="text-blue-500">{icon}</div>
    </Card>
  );
};

export default SummaryCard;
