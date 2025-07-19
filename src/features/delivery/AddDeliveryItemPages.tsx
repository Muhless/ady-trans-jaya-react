import React, { useState } from "react";
import Card from "@/components/card";
import TitleComponent from "@/components/Title";
import AddDeliveryItemForm from "@/components/form/AddDeliveryItemsForm";

type DeliveryItem = {
  item_name: string;
  quantity: string;
  weight: string;
};

const AddDeliveryItemPages = () => {
  return (
    <>
      <TitleComponent title="Daftar Barang" />

      <AddDeliveryItemForm />
    </>
  );
};

export default AddDeliveryItemPages;
