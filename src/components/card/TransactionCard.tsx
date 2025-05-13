import React from "react";
import Card from ".";

type TransactionCardProps = {
  icon?: React.ReactNode;
};

const TransactionCard: React.FC<TransactionCardProps> = ({ icon }) => {
  return (
    <Card className="p-3 rounded-md">
      <div>{icon}</div>
      <h1>Nama Customer</h1>
      <h1>Status</h1>
    </Card>
  );
};

export default TransactionCard;
