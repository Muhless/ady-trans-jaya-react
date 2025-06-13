import React, { useState } from "react";
import Card from "@/components/card";
import AddDeliveryItemForm from "@/components/form/AddDeliveryItemsForm";
import TitleComponent from "@/components/Title";

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
