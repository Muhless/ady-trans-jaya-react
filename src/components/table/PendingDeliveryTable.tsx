import React from "react";
import TableComponent from ".";
import Card from "../card";

const delivery = [
  { id: 1, nama: "ady", noTelepon: "08871165551", status: "delivery" },
  { id: 2, nama: "ady", noTelepon: "08871165551", status: "on delivery" },
  { id: 3, nama: "ady", noTelepon: "08871165551", status: "cancel" },
  { id: 4, nama: "ady", noTelepon: "08871165551", status: "delivery" },
];

const PendingDeliveryTable = () => {
  return (
    <Card title="Pengiriman Sedang Berlangsung" className="p-5">
      <TableComponent data={delivery} showActions={true} />
    </Card>
  );
};

export default PendingDeliveryTable;
