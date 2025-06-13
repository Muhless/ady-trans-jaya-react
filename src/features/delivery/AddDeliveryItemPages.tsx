import React, { useState } from "react";
import Card from "@/components/card";
import AddDeliveryItemForm from "@/components/form/AddDeliveryItemsForm";

type DeliveryItem = {
  item_name: string;
  quantity: string;
  weight: string;
};

const AddDeliveryItemPages = () => {
  return (
    <Card>
      <AddDeliveryItemForm />
    </Card>
  );
};

export default AddDeliveryItemPages;
