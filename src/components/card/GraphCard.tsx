import React from "react";
import Card from ".";
import ChartComponent from "../Chart";

const GraphCard = () => {
  return (
    <Card className="h-96 w-full mb-5 p-5">
      <ChartComponent />
    </Card>
  );
};

export default GraphCard;
