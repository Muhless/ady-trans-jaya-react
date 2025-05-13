import React from "react";
import Card from ".";
import ChartComponent from "../Chart";

const GraphCard = () => {
  return (
    <Card className="h-96 w-full mb-5 p-5 rounded-3xl">
      <ChartComponent />
    </Card>
  );
};

export default GraphCard;
