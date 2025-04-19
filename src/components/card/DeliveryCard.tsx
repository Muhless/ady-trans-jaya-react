import React from "react";
import Card from ".";
import UserIconComponent from "../UserIcon";

const DeliveryCard = () => {
  return (
    <Card className="h-full bg-secondary p-3">
      <Card className="flex bg-background justify-around items-center text-sm cursor-pointer hover:bg-third">
        <UserIconComponent className="size-8 rounded-full" />
        <h1>Nama</h1>
        <h2>Alamat</h2>
        <h2>Alamat</h2>
        <h2>Alamat</h2>
      </Card>
    </Card>
  );
};

export default DeliveryCard;
