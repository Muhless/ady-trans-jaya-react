import React from "react";
import Card from ".";

type DashboardCardProps = {
  className?: string;
  title?: string;
  content?: string;
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  className,
  content,
}) => {
  return (
    <Card className={`h-28 w-1/3 hover:text-primary ${className}`}>
      <p className="text-lg">{title}</p>
      <div className="flex justify-center">
        <h1 className="text-6xl font-bold">{content}</h1>
      </div>
    </Card>
  );
};
