import React from "react";
import Card from ".";
import ChartComponent from "../Chart";
import SubTitle from "../SubTitle";

const TransactionGraphic = () => {
  return (
    <Card className="h-[22rem] rounded-md">
      <div className="flex justify-between items-center mb-2 p-3 border-b">
        <SubTitle subTitle="Transaksi" />
       {/* sort by date */}
      </div>
      <div className="p-4 h-[calc(100%-64px)]">
        <ChartComponent />
      </div>
    </Card>
  );
};

export default TransactionGraphic;
