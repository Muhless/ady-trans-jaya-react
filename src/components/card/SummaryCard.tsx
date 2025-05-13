import React from "react";
import Card from ".";
import { Bubbles, EllipsisVertical } from "lucide-react";

type SummaryCardProps = {
  icon?: React.ReactNode;
  title?: string;
  className?: string;
  value?: number;
  textClassName?: string;
  desc?: string;
  onClick?: () => void;
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  icon,
  title,
  value,
  textClassName,
  onClick,
  desc,
}) => {
  return (
    <Card
      className="cursor-pointer flex flex-col space-y-1 h-96 font-poppins p-5 rounded-3xl"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">{icon}</div>
      <div className=" bottom-5">
        <p className="text-sm text-center text-muted-foreground">{title}</p>
      </div>
    </Card>
  );
};

export default SummaryCard;
