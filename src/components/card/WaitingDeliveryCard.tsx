import React from "react";
import Card from ".";
import TableComponent from "../table";

const delivery = [
  { id: 1, nama: "Mang", noTelepon: "08871165551" },
  { id: 2, nama: "Kosim", noTelepon: "08871165551" },
  { id: 3, nama: "Mang", noTelepon: "08871165551" },
  { id: 4, nama: "Kosim", noTelepon: "08871165551" },
  { id: 3, nama: "Mang", noTelepon: "08871165551" },
  { id: 4, nama: "Kosim", noTelepon: "08871165551" },
];

const WaitingDeliveryCard = () => {
  return (
    <Card className="w-full h-96 px-5" title="Menunggu Persetujuan">
      <TableComponent data={delivery} />
    </Card>
  );
};

export default WaitingDeliveryCard;
